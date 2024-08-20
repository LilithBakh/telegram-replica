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
            { sender: "Max", content: "Just won another race, no big deal. What’s your excuse for not being as fast today?", timestamp: "14:07" }
        ],
        "Sergio": [
            { sender: "Sergio", content: "Just avoided crashing into Max. Again. I deserve a medal for that, don’t you think?", timestamp: "14:07" }
        ],
        "Charles": [
            { sender: "Charles", content: "The car broke down again… but at least I look good in the photo! Anyone up for some piano practice later?", timestamp: "14:07" }
        ],
        "Lando": [
            { sender: "Lando", content: "Trying to figure out if I’m faster on track or in Mario Kart. Spoiler: Blue shells suck", timestamp: "14:06" }
        ],
        "Carlos": [
            { sender: "Carlos", content: "You up for some golf later? I promise I won’t talk about my latest DNF… much", timestamp: "14:07" }
        ],
        "Oscar": [
            { sender: "Oscar", content: "Still figuring out how this whole F1 thing works… Any tips? Also, I might have broken something again", timestamp: "14:07" }
        ],
        "George": [
            { sender: "George", content: "Woke up looking flawless today, as usual. Do you ever just stare at yourself in the mirror and think, 'Wow, perfection'?", timestamp: "14:07" }
        ],
        "Fernando": [
            { sender: "Fernando", content: "Age is just a number, right? I’m still faster than half these young guns! Also, how’s your day going? Any chances of me winning this time?", timestamp: "14:07" }
        ],
        "Lewis": [
            { sender: "Lewis", content: "Just finished meditating and walking Roscoe, now let's manifest some good vibes... and a win next Sunday!", timestamp: "14:06" }
        ],
        "Yuki": [
            { sender: "Yuki", content: "Just had the best sushi in my life. You should try it… oh, and I’m totally going to nail this next race! Or at least I hope so…", timestamp: "14:07" }
        ],
        "Lance": [
            { sender: "Lance", content: "Dad said I could borrow the Aston Martin tonight... should I take it for a spin or save it for the next race?", timestamp: "14:06" }
        ],
        "Nico": [
            { sender: "Nico", content: "Still hunting for that podium... it’s out there somewhere, right?", timestamp: "14:06" }
        ],
        "Daniel": [
            { sender: "Daniel", content: "Missed the podium, but hey, I'm still the king of the shoey", timestamp: "14:06" }
        ],
        "Esteban": [
            { sender: "Esteban", content: "Got any tips on how to avoid getting involved in team drama? Asking for a friend", timestamp: "14:07" }
        ],
        "Kevin": [
            { sender: "Kevin", content: "Haas finally didn’t break down today! Celebrate with me! Also, can we talk about how underrated I am?", timestamp: "14:07" }
        ],
        "Alex": [
            { sender: "Alex", content: "Just tried to explain F1 to my cats. They were more interested in the box the helmet came in", timestamp: "14:06" }
        ],
        "Guanyu": [
            { sender: "Guanyu", content: "Learning how to say 'No worries' in more languages. Pretty useful in F1", timestamp: "14:07" }
        ],
        "Pierre": [
            { sender: "Pierre", content: "Just dodged another teammate question in the press conference. Can't dodge penalties though", timestamp: "14:06" }
        ],
        "Valtteri": [
            { sender: "Valtteri", content: "Growing the mullet was a bold move, but at least it's faster than my pit stops", timestamp: "14:06" }
        ],
        "Logan": [
            { sender: "Logan", content: "What is a kilometer?", timestamp: "14:06" }
        ]

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

    const autoScroll = document.querySelector('.auto-scroll')
});
