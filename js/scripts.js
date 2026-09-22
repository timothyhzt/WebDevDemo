const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#main-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close main navigation" : "Open main navigation");
    });
}

const questionnaireForm = document.querySelector("#questionnaire-form");
const questionnaireResult = document.querySelector("#questionnaire-result");

const recommendations = {
    interest: {
        programs: {
            label: "programs and degree options",
            url: "programs.html"
        },
        resources: {
            label: "student resources",
            url: "resources.html"
        },
        opportunities: {
            label: "academic and career opportunities",
            url: "opportunities.html"
        }
    },
    level: {
        undergraduate: {
            label: "undergraduate study",
            url: "undergraduate.html"
        },
        graduate: {
            label: "graduate study",
            url: "graduate.html"
        },
        online: {
            label: "online learning",
            url: "online.html"
        }
    }
};

if (questionnaireForm && questionnaireResult) {
    questionnaireForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!questionnaireForm.checkValidity()) {
            questionnaireForm.reportValidity();
            return;
        }

        const formData = new FormData(questionnaireForm);
        const interest = recommendations.interest[formData.get("interest")];
        const level = recommendations.level[formData.get("level")];

        questionnaireResult.innerHTML = `
            <h3>Your recommended starting points</h3>
            <p>Explore ${interest.label} with a focus on ${level.label}.</p>
            <p>
                <a href="${interest.url}">Explore ${interest.label}</a>
                or
                <a href="${level.url}">learn about ${level.label}</a>.
            </p>
        `;
        questionnaireResult.hidden = false;
        questionnaireResult.focus();
    });

    questionnaireForm.addEventListener("reset", () => {
        questionnaireResult.hidden = true;
        questionnaireResult.replaceChildren();
    });
}