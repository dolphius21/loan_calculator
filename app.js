// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // To show the loader when event happens
  document.getElementById('loading').style.display = 'block';
  // To show loader for only 2 secs
  setTimeout(calculateResults, 1000);
  // Prevent default behavior
  e.preventDefault();
});

// Calculate results
function calculateResults() {
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  // Calculation variables
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x-1);
  // Check if monthly payment is a finite number
  if (isFinite(monthly)) {
    // To give value 2 decimal places, use toFixed
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    // To show results that was hidden
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers')
  }
}

// Show error
function showError(error) {
  // Hide loader
  document.getElementById('loading').style.display = 'none'; 
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Create a div
  const errorDiv = document.createElement('div');
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error after 3 secs
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}