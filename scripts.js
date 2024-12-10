// Get the modal
var modal = document.getElementById("addAccountModal");

// Get the button that opens the modal
var btn = document.getElementById("addAccountBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById("addAccountForm").onsubmit = function(event) {
    event.preventDefault();
    
    // Get form data
    var accountId = document.getElementById("accountId").value;
    var accountPassword = document.getElementById("accountPassword").value;
    var accountPlatform = document.getElementById("accountPlatform").value;

    // Add new row to the table
    var table = document.getElementById("socialAccountsTable");
    var tbody = table.getElementsByTagName("tbody")[0];
    var newRow = tbody.insertRow();

    // Insert cells
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    // Add cell content
    cell1.textContent = accountId;
    cell2.textContent = accountPlatform;
    cell3.innerHTML = '<span class="status-active">Active</span>';
    cell4.innerHTML = '<button class="action-btn edit-btn">Edit</button><button class="action-btn delete-btn">Delete</button>';

    // Close the modal and reset the form
    modal.style.display = "none";
    this.reset();
}

// Function to handle edit button click
function handleEdit(event) {
    var row = event.target.closest('tr');
    var accountId = row.cells[0].textContent;
    var platform = row.cells[1].textContent;
    
    // You can implement edit functionality here
    console.log("Edit account:", accountId, platform);
}

// Function to handle delete button click
function handleDelete(event) {
    var row = event.target.closest('tr');
    var accountId = row.cells[0].textContent;
    
    if (confirm("Are you sure you want to delete this account?")) {
        row.remove();
        console.log("Deleted account:", accountId);
    }
}

// Add event listeners for edit and delete buttons
document.getElementById("socialAccountsTable").addEventListener("click", function(event) {
    if (event.target.classList.contains("edit-btn")) {
        handleEdit(event);
    } else if (event.target.classList.contains("delete-btn")) {
        handleDelete(event);
    }
});

