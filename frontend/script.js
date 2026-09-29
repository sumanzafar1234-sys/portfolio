document.addEventListener("DOMContentLoaded", () => {

    const projectsGrid = document.querySelector(".projects-grid");

    if (!projectsGrid) {
        console.error("❌ .projects-grid not found");
        return;
    }

    fetch("http://127.0.0.1:8000/api/portfolio/")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        })

        .then(data => {

            console.log("✅ Python backend connected:", data);

            /*
             * We are NOT replacing the whole website.
             * Only the project cards are loaded from Python.
             */

            projectsGrid.innerHTML = "";

            data.projects.forEach(project => {

                const projectCard = document.createElement("div");

                projectCard.className = "project-card";

                projectCard.innerHTML = `
                    <div class="project-content">

                        <h3>${project.title}</h3>

                        <p>${project.description}</p>

                        ${
                            project.github && project.github !== "#"
                            ? `
                                <a href="${project.github}"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    View on GitHub
                                </a>
                              `
                            : `
                                <span class="github-disabled">
                                    GitHub link coming soon
                                </span>
                              `
                        }

                    </div>
                `;

                projectsGrid.appendChild(projectCard);
            });

        })

        .catch(error => {

            console.error("❌ Python backend connection failed:", error);

        });

});

const contactForm = document.getElementById("contactForm");

console.log("Contact JS loaded:", contactForm);

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        console.log("CONTACT FORM SUBMITTED");

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const message = document.getElementById("contactMessage").value;

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/contact/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );

            const data = await response.json();

            console.log("Python response:", data);

            if (!response.ok) {
                throw new Error(data.detail || "Message could not be sent.");
            }

            alert("Message sent successfully! ✅");

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);
            alert("Something went wrong. Check Console.");
        }
    });
}