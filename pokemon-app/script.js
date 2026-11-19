async function fetchData() {
    try {
        // Get the Pokemon name from the search bar
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

        // Check if the search bar is empty
        if (pokemonName === "") {
            document.getElementById("message").textContent = "Please enter a Pokemon name.";
            return;
        }

        // Fetch Pokemon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Pokemon not found");
        }

        // Convert the response to JSON
        const data = await response.json();

        // Get the Pokemon image
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        // Display Pokemon information
        document.getElementById("pokemonInfo").innerHTML = `
            <h3>${data.name}</h3>
            <p>ID: ${data.id}</p>
            <p>Height: ${data.height}</p>
            <p>Weight: ${data.weight}</p>
        `;

        // Clear any previous error message
        document.getElementById("message").textContent = "";

    } catch (error) {
        document.getElementById("message").textContent = "Pokemon not found. Try again.";
        document.getElementById("pokemonSprite").style.display = "none";
        document.getElementById("pokemonInfo").innerHTML = "";
        console.error(error);
    }
}
