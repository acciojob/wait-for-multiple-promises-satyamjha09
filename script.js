const table = document.getElementById("output"); // Assuming a table with id "output-table"

// Add initial "Loading..." row
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.innerText = "Loading...";
loadingRow.appendChild(loadingCell);
table.appendChild(loadingRow);

// Create promises with random resolve times between 1 and 3 seconds
const createPromise = (name) => {
  const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, time: time.toFixed(3) });
    }, time * 1000);
  });
};

const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];

// Start measuring total time
const startTime = performance.now();

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Calculate total time
  const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

  // Remove "Loading..." row
  table.removeChild(loadingRow);

  // Populate table with results
  results.forEach((result, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.innerText = `Promise ${index + 1}`;

    const timeCell = document.createElement("td");
    timeCell.innerText = result.time;

    row.appendChild(nameCell);
    row.appendChild(timeCell);
    table.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");

  const totalNameCell = document.createElement("td");
  totalNameCell.innerText = "Total";

  const totalTimeCell = document.createElement("td");
  totalTimeCell.innerText = totalTime;

  totalRow.appendChild(totalNameCell);
  totalRow.appendChild(totalTimeCell);
  table.appendChild(totalRow);
});
