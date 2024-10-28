// dietPlan.js

function recommendDiet() {
    const bmr = document.getElementById("bmrInput").value;
    const goal = document.getElementById("goal").value;
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    if (goal === "muscle-gain") {
        calories = parseInt(bmr) + 500;
        protein = (calories * 0.3) / 4; // 30% protein
        carbs = (calories * 0.5) / 4; // 50% carbs
        fats = (calories * 0.2) / 9; // 20% fats
    } else if (goal === "weight-loss") {
        calories = parseInt(bmr) - 500;
        protein = (calories * 0.35) / 4; // 35% protein
        carbs = (calories * 0.4) / 4; // 40% carbs
        fats = (calories * 0.25) / 9; // 25% fats
    } else if (goal === "maintenance") {
        calories = parseInt(bmr);
        protein = (calories * 0.25) / 4; // 25% protein
        carbs = (calories * 0.5) / 4; // 50% carbs
        fats = (calories * 0.25) / 9; // 25% fats
    }

    document.getElementById("dietPlan").innerHTML = `
        <p>Based on your BMR of ${bmr} calories, your recommended daily intake for your goal is approximately <span>${calories}</span> calories.</p>
        <table border="1" cellpadding="10" cellspacing="0">
            <thead>
                <tr>
                    <th>Macronutrient</th>
                    <th>Grams per Day</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Protein</td>
                    <td>${protein.toFixed(2)} g</td>
                </tr>
                <tr>
                    <td>Carbohydrates</td>
                    <td>${carbs.toFixed(2)} g</td>
                </tr>
                <tr>
                    <td>Fats</td>
                    <td>${fats.toFixed(2)} g</td>
                </tr>
            </tbody>
        </table>
    `;
}
