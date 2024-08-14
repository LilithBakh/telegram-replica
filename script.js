document.addEventListener('DOMContentLoaded', function () {
    const contactBoxes = document.querySelectorAll('.contact-box');
    let selectedBox = null;

    contactBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
            if (selectedBox !== null) {
                selectedBox.classList.remove('contact-box-selected');
                const spans = selectedBox.querySelectorAll('span');
                spans.forEach(function (span) {
                    span.classList.remove('last-time-selected', 'last-message-selected', 'contact-name-list-selected');
                });
            }

            box.classList.add('contact-box-selected');
            const contactPictureList = document.querySelector('.contact-box-selected').querySelector('.contact-picture-list');
            const contactPictureHeader = document.querySelector('.contact-picture-header');

            const contactNameList = document.querySelector('.contact-box-selected').querySelector('.contact-name-list');
            const contactNameHeader = document.querySelector('.contact-name-header');

            const spans = box.querySelectorAll('span');
            spans.forEach(function (span) {
                contactPictureHeader.src = contactPictureList.src;
                contactNameHeader.innerHTML = contactNameList.innerHTML;
                span.classList.add('last-time-selected', 'last-message-selected', 'contact-name-list-selected');
            });

            const header = document.querySelector('.header');
            const chatInputContainer = document.querySelector('.chat-input-container');
            const chatMessages = document.querySelector('.chat-messages');
        
            if (header) {
                header.style.visibility = 'visible';
                chatInputContainer.style.visibility = 'visible';
                chatMessages.style.visibility = 'visible';
            }

            loadMessages(contactNameList.textContent);
            scrollToBottom();

            selectedBox = box;
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchBar = document.querySelector('.search-bar');
    const searchIcon = document.getElementById('search-icon');
    const searchClear = document.querySelector('.search-clear-focus'); 

    function updateClearIcon() {
        if (searchInput.value !== '') {
            searchClear.style.visibility = 'visible';
            if (document.activeElement === searchInput) {
                searchClear.className = 'search-clear-focus';
            } else {
                searchClear.className = 'search-clear';
            }
        } else {
            searchClear.style.visibility = 'hidden';
        }
    }

    searchInput.addEventListener('focus', function() {
        searchBar.style.borderColor = '#3390EC';
        searchBar.style.borderWidth = "2px";
        searchIcon.style.color = '#3390EC';
        updateClearIcon();
    });

    searchInput.addEventListener('input', function() {
        searchInList();
        updateClearIcon();
    });

    searchInput.addEventListener('blur', function() {
        searchBar.style.borderColor = '';
        searchBar.style.borderWidth = '';
        searchIcon.style.color = '';
        updateClearIcon();
    });

    function clearInput(event) {
        event.preventDefault();

        const wasFocused = (document.activeElement === searchInput);

        searchInput.value = '';
        updateClearIcon();

        if (wasFocused) {
            searchInput.focus();
        }
        searchInList();
    }

    searchClear.addEventListener('mousedown', function(event) {
        event.preventDefault();
    });

    searchClear.addEventListener('click', clearInput);

    function searchInList() {
        const searchValue = document.getElementById('search-input').value.toLowerCase();
        const contacts = document.querySelectorAll('.contact-box');

        contacts.forEach(function(contact) {
            const contactName = contact.querySelector('.contact-name-list').textContent.toLowerCase();
            if (contactName.indexOf(searchValue) !== 0) {
                contact.classList.add('contact-box-hide');
            } else {
                contact.classList.remove('contact-box-hide');
            }
        });
    }

    function loadMessages(contactName) {
        const chatMessages = document.querySelector('.chat-messages .messages-wrap');
        chatMessages.innerHTML = '';
    
        if (messages[contactName]) {
            messages[contactName].forEach(msg => {
                const wrapperElement = document.createElement('div');
                wrapperElement.className = 'message-bubble-wrap';
    
                const messageElement = document.createElement('div');
                messageElement.className = `message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`;
                messageElement.innerHTML = `
                    <span>${msg.content}</span>
                    <span class="message-time">${msg.timestamp}</span>
                `;
    
                wrapperElement.appendChild(messageElement);
                chatMessages.appendChild(wrapperElement);
            });
        }
    }
    
    function getCurrentTime24Hour() {
        return new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
    }
    
    function scrollToBottom() {
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const messages = {
        "Max": [
            { sender: "Max", content: "I am dutch", timestamp: "14:06" },
        ],
        "Sergio": [
            { sender: "Sergio", content: "Tell  Horner not to fire me", timestamp: "14:06" }
        ],
        "Charles": [
            { sender: "Charles", content: "We can be champions", timestamp: "14:06" }
        ],
        "Lando": [
            { sender: "Lando", content: "Don't buy me  sushi", timestamp: "14:06" }
        ],
        "Carlos": [
            { sender: "Carlos", content: "Let's golf", timestamp: "14:06" }
        ],
        "Oscar": [
            { sender: "Oscar", content: "Hei", timestamp: "14:06" }
        ],
        "George": [
            { sender: "George", content: "I'm a nasty girl", timestamp: "14:06" }
        ],
        "Fernando": [
            { sender: "Fernando", content: "Don't forget to leave space", timestamp: "14:06" }
        ],
        "Lewis": [
            { sender: "Lewis", content: "Hammertime", timestamp: "14:06" }
        ],
        "Yuki": [
            { sender: "Yuki", content: "I miss Pierre", timestamp: "14:06" }
        ],
        "Lance": [
            { sender: "Lance", content: "My dad paid for my seat", timestamp: "14:06" }
        ],
        "Nico": [
            { sender: "Nico", content: "Call me Hulk", timestamp: "14:06" }
        ],
        "Daniel": [
            { sender: "Daniel", content: "KIKIKI", timestamp: "14:06" }
        ],
        "Esteban": [
            { sender: "Esteban", content: "Estie bestie is here", timestamp: "14:06" }
        ],
        "Kevin": [
            { sender: "Kevin", content: "I will kill you", timestamp: "14:06" }
        ],
        "Alex": [
            { sender: "Alex", content: "Sharing is caring", timestamp: "14:06" }
        ],
        "Guanyu": [
            { sender: "Guanyu", content: "Lol", timestamp: "14:06" }
        ],
        "Pierre": [
            { sender: "Pierre", content: "Oui Oui", timestamp: "14:06" }
        ],
        "Valtteri": [
            { sender: "Valtteri", content: "Buy my calendar", timestamp: "14:06" }
        ],
        "Logan": [
            { sender: "Logan", content: "What is a kilometer?", timestamp: "14:06" }
        ],
    };

    const messageInput = document.getElementById('message-input');
    const sendButtonIcon = document.querySelector('#voice-or-send-message i');
    const sendButton = document.querySelector('#voice-or-send-message');

    function updateSendButtonIcon() {
        if (messageInput.value.trim() === '') {
            sendButtonIcon.className = 'fa-solid fa-microphone';
        } else {
            sendButtonIcon.className = 'fa-solid fa-arrow-right';
        }
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            const selectedContact = document.querySelector('.contact-box-selected .contact-name-list').textContent;
            const newMessage = {
                sender: 'me',
                content: message,
                timestamp: getCurrentTime24Hour()
            };
            messages[selectedContact].push(newMessage);
            loadMessages(selectedContact);
            messageInput.value = '';
            scrollToBottom();
            updateSendButtonIcon();
        }
    }

    messageInput.addEventListener('input', updateSendButtonIcon);

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);

    document.querySelector('#voice-or-send-message').addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message !== '') {
            const selectedContact = document.querySelector('.contact-box-selected .contact-name-list').textContent;
            const newMessage = {
                sender: 'me',
                content: message,
                timestamp: getCurrentTime24Hour()
            };
            messages[selectedContact].push(newMessage);
            loadMessages(selectedContact);
            messageInput.value = '';
            scrollToBottom();
            updateSendButtonIcon();
        }
    });
});
