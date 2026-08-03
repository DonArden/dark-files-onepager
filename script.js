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