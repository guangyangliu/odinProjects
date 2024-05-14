export function capitalize(str) {
    // Check if the string is empty
    if (str.length === 0) {
        return str;
    }
    // Capitalize the first character and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str) {
    // Split the string into an array of characters
    let characters = str.split('');
    // Reverse the array
    let reversedCharacters = characters.reverse();
    // Join the characters back into a string
    let reversedString = reversedCharacters.join('');
    // Return the reversed string
    return reversedString;
}

export function calculator() {
    function add(a, b) {
        return a + b;
    }
    function subtract(a, b) {
        return a - b;
    }
    function divide(a, b) {
        return a / b;
    }
    function multiply(a, b) {
        return a * b;
    }

    return {add, subtract, divide, multiply};
}


export function caesarCipher(str, shift) {
    // Define a function to shift a single character
    function shiftChar(char, shift) {
        // Check if the character is a letter
        if (/[a-zA-Z]/.test(char)) {
            // Determine the case (lowercase or uppercase)
            const base = char.charCodeAt( /[a-z]/.test(char) ? 'a' : 'A'.charCodeAt(0));
            // Shift the character code
            const shiftedCharCode = (char.charCodeAt(0) - base + shift) % 26 + base;
            // Convert the shifted character code back to a character
            return String.fromCharCode(shiftedCharCode);
        }
        // If the character is not a letter, return it unchanged
        return char;
    }

    // Apply the shift to each character in the string
    return str.split('').map(char => shiftChar(char, shift)).join('');
}


export function analyzeArray(arr) {
    // Calculate the sum of all numbers in the array
    const sum = arr.reduce((acc, num) => acc + num, 0);
    // Calculate the average by dividing the sum by the length of the array
    const average = sum / arr.length;
    // Find the minimum value in the array
    const min = Math.min(...arr);
    // Find the maximum value in the array
    const max = Math.max(...arr);
    
    // Return an object with the calculated properties
    return {
        average: average,
        min: min,
        max: max,
        length: arr.length
    };
}