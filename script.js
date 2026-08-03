/*--- Herpositioneer de pagina bij het laden om te voorkomen dat de gebruiker op een willekeurige positie in de pagina terechtkomt ---*/

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
});

/*--- Voeg een animatie toe aan de sectietitels wanneer ze in beeld komen ---*/
const sectionTitles = document.querySelectorAll(".section-title");

const titleObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

        const title = entry.target;
        const content = title.nextElementSibling;

        title.classList.add("is-visible");

        if (content) {
            content.classList.add("is-visible");
        }

        observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.3
    }
);

sectionTitles.forEach((title) => {
    titleObserver.observe(title);
});