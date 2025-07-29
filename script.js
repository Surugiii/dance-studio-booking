let availability = JSON.parse(localStorage.getItem("availability")) || [];

function saveAvailability() {
  localStorage.setItem("availability", JSON.stringify(availability));
}

document.getElementById("bookingForm").addEventListener("submit", function(event) {
  event.preventDefault();

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("classTypeError").textContent = "";
  document.getElementById("dateError").textContent = "";

  let valid = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const classType = document.getElementById("classType").value;
  const date = document.getElementById("date").value;

  if (name === "") {
    document.getElementById("nameError").textContent = "Full Name is required.";
    valid = false;
  }
  if (email === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    valid = false;
  }
  if (classType === "") {
    document.getElementById("classTypeError").textContent = "Please select a class type.";
    valid = false;
  }
  if (date === "") {
    document.getElementById("dateError").textContent = "Please select a date.";
    valid = false;
  }

  if (!valid) return;

  const index = availability.findIndex(slot => slot.date === date);
  const confirmation = document.getElementById("confirmation");

  if (index !== -1 && availability[index].status === "Already Been Booked") {
    confirmation.textContent = `Sorry, ${date} is already been booked. Please choose another date.`;
    confirmation.style.color = "red";
    confirmation.style.opacity = 1;
    confirmation.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      confirmation.style.opacity = 0;
    }, 5000);
  } else {
    if (index !== -1) {
      availability[index].status = "Already Been Booked";
    } else {
      availability.push({ date: date, status: "Already Been Booked" });
    }
    saveAvailability();

    confirmation.textContent = `Thank you, ${name}! Your ${classType} session has been booked for ${date}.`;
    confirmation.style.color = "green";
    confirmation.style.opacity = 1;
    confirmation.scrollIntoView({ behavior: "smooth" });

    this.reset();

    setTimeout(() => {
      window.location.href = "schedule.html";
    }, 2000);
  }
});
