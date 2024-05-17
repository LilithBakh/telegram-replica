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
        
            if (header) {
                header.style.visibility = 'visible';
                chatInputContainer.style.visibility = 'visible';
            }
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

    searchInput.addEventListener('input', updateClearIcon);

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
    }

    searchClear.addEventListener('mousedown', function(event) {
        event.preventDefault();
    });

    searchClear.addEventListener('click', clearInput);
});