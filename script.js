document.getElementById("bookingForm").addEventListener("submit", function(event) {
  event.preventDefault();
  document.getElementById("confirmation").textContent = "Your booking request has been received!";
  this.reset();
});
