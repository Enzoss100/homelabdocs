// Function to fetch and display links from linkstash.json
async function loadLinks() {
    try {
        console.log('Fetching linkstash.json...');

        // Fetch the content of linkstash.json from the assets directory
        const response = await fetch('../assets/linkstash.json');

        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Could not fetch linkstash.json');
        }

        console.log('File fetched successfully.');

        // Parse the JSON content of the file
        const data = await response.json();
        console.log('File content:', data); // Log the content

        // Reference to the table body where the links will be added
        const tableBody = document.getElementById('linksTable').getElementsByTagName('tbody')[0];

        // Loop through each entry in the JSON array and add it to the table
        data.forEach(entry => {
            // Use placeholders if name or url is missing or empty
            const siteName = entry.name && entry.name.trim() !== '' ? entry.name : '--SiteName--';
            const siteUrl = entry.url && entry.url.trim() !== '' ? entry.url : '--SiteURL--';

            // Create a new table row
            const row = document.createElement('tr');

            // Create and populate the site name cell
            const nameCell = document.createElement('td');
            nameCell.textContent = siteName;
            nameCell.classList.add('cellsite'); // Apply CSS class for site name column

            // Create and populate the URL cell
            const urlCell = document.createElement('td');
            const link = document.createElement('a');
            link.href = siteUrl !== '--SiteURL--' ? siteUrl : '../pages/missingpage.html'; // Link to '#' if placeholder
            link.textContent = siteUrl;
            link.classList.add('cell-link'); // Apply CSS class for URL
            urlCell.appendChild(link);

            // Add the cells to the row
            row.appendChild(nameCell);
            row.appendChild(urlCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading links:', error);
    }
}

// Call the function to load the links when the page loads
window.onload = loadLinks;
