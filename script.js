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
const sectionTitles = document.querySelectorAll(".section-title:not(.stage-title)");

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

/*--- Voeg een animatie toe aan de morse-code-elementen wanneer de intro-sectie in beeld komt ---*/
const morse = document.querySelector(".morse-help");
const introBorder = document.querySelector(".intro-border");

const morseObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) 
                return;
            

                morse.classList.add("is-visible");
                introBorder.classList.add("is-visible"); /*hiervoor: zelf toegevoegd*/
                observer.unobserve(entry.target);
   
                
        });
    },
    {
        threshold: 0.2
    }
);

morseObserver.observe(document.querySelector("#intro"));

/*--- Voeg een animatie toe aan de titel van Uitgelicht Dossier wanneer deze sectie in beeld komt ---*/
const fileTitle = document.querySelector(".stage-title");

const fileTitleObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if(!entry.isIntersecting)
                return;

            fileTitle.classList.add("is-visible");
            observer.unobserve(entry.target);

        })

    },
    {
        threshold: 0.2
    }
);

fileTitleObserver.observe(document.querySelector("#stage"));