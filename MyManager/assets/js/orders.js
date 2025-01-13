// Grab the form and table elements
const orderForm = document.getElementById('orderForm');
const orderTable = document.getElementById('orderTable').getElementsByTagName('tbody')[0];

// Function to load orders from localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach(order => addOrderToTable(order));
}

// Function to add a new order to the table
function addOrderToTable(order) {
    const newRow = orderTable.insertRow();

    // Insert cells into the row and populate them with the order data
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);  // For Edit/Delete buttons

    cell1.textContent = order.name;
    cell2.textContent = '$' + order.price;
    cell3.textContent = 'Due'; // Assume payment is due by default
    cell4.innerHTML = `<span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>`;

    // Add Edit and Delete buttons
    cell5.innerHTML = `
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    `;

    // Add event listeners to the newly added buttons
    const editButton = newRow.querySelector('.editBtn');
    const deleteButton = newRow.querySelector('.deleteBtn');

    // Edit Button functionality
    editButton.addEventListener('click', function() {
        // Pre-fill the form with the order's current values
        document.getElementById('orderName').value = order.name;
        document.getElementById('price').value = order.price;
        document.getElementById('orderStatus').value = order.status;

        // Remove the row after editing, so it can be updated
        newRow.remove();
        removeOrderFromLocalStorage(order);
    });

    // Delete Button functionality
    deleteButton.addEventListener('click', function() {
        // Remove the row from the table
        newRow.remove();
        removeOrderFromLocalStorage(order);
    });
}

// Function to remove an order from localStorage
function removeOrderFromLocalStorage(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(o => o.name !== order.name || o.price !== order.price || o.status !== order.status); // Filter out the order
    localStorage.setItem('orders', JSON.stringify(orders)); // Save the updated array to localStorage
}

// Listen for form submission
orderForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get the form input values
    const orderName = document.getElementById('orderName').value;
    const price = document.getElementById('price').value;
    const orderStatus = document.getElementById('orderStatus').value;

    // Create an order object
    const order = {
        name: orderName,
        price: price,
        status: orderStatus
    };

    // Save the order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order); // Add the new order
    localStorage.setItem('orders', JSON.stringify(orders)); // Save updated orders list

    // Add the order to the table
    addOrderToTable(order);

    // Clear the form fields after adding the order
    orderForm.reset();
});

// Load orders from localStorage when the page loads
window.onload = function() {
    loadOrders();
};
