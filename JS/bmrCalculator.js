function calculateBMR() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseFloat(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activity = document.getElementById("activity").value;

    let bmr;

    // BMR Calculation based on Harris-Benedict Equation
    if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Adjust BMR based on activity level
    let activityFactor;
    switch (activity) {
        case "sedentary":
            activityFactor = 1.2;
            break;
        case "light":
            activityFactor = 1.375;
            break;
        case "moderate":
            activityFactor = 1.55;
            break;
        case "active":
            activityFactor = 1.725;
            break;
        case "extra_active":
            activityFactor = 1.9;
            break;
    }

    const totalCalories = bmr * activityFactor;

    // Show result to the user
    document.getElementById("result").innerHTML = `
        Your BMR is <span>${Math.round(bmr)} calories/day</span>.
        <br>
        Based on your activity level, you need approximately <span>${Math.round(totalCalories)} calories/day</span>.
    `;
}
