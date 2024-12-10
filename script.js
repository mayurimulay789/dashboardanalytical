// Get the modal
var modal = document.getElementById("createModal");

// Get the button that opens the modal
var btn = document.getElementById("createNewBtn");

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

// Get the form and add submit event listener
var form = document.getElementById("createForm");
form.onsubmit = function(event) {
  event.preventDefault();
  
  // Get form data
  var profileUrlId = document.getElementById("profileUrlId").value;
  var postUrls = Array.from(document.getElementsByName("postUrls[]")).map(input => input.value);
  var postDateTime = document.getElementById("postDateTime").value;
  var postFoundDateTime = document.getElementById("postFoundDateTime").value;

  // Add new rows to the table
  var table = document.getElementById("postDataTable");
  var tbody = table.getElementsByTagName("tbody")[0];

  // Add user row
  var userRow = tbody.insertRow();
  userRow.className = "user-row";
  var userCell = userRow.insertCell(0);
  userCell.colSpan = 4;
  userCell.textContent = profileUrlId;

  // Add post rows
  postUrls.forEach(function(postUrl) {
    var postRow = tbody.insertRow();
    postRow.className = "post-row";
    postRow.insertCell(0);
    postRow.insertCell(1).textContent = postUrl;
    postRow.insertCell(2).textContent = postDateTime;
    postRow.insertCell(3).textContent = postFoundDateTime;
  });

  // Clear form fields
  form.reset();

  // Close the modal
  modal.style.display = "none";
}

// Get the cancel button and add click event listener
var cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.onclick = function() {
  modal.style.display = "none";
}

// Function to add new post URL input
function addPostUrlInput() {
  var container = document.getElementById("postUrlsContainer");
  var newInput = document.createElement("div");
  newInput.className = "post-url-container";
  newInput.innerHTML = `
    <input type="url" name="postUrls[]" required>
    <button type="button" class="remove-url-btn">Remove</button>
  `;
  container.appendChild(newInput);
}

// Function to remove post URL input
function removePostUrlInput(button) {
  var container = document.getElementById("postUrlsContainer");
  if (container.children.length > 1) {
    button.parentElement.remove();
  }
}

// Add event listener for adding new post URL input
document.getElementById("addUrlBtn").addEventListener("click", addPostUrlInput);

// Add event listener for removing post URL input
document.getElementById("postUrlsContainer").addEventListener("click", function(e) {
  if (e.target && e.target.className == "remove-url-btn") {
    removePostUrlInput(e.target);
  }
});

// Function to sort the table
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("postDataTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  // Update sorting indicators
  var headers = table.getElementsByTagName("TH");
  for (i = 0; i < headers.length; i++) {
    headers[i].innerHTML = headers[i].innerHTML.replace(" ▼", "").replace(" ▲", "");
  }
  headers[n].innerHTML += (dir == "asc") ? " ▲" : " ▼";
}

