const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

function handleEnter() {
    this.classList.add("trigger-enter");
    setTimeout(
        () =>
            this.classList.contains("trigger-enter") &&
            this.classList.add("trigger-enter-active"),
        150
    );
    background.classList.add("open");

    const dropdown = this.querySelector(".dropdown");
    const dropdownCords = dropdown.getBoundingClientRect();
    const navCords = nav.getBoundingClientRect();

    const coords = {
        height: dropdownCords.height,
        width: dropdownCords.width,
        top: dropdownCords.top - navCords.top,
        left: dropdownCords.left - navCords.left,
    };

    background.style.setProperty("width", `${coords.width}px`);
    background.style.setProperty("height", `${coords.height}px`);
    background.style.setProperty(
        "transform",
        `translate(${coords.left}px, ${coords.top}px)`
    );
}

function handleLeve() {
    this.classList.remove("trigger-enter", "trigger-enter-active");
    background.classList.remove("open");
}

triggers.forEach((trigger) =>
    trigger.addEventListener("mouseenter", handleEnter)
);

triggers.forEach((trigger) =>
    trigger.addEventListener("mouseleave", handleLeve)
);