// DOM element selectors
const wrapper = document.querySelector('.js-wrapper');
let input = document.getElementById('js-input');
const alertText = document.querySelector('.alert');

// Event listener for all calculator button clicks
wrapper.addEventListener('click', (e) => {
  const element = e.target;

  // Exit if clicked element isn’t a button
  if (!element.classList.contains('button')) return;

  const clickedValue = element.innerText;

  // Handle button actions based on class
  if (element.classList.contains('del')) {
    // Remove last character from input
    input.value = input.value.slice(0, -1);
  } else if (element.classList.contains('sign')) {
    // Toggle negative sign, skip if input is just "0"
    if (input.value[0] === '0') return;

    if (input.value.startsWith('-')) {
      input.value = input.value.slice(1);
    } else if (input.value.length > 0) {
      input.value = '-' + input.value;
    }
  } else if (element.classList.contains('clear')) {
    // Reset input to empty
    input.value = '';
  } else if (element.classList.contains('calc')) {
    // Evaluate the expression when equals is pressed
    if (input.value.length === 0) input.value = 0; // Default to 0 if empty

    if (input.value.includes('/0')) {
      // Handle division by zero error
      alertText.innerText = "Can't divide by zero.";
      setTimeout(() => (alertText.innerText = ''), 2000);
      throw new Error('Division by zero');
    }
    input.value = String(eval(input.value)); // Compute and display result
  } else if (element.classList.contains('percent')) {
    // Convert current input to percentage
    if (input.value.length > 0) {
      input.value = String(parseFloat(input.value) / 100);
    }
  } else {
    // Append clicked value (numbers, operators) to input
    input.value += clickedValue;
  }
});
