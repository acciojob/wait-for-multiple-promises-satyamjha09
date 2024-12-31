// Record the start time for the entire set of promises
const startTime = performance.now();

// Helper function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise() {
  const randomDelay = Math.floor(Math.random() * 3) + 1;
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

// Wait for all promises to resolve using Promise.all
Promise.all(promises).then((results) => {
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000; // time in seconds

  // Remove the loading row
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

  // Add the total row
  const totalRow = document.createElement('tr');
  const totalCol1 = document.createElement('td');
  const totalCol2 = document.createElement('td');

  totalCol1.textContent = 'Total';
  totalCol2.textContent = totalTime.toFixed(3); // for example, 3.006
  totalRow.appendChild(totalCol1);
  totalRow.appendChild(totalCol2);
  output.appendChild(totalRow);
});

