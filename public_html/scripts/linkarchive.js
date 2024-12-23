// Function to fetch and display links from linkstash.json
async function loadLinks() {
    try {
        console.log('Fetching linkstash.json...');
        
        // Fetch the content of linkstash.json from the assets directory with cache-busting
        const response = await fetch(`../assets/linkstash.json?timestamp=${new Date().getTime()}`);
        
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Could not fetch linkstash.json');
        }
        
        console.log('File fetched successfully.');

        // Parse the JSON content
        const data = await response.json();
        console.log('File content:', data); // Log the JSON content

        // Reference to the table body where the links will be added
        const tableBody = document.getElementById('linksTable').getElementsByTagName('tbody')[0];

        // Clear existing table data
        tableBody.innerHTML = '';

        // If no entries are found in the JSON file, add a placeholder
        if (data.length === 0) {
            const placeholderRow = document.createElement('tr');

            // Create and populate the placeholder cells
            const nameCell = document.createElement('td');
            nameCell.textContent = '--SiteName--';
            nameCell.classList.add('cellsite'); // Apply CSS class for site name column

            const urlCell = document.createElement('td');
            const link = document.createElement('a');
            link.href = '../pages/missingpage.html'; // Placeholder link
            link.textContent = '--SiteURL--';
            link.classList.add('cell-link'); // Apply CSS class for URL
            urlCell.appendChild(link);

            // Add the cells to the row
            placeholderRow.appendChild(nameCell);
            placeholderRow.appendChild(urlCell);

            // Append the placeholder row to the table body
            tableBody.appendChild(placeholderRow);
        } else {
            // Loop through the JSON data and add it to the table
            data.forEach(entry => {
                // Create a new table row
                const row = document.createElement('tr');

                // Create and populate the site name cell
                const nameCell = document.createElement('td');
                nameCell.textContent = entry.siteName;
                nameCell.classList.add('cellsite'); // Apply CSS class for site name column

                // Create and populate the URL cell
                const urlCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = entry.url;
                link.textContent = entry.url;
                link.classList.add('cell-link'); // Apply CSS class for URL
                urlCell.appendChild(link);

                // Add the cells to the row
                row.appendChild(nameCell);
                row.appendChild(urlCell);

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error loading links:', error);
    }
}

// Call the function to load the links when the page loads
window.onload = loadLinks;
