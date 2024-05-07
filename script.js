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
});
