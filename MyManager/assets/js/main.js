// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Load recent customers from localStorage and populate the table
function loadRecentCustomers() {
  // Retrieve customers from localStorage (or an empty array if none exist)
  const customers = JSON.parse(localStorage.getItem('customers')) || [];

  const recentCustomerTable = document.getElementById('recentCustomerTable').getElementsByTagName('tbody')[0];
  recentCustomerTable.innerHTML = '';  // Clear any existing rows

  // Loop through the customers and create rows for each
  customers.forEach(customer => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td width="60px">
              <div class="imgBx">
                  <img src="assets/imgs/customer01.jpg" alt="Customer Image">
              </div>
          </td>
          <td>
              <h4>${customer.name} <br> <span>${customer.country}</span></h4>
          </td>
          <td>${customer.country}</td>
      `;
      recentCustomerTable.appendChild(newRow);
  });
}

// Call the function when the page is loaded
window.onload = function() {
  loadRecentCustomers();

};

