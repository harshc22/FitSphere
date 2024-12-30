document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const recipeContainer = document.getElementById("recipe-container");
    const apiKey = "AOOA/iEWde1a7pBYRJ6bLQ==fwBmPDqw4nWLQw82"; 

    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", async () => {
        const query = searchInput.value.trim();
        if (query) {
            await fetchRecipes(query);
        } else {
            alert("Please enter a search term.");
        }
    });

    async function fetchRecipes(query) {
        const apiUrl = `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(query)}`;
        
        try {
            recipeContainer.innerHTML = "<p>Loading recipes...</p>";
            const response = await fetch(apiUrl, {
                headers: { "X-Api-Key": apiKey }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const recipes = await response.json();
            displayRecipes(recipes);
        } catch (error) {
            recipeContainer.innerHTML = `<p>Failed to fetch recipes. ${error.message}</p>`;
        }
    }

    function displayRecipes(recipes) {
        if (recipes.length === 0) {
            recipeContainer.innerHTML = "<p>No recipes found. Try a different search term.</p>";
            return;
        }
    
        recipeContainer.innerHTML = recipes.map(recipe => {
            // Split ingredients by separators (e.g., "|")
            const ingredients = recipe.ingredients.split('|').map(ingredient => `<li>${ingredient.trim()}</li>`).join('');
    
            // Split instructions by steps (if the instructions are in a numbered format or newlines)
            const instructions = recipe.instructions.trim();
    
            return `
                <div class="recipe-card">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    
                    <div class="ingredients">
                        <h4>Ingredients:</h4>
                        <ul>
                            ${ingredients}
                        </ul>
                    </div>
    
                    <div class="instructions">
                        <h4>Instructions:</h4>
                        <ol>
                            ${instructions}
                        </ol>
                    </div>
                </div>
            `;
        }).join("");
    }
    
    
});
