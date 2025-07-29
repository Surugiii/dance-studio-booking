function renderAvailability() {
  const availability = JSON.parse(localStorage.getItem("availability")) || [];
  const calendarDiv = document.getElementById("calendar");

  if (availability.length === 0) {
    calendarDiv.innerHTML = "<tr><td colspan='3'>No slots available.</td></tr>";
    return;
  }

  let html = "<tr><th>Date</th><th>Status</th><th>Action</th></tr>";
  availability.forEach((slot, index) => {
    html += `<tr>
      <td>${slot.date}</td>
      <td>${slot.status}</td>
      <td><button onclick="deleteSlot(${index})">Delete</button></td>
    </tr>`;
  });

  calendarDiv.innerHTML = html;
}

function deleteSlot(index) {
  let availability = JSON.parse(localStorage.getItem("availability")) || [];
  if (confirm("Are you sure you want to delete this slot?")) {
    availability.splice(index, 1);
    localStorage.setItem("availability", JSON.stringify(availability));
    renderAvailability();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAvailability();
  
  setInterval(renderAvailability, 5000);
});