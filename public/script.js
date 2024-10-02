// script.js

async function sendMessage() {
    const inputField = document.getElementById('input');
    const userMessage = inputField.value;
    
    if (!userMessage) return; // Prevent empty messages
  
    // Display user message in the chat
    displayMessage(userMessage, 'user');
  
    // Send message to the server
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
  
    const data = await response.json();
    
    // Display chatbot response
    displayMessage(data.reply, 'bot');
  
    // Clear the input field
    inputField.value = '';
  }
  
  // Helper function to display messages
  function displayMessage(message, sender) {
    const messageSection = document.getElementById('message-section');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender);
    
    if (sender === 'bot') {
      messageDiv.id = 'bot';
    }
    
    const span = document.createElement('span');
    span.textContent = message;
    messageDiv.appendChild(span);
    
    messageSection.appendChild(messageDiv);
    messageSection.scrollTop = messageSection.scrollHeight; // Scroll to bottom
  }
  