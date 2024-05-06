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

            var contactPictureList = document.querySelector('.contact-picture-list')
            var contactPictureHeader = document.querySelector('.contact-picture-header');




            box.classList.add('contact-box-selected');
            var spans = box.querySelectorAll('span');
            spans.forEach(function (span) {
                contactPictureHeader.src = contactPictureList.src;
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
