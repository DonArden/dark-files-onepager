/*--- Herpositioneer de pagina bij het laden om te voorkomen dat
de gebruiker op een willekeurige positie in de pagina terechtkomt ---*/

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


/*--- Voeg een animatie toe aan de gewone sectietitels
wanneer ze in beeld komen ---*/

const sectionTitles = document.querySelectorAll(
    ".section-title:not(.stage-title)"
);

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


/*--- Voeg per morse-scene éénmalig de morse-animatie toe.

Wanneer de morse-animation is afgelopen, wordt alleen de
section-trail van diezelfde scene geactiveerd.

Elke scene wordt na de eerste activatie niet meer geobserveerd. ---*/

const morseScenes = document.querySelectorAll(".morse-scene");

const morseObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const scene = entry.target;

            const morse = scene.querySelector(".morse-help");
            const sectionTrail = scene.querySelector(".section-trail");

            if (!morse || !sectionTrail) {
                observer.unobserve(scene);
                return;
            }

            morse.addEventListener(
                "animationend",
                () => {
                    sectionTrail.classList.add("is-visible");
                },
                {
                    once: true
                }
            );

            morse.classList.add("is-visible");

            observer.unobserve(scene);
        });

    },
    {
        threshold: 0.2
    }
);

morseScenes.forEach((scene) => {
    morseObserver.observe(scene);
});


/*--- Voeg een aparte animatie toe aan de titel van
Uitgelicht Dossier wanneer de stage-sectie in beeld komt ---*/

const fileTitle = document.querySelector(".stage-title");

const fileTitleObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const content = fileTitle.nextElementSibling;

            fileTitle.classList.add("is-visible");

            if (content) {
                setTimeout(() => {
                    content.classList.add("is-visible");
                }, 2000);
            }

            observer.unobserve(entry.target);
        });

    },
    {
        threshold: 0.2
    }
);

fileTitleObserver.observe(
    document.querySelector("#stage")
);