document.addEventListener('DOMContentLoaded', function () {
    var contactBoxes = document.querySelectorAll('.contact-box');
    var selectedBox = null;

    contactBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
            if (selectedBox !== null) {
                selectedBox.classList.remove('contact-box-selected');
                var spans = selectedBox.querySelectorAll('span');
                spans.forEach(function (span) {
                    span.classList.remove('last-time-selected', 'last-message-selected', 'contact-name-list-selected');
                });
            }

            box.classList.add('contact-box-selected');
            var contactPictureList = document.querySelector('.contact-box-selected').querySelector('.contact-picture-list');
            var contactPictureHeader = document.querySelector('.contact-picture-header');

            var contactNameList = document.querySelector('.contact-box-selected').querySelector('.contact-name-list');
            var contactNameHeader = document.querySelector('.contact-name-header');

            var spans = box.querySelectorAll('span');
            spans.forEach(function (span) {
                contactPictureHeader.src = contactPictureList.src;
                contactNameHeader.innerHTML = contactNameList.innerHTML;
                span.classList.add('last-time-selected', 'last-message-selected', 'contact-name-list-selected');
            });

            var header = document.querySelector('.header');
            var chatInputContainer = document.querySelector('.chat-input-container');
            var chatMessages = document.querySelector('.chat-messages');
        
            if (header) {
                header.style.visibility = 'visible';
                chatInputContainer.style.visibility = 'visible';
                chatMessages.style.visibility = 'visible';
            }

            loadMessages(contactNameList.textContent); // Added this line
            scrollToBottom();

            selectedBox = box;
        });
    });

    var searchInput = document.getElementById('search-input');
    var searchBar = document.querySelector('.search-bar');
    var searchIcon = document.getElementById('search-icon');
    var searchClear = document.querySelector('.search-clear-focus'); 

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
        var searchValue = document.getElementById('search-input').value.toLowerCase();
        var contacts = document.querySelectorAll('.contact-box');

        contacts.forEach(function(contact) {
            var contactName = contact.querySelector('.contact-name-list').textContent.toLowerCase();
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
                const messageElement = document.createElement('div');
                messageElement.className = `contact-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`;
                messageElement.innerHTML = `
                    <span>${msg.content}</span>
                    <span class="message-time">${msg.timestamp}</span>
                `;
                chatMessages.appendChild(messageElement);
            });
        }
    }
    
    function scrollToBottom() {
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    

    let messages = {
        "Max": [
            { sender: "Max", content: "I am dutch", timestamp: "14:06" }
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
   
});