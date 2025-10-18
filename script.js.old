// Navigation and Section Management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to the clicked nav link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Load user data if logged in
    loadUserData();
});

// Chat Functionality
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Add user message
    addMessage(message, 'user');
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    
    // Remove welcome message if it exists
    const welcomeMessage = chatBox.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? 'U' : 'AI';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatBox.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotResponse(userMessage) {
    const responses = [
        "C'est une question intéressante! Je suis là pour vous aider.",
        "Je comprends. Pouvez-vous m'en dire plus?",
        "Merci pour votre message! Comment puis-je vous assister davantage?",
        "C'est noté! Je suis ici pour répondre à vos questions.",
        "Excellent point! Laissez-moi vous aider avec cela.",
        "Je vois. Permettez-moi de vous guider.",
        "D'accord, je peux vous aider avec ça!",
        "Intéressant! Continuons cette conversation."
    ];
    
    // Simple response generation (you can make this more sophisticated)
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = `
        <div class="welcome-message">
            <h3>Bonjour! 👋</h3>
            <p>Comment puis-je vous aider aujourd'hui?</p>
        </div>
    `;
}

// Sign Up Functionality
function handleSignup(event) {
    event.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Store user data in localStorage (in a real app, this would be sent to a server)
    const userData = {
        username: username,
        email: email,
        isLoggedIn: true
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Show success message
    alert('Compte créé avec succès! Bienvenue ' + username + '!');
    
    // Clear form
    document.getElementById('signup-form').reset();
    
    // Update profile and redirect to chat
    loadUserData();
    showSection('accueil');
}

// Login Functionality
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Check if user exists (in a real app, this would be verified on the server)
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
        const userData = JSON.parse(storedData);
        
        if (userData.email === email) {
            userData.isLoggedIn = true;
            localStorage.setItem('userData', JSON.stringify(userData));
            
            alert('Connexion réussie! Bienvenue ' + userData.username + '!');
            
            // Clear form
            document.getElementById('login-form').reset();
            
            // Update profile and redirect to chat
            loadUserData();
            showSection('accueil');
        } else {
            alert('Email ou mot de passe incorrect.');
        }
    } else {
        alert('Aucun compte trouvé avec cet email. Veuillez créer un compte.');
    }
}

// Logout Functionality
function handleLogout() {
    const userData = localStorage.getItem('userData');
    
    if (userData) {
        const data = JSON.parse(userData);
        data.isLoggedIn = false;
        localStorage.setItem('userData', JSON.stringify(data));
        
        alert('Déconnexion réussie!');
        loadUserData();
        showSection('login');
    }
}

// Load User Data
function loadUserData() {
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
        const userData = JSON.parse(storedData);
        
        if (userData.isLoggedIn) {
            document.getElementById('profile-username').textContent = userData.username;
            document.getElementById('profile-email').textContent = userData.email;
        } else {
            document.getElementById('profile-username').textContent = 'Utilisateur Invité';
            document.getElementById('profile-email').textContent = 'Non connecté';
        }
    }
}

// Auto-resize textarea on input (if needed)
const userInput = document.getElementById('user-input');
if (userInput) {
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}
