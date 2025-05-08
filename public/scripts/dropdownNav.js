document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("dropdownNav-button");
    const dropdown = document.getElementById("dropdownNav");
    const dropdownButtons = dropdown.querySelectorAll("button[data-href]");

    function toggleDropdown() {
        dropdown.classList.toggle("hidden");
    }

    function closeDropdownOnOutsideClick(event) {
        if (!dropdown.contains(event.target) && event.target !== button) {
            dropdown.classList.add("hidden");
        }
    }

    function syncTexts() {
        dropdownButtons.forEach(btn => {
            const href = btn.dataset.href;
            const mainLink = document.querySelector(`a[href="${href}"]`);
            if (mainLink) {
                btn.textContent = mainLink.textContent;
            }
        });
    }

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleDropdown();
        syncTexts(); // Actualitza els textos cada cop que s'obre
    });

    document.addEventListener("click", closeDropdownOnOutsideClick);

    dropdownButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.href;
            const section = document.querySelector(target);
            if (section) {
                // section.scrollIntoView({ behavior: "smooth" });
                section.scrollIntoView();
                dropdown.classList.add("hidden");
            }
        });
    });
});
