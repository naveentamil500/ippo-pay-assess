
function minStepsPasswordCorrection(password) {
    let numSteps = 0;
    const n = password.length;
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let hasRepeat = false;

    // base condition - length
    if (n < 6) {
        numSteps = Math.max(numSteps, 6 - n);
    } else if (n > 20) {
        numSteps = Math.max(numSteps, n - 20);
    }

    // base condition - character
    for (let i = 0; i < n; i++) {
        if (password[i] >= 'a' && password[i] <= 'z') {
            hasLower = true;
        } else if (password[i] >= 'A' && password[i] <= 'Z') {
            hasUpper = true;
        } else if (password[i] >= '0' && password[i] <= '9') {
            hasDigit = true;
        }
    }
    if (!hasLower) {
        numSteps++;
    }
    if (!hasUpper) {
        numSteps++;
    }
    if (!hasDigit) {
        numSteps++;
    }

    // Check for repeating characters
    for (let i = 0; i < n; i++) {
        if (i < n - 2 && password[i] === password[i + 1] && password[i] === password[i + 2]) {
            hasRepeat = true;
            break;
        }
    }
    if (hasRepeat) {
        numSteps++;
    }

    // Return minimum number of steps
    return numSteps;
}

module.exports = {
    minStepsPasswordCorrection: minStepsPasswordCorrection,
}


