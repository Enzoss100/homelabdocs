document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        // Check if the link does not have an href attribute
        if (!link.hasAttribute('href') || link.getAttribute('href') === '') {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior
                window.location.href = 'missingpage.html'; // Redirect to missingpage.html
            });
        }
    });
});
