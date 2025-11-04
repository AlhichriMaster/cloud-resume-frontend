// counter.js - Visitor Counter
const API_URL = 'https://w3eoxrets4.execute-api.us-east-1.amazonaws.com/prod/visitor'; // We'll update this later

async function updateVisitorCount() {
    try {
        console.log('Fetching visitor count...');
        
        // Call API to increment and get count
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Visitor count:', data.count);
        
        // Update the display with animation
        const countElement = document.getElementById('visitor-count');
        countElement.style.opacity = '0';
        
        setTimeout(() => {
            countElement.textContent = data.count.toLocaleString();
            countElement.style.opacity = '1';
            countElement.style.transition = 'opacity 0.3s ease-in';
        }, 200);
        
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        document.getElementById('visitor-count').textContent = 'Unable to load';
    }
}

// Call function when page loads
window.addEventListener('DOMContentLoaded', updateVisitorCount);