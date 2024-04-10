// ui.js (Non-module)
document.addEventListener('DOMContentLoaded', function () {

    // Function to toggle chat container
    function toggleChatContainer() {
        const chatContainer = $('#chat-container');
        chatContainer.toggleClass('show');
    }

    // Function to scroll the chatbox window to the bottom
    function scrollChatToBottom() {
        var chatContent = $('#chat-content');
        chatContent.scrollTop(chatContent[0].scrollHeight);
    }

    // Event listener for send button click
    $('#send-btn').click(function () {
        sendUserMessage();
    });

    // Event listener for Enter key press in the input field
    $('#user-input').keypress(function (e) {
        if (e.which === 13) {
            sendUserMessage();
        }

    });

    // Event listener for toggle button click (assuming you have a button with id="toggle-chat-btn")
    $('#toggle-chat-btn').click(function () {
        toggleChatContainer(); // Call the toggleChatContainer function when the button is clicked
    });

    // Function to send user messages
    async function sendUserMessage() {
        const baseUrl = 'http://localhost:3000';
        const userInput = $('#user-input').val();
        if (userInput.trim() !== '') {
            sendMessage('user', userInput);
            // Clear the input field
            $('#user-input').val('');
            try {
                // Make an AJAX request to the server to process the user message
                const response = await fetch(`${baseUrl}/processUserMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userInput }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const botResponse = data.botResponse;
                    sendMessage('bot', botResponse);
                } else {
                    console.error('Server error:', response.statusText);
                }


                // Get the last message element and scroll it into view
                var lastMessage = $('.user-message').last()[0];
                if (lastMessage) {
                    lastMessage.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.error('Error sending user message:', error);
            }
        }
    }

    // Function to display messages
    function sendMessage(sender, message) {
        $('#chat-content').append(`<div class="chat-message ${sender}-message">${message}</div>`);
        // Scroll to the bottom of the chat content to show the new message
        $('#chat-content').scrollTop($('#chat-content')[0].scrollHeight);
    }

    // Simulate a greeting from the bot
    sendMessage('bot', 'Hello! Ask any question please!');
});
