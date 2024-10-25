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

        // Read and parse the JSON content of the file
        const linksData = await response.json();
        console.log('File content:', linksData); // Log the parsed content

        // Reference to the table body where the links will be added
        const tableBody = document.getElementById('linksTable').getElementsByTagName('tbody')[0];

        // If no entries are in the JSON file, add a placeholder row
        if (linksData.length === 0) {
            const placeholderRow = createRow('--SiteName--', '--SiteURL--');
            tableBody.appendChild(placeholderRow);
        } else {
            // Loop through each object in the JSON array and add it to the table
            linksData.forEach(entry => {
                const siteName = entry.name || '--SiteName--'; // Placeholder if name is missing
                const url = entry.url || '#'; // Placeholder link if URL is missing
                const row = createRow(siteName, url);
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error loading links:', error);
    }
}

// Helper function to create a table row with the provided site name and URL
function createRow(siteName, url) {
    // Create a new table row
    const row = document.createElement('tr');

    // Create and populate the site name cell
    const nameCell = document.createElement('td');
    nameCell.textContent = siteName;
    nameCell.classList.add('cellsite'); // Apply CSS class for site name column

    // Create and populate the URL cell
    const urlCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = url === '#' ? '--SiteURL--' : url; // Placeholder text if URL is missing
    link.classList.add('cell-link'); // Apply CSS class for URL
    urlCell.appendChild(link);

    // Add the cells to the row
    row.appendChild(nameCell);
    row.appendChild(urlCell);

    return row;
}

// Call the function to load the links when the page loads
window.onload = loadLinks;
