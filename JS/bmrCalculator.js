$(document).ready(function () {
    // Initialize Select2 on the #activity dropdown without the search bar
    $('#activity').select2({
        placeholder: "Select your activity level",
        width: '100%',  // Optional: Set width to 100% for better responsiveness
        minimumResultsForSearch: Infinity  // Disables the search bar
    });

    // Function to calculate BMR
    function calculateBMR() {
        const gender = $('input[name="gender"]:checked').val();
        const age = parseFloat($('#age').val());
        const weight = parseFloat($('#weight').val());
        const height = parseFloat($('#height').val());
        const activity = $('#activity').val();

        // Log inputs for debugging
        console.log('Gender:', gender);
        console.log('Age:', age);
        console.log('Weight:', weight);
        console.log('Height:', height);
        console.log('Activity:', activity);

        // Check if all fields are filled correctly
        if (!gender || isNaN(age) || isNaN(weight) || isNaN(height) || !activity) {
            // If any field is empty or invalid, clear the result
            $('#result').html('');
            return;
        }

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
            default:
                activityFactor = 1; // Default case in case activity is not selected
        }

        const totalCalories = bmr * activityFactor;

        // Show result to the user
        $('#result').html(`
            Your BMR is <span>${Math.round(bmr)} calories/day</span>.
            <br>
            Based on your activity level, you need approximately <span>${Math.round(totalCalories)} calories/day</span>.
        `);
    }

    // Trigger live calculation when input fields change or Select2 dropdown is changed
    $("input, select").on("change input", function() {
        calculateBMR();
    });

    // Trigger the calculation immediately to show initial state (in case there is a pre-selected activity level)
    calculateBMR();

    // Bind the select2 change event specifically to the activity level
    $('#activity').on('select2:select', function () {
        calculateBMR();
    });
});
