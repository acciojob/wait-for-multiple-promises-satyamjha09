// Ensure there's a row in your HTML with id="loading":
// <tr id="loading">
//   <td colspan="2">Loading...</td>
// </tr>

// Record the start time for the entire set of promises
const startTime = performance.now();

// Helper function to create a promise that resolves after a random time between 2 and 3 seconds
function createRandomPromise() {
  // randomDelay is now either 2 or 3 seconds
  const randomDelay = Math.floor(Math.random() * 2) + 2;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomDelay);
    }, randomDelay * 1000);
  });
}

// Create 3 promises
const promises = [
  createRandomPromise(),
  createRandomPromise(),
  createRandomPromise()
];

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // The real time from start to finish
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000; // in seconds

  // Remove the "Loading..." row
  const output = document.getElementById('output');
  output.innerHTML = '';

  // Populate each promise result
  results.forEach((timeTaken, index) => {
    const row = document.createElement('tr');
    const col1 = document.createElement('td');
    const col2 = document.createElement('td');

    col1.textContent = `Promise ${index + 1}`;
    col2.textContent = timeTaken; // the time in seconds
    row.appendChild(col1);
    row.appendChild(col2);
    output.appendChild(row);
  });

  // Add a row for total time
  const totalRow = document.createElement('tr');
  const totalCol1 = document.createElement('td');
  const totalCol2 = document.createElement('td');

  totalCol1.textContent = 'Total';
  totalCol2.textContent = totalTime.toFixed(3); // e.g., 2.150
  totalRow.appendChild(totalCol1);
  totalRow.appendChild(totalCol2);
  output.appendChild(totalRow);
});
