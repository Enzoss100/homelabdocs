// Function to fetch and display links from linkstash.txt
async function loadLinks() {
    try {
        console.log('Fetching linkstash.txt...');
        
        // Fetch the content of linkstash.txt from the assets directory
        const response = await fetch('../assets/linkstash.txt');
        
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Could not fetch linkstash.txt');
        }
        
        console.log('File fetched successfully.');

        // Read the text content of the file
        const text = await response.text();
        console.log('File content:', text); // Log the content

        // Split the text into lines (each line contains a site name and URL separated by a colon)
        const lines = text.split('\n').filter(line => line.trim() !== '');
        console.log('Lines:', lines); // Log the split lines

        // Reference to the table body where the links will be added
        const tableBody = document.getElementById('linksTable').getElementsByTagName('tbody')[0];

        // If no lines are read from the file, add a placeholder
        if (lines.length === 0) {
            const placeholderRow = document.createElement('tr');
            
            // Create and populate the placeholder site name cell
            const nameCell = document.createElement('td');
            nameCell.textContent = '--SiteName--';
            nameCell.classList.add('cellsite'); // Apply CSS class for site name column

            // Create and populate the placeholder URL cell
            const urlCell = document.createElement('td');
            const link = document.createElement('a');
            link.href = '../assets/linkstash.txt'; // Placeholder link
            link.textContent = '--SiteURL--';
            link.classList.add('cell-link'); // Apply CSS class for URL
            urlCell.appendChild(link);

            // Add the cells to the row
            placeholderRow.appendChild(nameCell);
            placeholderRow.appendChild(urlCell);

            // Append the placeholder row to the table body
            tableBody.appendChild(placeholderRow);
        } else {
            // Loop through each line, split by ":", and add it to the table
            lines.forEach((line, index) => {
                const [siteName, url] = line.split(' : ').map(part => part.trim());

                // Create a new table row
                const row = document.createElement('tr');

                // Create and populate the index cell
                const indexCell = document.createElement('td');
                indexCell.textContent = index + 1; // Adding the index number
                row.appendChild(indexCell);

                // Create and populate the site name cell
                const nameCell = document.createElement('td');
                nameCell.textContent = siteName;
                nameCell.classList.add('cellsite'); // Apply CSS class for site name column

                // Create and populate the URL cell
                const urlCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = url;
                link.textContent = url;
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
