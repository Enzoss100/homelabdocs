document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        // Check if the link does not have an href attribute or has an empty href
        if (!link.hasAttribute('href') || link.getAttribute('href') === '') {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior
                window.location.href = '../pages/missingpage.html'; // Redirect to missingpage.html
            });
        } else {
            // Check if the href points to a valid URL
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior
                const url = link.getAttribute('href');

                fetch(url, { method: 'HEAD' })
                    .then(response => {
                        if (!response.ok) {
                            // If the response is not OK, redirect to missingpage.html
                            window.location.href = '../pages/missingpage.html';
                        } else {
                            // If the link exists, follow the link
                            window.location.href = url;
                        }
                    })
                    .catch(() => {
                        // If there is an error (e.g., network error), redirect to missingpage.html
                        window.location.href = '../pages/missingpage.html';
                    });
            });
        }
    });
});
