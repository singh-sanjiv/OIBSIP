document.addEventListener('DOMContentLoaded', function () {
  const output = document.getElementById('output');
  const buttons = document.querySelectorAll('.button');

  let currentInput = '';
  let isDecimalAdded = false;

  // Add click event listener to all buttons
  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const buttonValue = this.textContent;

      if (buttonValue === 'C') {
        clearAll();
      } else if (buttonValue === 'DEL') {
        deleteLast();
      } else if (buttonValue === '=') {
        calculate();
      } else {
        handleInput(buttonValue);
      }
    });
  });

  // Function to handle number and operator inputs
  function handleInput(value) {
    if (value === '.' && isDecimalAdded) return; // Prevent multiple decimals
    if (value === '.') isDecimalAdded = true;

    currentInput += value;
    updateOutput(currentInput);
  }

  // Function to update the display
  function updateOutput(value) {
    output.textContent = value;
  }

  // Function to clear all inputs
  function clearAll() {
    currentInput = '';
    isDecimalAdded = false;
    updateOutput('0');
  }

  // Function to delete the last character
  function deleteLast() {
    if (currentInput.slice(-1) === '.') isDecimalAdded = false;
    currentInput = currentInput.slice(0, -1);
    updateOutput(currentInput || '0');
  }

  // Function to calculate the result
  function calculate() {
    try {
      // Evaluate the expression using JavaScript's eval() method
      const result = eval(currentInput);
      currentInput = result.toString();
      updateOutput(result);
    } catch (error) {
      updateOutput('Error');
      setTimeout(clearAll, 2000);
    }
  }
});
