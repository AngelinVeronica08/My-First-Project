function showSection(sectionId) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

// Dummy flight data
const flights = [
  { from: "Chennai", to: "Delhi", time: "10:00 AM" },
  { from: "Mumbai", to: "Bangalore", time: "2:00 PM" },
  { from: "Chennai", to: "Mumbai", time: "6:00 PM" }
];

function searchFlights() {
  const from = document.getElementById("from").value.toLowerCase();
  const to = document.getElementById("to").value.toLowerCase();
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  const filtered = flights.filter(f =>
    f.from.toLowerCase().includes(from) &&
    f.to.toLowerCase().includes(to)
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No flights found</p>";
    return;
  }

  filtered.forEach(flight => {
    const div = document.createElement("div");
    div.className = "flight";
    div.innerHTML = `
      <p>${flight.from} → ${flight.to}</p>
      <p>Time: ${flight.time}</p>
      <button onclick="selectSeats()">Book</button>
    `;
    resultsDiv.appendChild(div);
  });
}

function selectSeats() {
  showSection("seats");
  createSeats();
}

function createSeats() {
  const container = document.getElementById("seatContainer");
  container.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.innerText = i;

    if (Math.random() < 0.2) {
      seat.classList.add("occupied");
    }

    seat.addEventListener("click", () => {
      if (!seat.classList.contains("occupied")) {
        seat.classList.toggle("selected");
      }
    });

    container.appendChild(seat);
  }
}

function confirmBooking() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  alert(`Booking Confirmed! Seats: ${[...selectedSeats].map(s => s.innerText).join(", ")}`);
}