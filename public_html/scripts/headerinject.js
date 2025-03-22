document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
        <header class="topmenu">
            <div class="menu-item">
                <a href="./index.html" class="headerlink">Home Page</a>
            </div>
            <div class="menu-item">
                <a href="./machine.html" class="headerlink">Machine Specs</a>
            </div>
            <div class="menu-item">
                <a href="./devinfo.html" class="headerlink">Developer Info</a>
            </div>
            <div class="menu-item">
                <a href="./links.html" class="headerlink">Link Archive</a>
            </div>
        </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);
});

