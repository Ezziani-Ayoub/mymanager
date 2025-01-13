// Select the form and table
const addCustomerForm = document.getElementById('addCustomerForm');
const recentCustomersTable = document.querySelector('.recentCustomers table');
const customerList = document.getElementById("customerList"); // Assuming this is where customers are displayed

let editingIndex = null; // Variable to store the index of the customer being edited

// Function to load customers from localStorage
function loadCustomers() {
    // Get customers from localStorage or an empty array if none exist
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    // Clear existing rows in the table
    customerList.innerHTML = '';

    // Loop through each customer and append a row to the table
    customers.forEach((customer, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.country}</td>
            <td>${customer.email}</td>
            <td>
                <button class="edit-btn" onclick="editCustomer(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteCustomer(${index})">Delete</button>
            </td>
        `;
        customerList.appendChild(newRow);
    });
}

// Listen for the form submit event
addCustomerForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get input values
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerCountry = document.getElementById('customerCountry').value;

    // Validate inputs
    if (customerName.trim() === '' || customerEmail.trim() === '' || customerCountry.trim() === '') {
        alert('Please fill out all fields!');
        return;
    }

    // Get existing customers from localStorage
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    if (editingIndex !== null) {
        // Update existing customer data (if editing)
        customers[editingIndex] = {
            name: customerName,
            email: customerEmail,
            country: customerCountry
        };
        alert('Customer updated successfully!');
    } else {
        // Add new customer (if not editing)
        const newCustomer = {
            name: customerName,
            email: customerEmail,
            country: customerCountry
        };
        customers.push(newCustomer);
        alert('Customer added successfully!');
    }

    // Save the updated customers array back to localStorage
    localStorage.setItem('customers', JSON.stringify(customers));

    // Reload the customer list in the table
    loadCustomers();

    // Reset the form inputs and change the button back to "Add Customer"
    addCustomerForm.reset();
    const submitButton = addCustomerForm.querySelector('button');
    submitButton.textContent = 'Add Customer';

    // Reset the editing index
    editingIndex = null;
});

// Edit customer function
function editCustomer(index) {
    // Get existing customers from localStorage
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    // Populate the form with the selected customer's data
    document.getElementById('customerName').value = customers[index].name;
    document.getElementById('customerCountry').value = customers[index].country;
    document.getElementById('customerEmail').value = customers[index].email;

    // Change the form submit button to "Update Customer"
    const submitButton = addCustomerForm.querySelector('button');
    submitButton.textContent = 'Update Customer';

    // Store the index of the customer being edited
    editingIndex = index;
}

// Delete customer function
function deleteCustomer(index) {
    // Get existing customers from localStorage
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    // Remove the customer from the array
    customers.splice(index, 1);

    // Save the updated customers array back to localStorage
    localStorage.setItem('customers', JSON.stringify(customers));

    // Reload the customer list in the table
    loadCustomers();
}

// Load customers when the page is loaded or refreshed
window.onload = loadCustomers;
