```javascript
/* ------------------------------
   Mobile Menu
--------------------------------*/

function toggleMenu() {

    const navLinks = document.getElementById("navLinks");

    navLinks.classList.toggle("active");

}


/* ------------------------------
   Contact Form
--------------------------------*/

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");


    // Check empty fields

    if (name === "" || email === "" || message === "") {

        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.style.color = "red";

        return;
    }


    // Simple email validation

    if (!email.includes("@") || !email.includes(".")) {

        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.style.color = "red";

        return;
    }


    // Success message

    formMessage.textContent =
        "Thank you! Your message has been submitted.";

    formMessage.style.color = "green";


    // Clear form

    contactForm.reset();

});
```
