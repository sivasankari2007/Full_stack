const loadButton = document.getElementById("loadUsers");
const userContainer = document.getElementById("userContainer");

loadButton.addEventListener("click", loadUsers);

async function loadUsers() {

    userContainer.innerHTML = "<p>Loading users...</p>";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        const users = await response.json();

        userContainer.innerHTML = "";

        users.forEach(function(user) {

            const userCard = document.createElement("div");

            userCard.className = "user-card";

            userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
            `;

            userContainer.appendChild(userCard);
        });

    } catch (error) {

        userContainer.innerHTML =
            `<p class="error">Unable to load user data. Please try again.</p>`;

        console.error(error);
    }
}