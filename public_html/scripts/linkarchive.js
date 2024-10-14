// Function to fetch and display links from linkstash.txt
async function loadLinks() {
    try {
        // Fetch the content of linkstash.txt
        const response = await fetch('../assets/linkstash.txt');
        
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Could not fetch linkstash.txt');
        }

        // Read the text content of the file
        const text = await response.text();

        // Split the text into lines (each line contains a site name and URL separated by a colon)
        const lines = text.split('\n').filter(line => line.trim() !== '');

        // Reference to the table body where the links will be added
        const tableBody = document.getElementById('linksTable').getElementsByTagName('tbody')[0];

        // Loop through each line, split by ":", and add it to the table
        lines.forEach(line => {
            // Split the line by ":"
            const [siteName, url] = line.split(' : ').map(part => part.trim());

            // Create a new table row
            const row = document.createElement('tr');

            // Create and populate the site name cell
            const nameCell = document.createElement('td');
            nameCell.textContent = siteName;

            // Create and populate the URL cell
            const urlCell = document.createElement('td');
            const link = document.createElement('a');
            link.href = url;
            link.textContent = url;
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
