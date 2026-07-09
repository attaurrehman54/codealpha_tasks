// Select the display input element
const display = document.getElementById('display');

// Function to append numbers and operators to the screen
function appendValue(value) {
    // Clear the "Error" message before typing a new number
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
}

// Function to clear the entire display screen
function clearDisplay() {
    display.value = '';
}

// Function to evaluate and calculate the mathematical expression
function calculateResult() {
    try {
        // Only evaluate if the display is not empty
        if (display.value !== '') {
            // eval() executes the string as JavaScript code (math calculation)
            display.value = eval(display.value);
        }
    } catch (error) {
        // Catch invalid inputs (e.g., "5++5") and display an error message
        display.value = 'Error';
    }
}