/**
 * Customer Directory Loader
 * Displays customer data from embedded JSON
 */

// Customer data embedded in JavaScript
const customerData = {
    "customers": [
        {
            "name": "NEW AUTO POINT",
            "gstNumber": "18ACQPM9542F1Z3"
        },
        {
            "name": "SRI BALAJI DISTRIBUTORS",
            "gstNumber": "18AESPC6931Q1ZP"
        },
        {
            "name": "M/S GURUDEV ENTERPRISE",
            "gstNumber": "18ACQPM9540H1Z1"
        },
        {
            "name": "M/S. INDIA AUTOMOBILES",
            "gstNumber": "18ACZPJ6970D1ZZ"
        },
        {
            "name": "M/S NISHANT ENTERPRISES",
            "gstNumber": "18AANFN1665P1ZH"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Display customers immediately
    displayCustomers(customerData.customers);
});

/**
 * Display customers in the table
 * @param {Array} customers - Array of customer objects
 */
function displayCustomers(customers) {
    const customerList = document.getElementById('customer-list');

    if (!customerList) {
        console.error('Customer list element not found');
        return;
    }

    if (!customers || customers.length === 0) {
        customerList.innerHTML = `
            <tr>
                <td colspan="3" class="empty-state">
                    <i class="ph ph-folder-open"></i>
                    <h3>No customers found</h3>
                    <p>There are no customers in the directory.</p>
                </td>
            </tr>
        `;
        return;
    }

    // Generate table rows
    const rows = customers.map((customer, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td class="customer-name">${escapeHtml(customer.name)}</td>
                <td class="customer-gst">${escapeHtml(customer.gstNumber)}</td>
            </tr>
        `;
    }).join('');

    customerList.innerHTML = rows;
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
