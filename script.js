document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    /** ==========================
     *  Update Header with Full Name
     ========================== */
    function updateHeaderInfo() {
        let fullName = localStorage.getItem("fullName");
        let headerRegister = document.getElementById("header-register");
        let logoutLink = document.getElementById("logout-link");

        if (fullName && headerRegister) {
            headerRegister.textContent = fullName; // Show full name
            headerRegister.href = "profile.html"; // Link to profile
            logoutLink.style.display = "block"; // Show logout button
        }
    }
    updateHeaderInfo();

    /** ==========================
     *  Handle Signup Form
     ========================== */
    let signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let fullName = document.getElementById("fullName").value;
            let specialty = document.getElementById("specialty").value;
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("كلمة المرور غير متطابقة!");
                return;
            }

            localStorage.setItem("fullName", fullName);
            localStorage.setItem("specialty", specialty);
            localStorage.setItem("email", email);
            localStorage.setItem("phone", phone);
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            alert("تم إنشاء الحساب بنجاح!");
            window.location.href = "subscription.html"; // ✅ Redirects to subscription page
        });
    }

    /** ==========================
     *  Handle Login Form
     ========================== */
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let usernameInput = document.getElementById("login-username").value;
            let passwordInput = document.getElementById("login-password").value;

            let storedUsername = localStorage.getItem("username");
            let storedPassword = localStorage.getItem("password");

            if (usernameInput === storedUsername && passwordInput === storedPassword) {
                alert("تم تسجيل الدخول بنجاح!");
                window.location.href = "index.html"; // Redirect to home
            } else {
                alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
            }
        });
    }

    /** ==========================
     *  Handle Logout
     ========================== */
    let logoutBtn = document.getElementById("logout-link");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            alert("تم تسجيل الخروج بنجاح!");
            window.location.href = "register.html"; // Redirect to login page
        });
    }

    /** ==========================
     *  Display User Info in Profile
     ========================== */
    if (window.location.pathname.includes("profile.html")) {
        document.getElementById("display-fullName").textContent = localStorage.getItem("fullName") || "غير متوفر";
        document.getElementById("display-specialty").textContent = localStorage.getItem("specialty") || "غير متوفر";
        document.getElementById("display-email").textContent = localStorage.getItem("email") || "غير متوفر";
        document.getElementById("display-phone").textContent = localStorage.getItem("phone") || "غير متوفر";
        document.getElementById("display-username").textContent = localStorage.getItem("username") || "غير متوفر";
    }

    /** ==========================
     *  My Research Repository
     ========================== */
    if (window.location.pathname.includes("my-research-repository.html")) {
        let researchList = JSON.parse(localStorage.getItem("userResearches")) || [];

        function renderResearches() {
            let researchContainer = document.getElementById("research-list");
            researchContainer.innerHTML = "";
            researchList.forEach((research, index) => {
                let researchItem = document.createElement("div");
                researchItem.classList.add("research-item");
                researchItem.innerHTML = `
                    <h3>${research.title}</h3>
                    <p><strong>تاريخ الإضافة:</strong> ${research.date}</p>
                    <button onclick="shareResearch(${index})">مشاركة</button>
                    <p>👍 <span id="likes-${index}">${research.likes}</span> | 
                       📖 <span id="citations-${index}">${research.citations}</span> | 
                       👀 <span id="views-${index}">${research.views}</span>
                    </p>
                `;
                researchContainer.appendChild(researchItem);
            });
        }

        document.getElementById("add-research-form").addEventListener("submit", function (event) {
            event.preventDefault();
            let researchTitle = document.getElementById("research-title").value;
            let newResearch = {
                title: researchTitle,
                date: new Date().toLocaleDateString(),
                likes: 0,
                citations: 0,
                views: 0,
            };
            researchList.push(newResearch);
            localStorage.setItem("userResearches", JSON.stringify(researchList));
            renderResearches();
        });

        window.shareResearch = function (index) {
            // Log the current research data
            console.log(`Before update: `, researchList[index]);
        
            // Simulate changes (likes, citations, views)
            researchList[index].likes += Math.floor(Math.random() * 10); // Simulate likes
            researchList[index].citations += Math.floor(Math.random() * 5); // Simulate citations
            researchList[index].views += Math.floor(Math.random() * 20); // Simulate views
        
            // Log the updated research data
            console.log(`After update: `, researchList[index]);
        
            // Update the DOM elements with the new values directly
            let likesElement = document.getElementById(`likes-${index}`);
            let citationsElement = document.getElementById(`citations-${index}`);
            let viewsElement = document.getElementById(`views-${index}`);
        
            // Make sure the elements exist before updating them
            if (likesElement) likesElement.textContent = researchList[index].likes;
            if (citationsElement) citationsElement.textContent = researchList[index].citations;
            if (viewsElement) viewsElement.textContent = researchList[index].views;
        
            // Save the updated list to localStorage
            localStorage.setItem("userResearches", JSON.stringify(researchList));
        
            // Log updated localStorage
            console.log("Updated research list stored in localStorage:", localStorage.getItem("userResearches"));
        };
        
        
    }
    
    // Function to send user message and display bot response
    function sendMessage() {
        var userMessage = document.getElementById("userInput").value;
        if (userMessage.trim() === "") return; // Prevent sending empty messages

        displayMessage(userMessage, "user");
        document.getElementById("userInput").value = ""; // Clear input field

        // Bot response logic
        setTimeout(() => {
            var botResponse = getBotResponse(userMessage);
            displayMessage(botResponse, "bot");
        }, 1000);
    }

    // Function to display message in the chat box
    function displayMessage(message, sender) {
        var chatBox = document.getElementById("chatBox");
        var messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender + "-message");
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);

        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
    }

    // Function to generate bot response based on user input
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();

        if (userMessage.includes("منصة")) {
            return "منصتنا هي منصة تعليمية لعضو هيئة التدريس تتيح له الوصول إلى الخدمات الأكاديمية.";
        } else if (userMessage.includes("خدمات")) {
            return "منصتنا تقدم مجموعة من الخدمات مثل دعوات حضور المناسبات العلمية ودورات تدريبية.";
        } else if (userMessage.includes("تعليم")) {
            return "نحن هنا لتطوير وتحسين عملية التعليم والتعلم عبر مختلف الأدوات الأكاديمية.";
        } else if (userMessage.includes("وداع")) {
            return "نأسف لأنك ستغادر! نحن دائمًا هنا لمساعدتك.";
        } else {
            return "آسف، لم أفهم ذلك. يمكنني مساعدتك في أمور مثل المنصة أو الخدمات الأكاديمية.";
        }
    }

});
