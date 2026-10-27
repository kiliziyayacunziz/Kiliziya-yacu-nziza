/* =========================================================
   KILIZIYA YACU NZIZA
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://iqurlyrppouwcssctonu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_QZVM-iXloVEDgc7fpwZhCQ_4bHRfp8d";

let supabaseClient = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {
    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");

        const isOpen =
            mainNav.classList.contains("active");

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Funga menu"
                : "Fungura menu"
        );

        menuToggle.textContent =
            isOpen ? "×" : "☰";

    });


    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Fungura menu"
            );

        });

    });

}


/* =========================================================
   DATE HELPERS
========================================================= */

function getToday() {

    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

}


function formatKinyarwandaDate(date) {

    return date.toLocaleDateString(
        "rw-RW",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


function getMonthName(date) {

    return date.toLocaleDateString(
        "rw-RW",
        {
            month: "long"
        }
    );

}


/* =========================================================
   CURRENT DATE
========================================================= */

const currentDate =
    document.getElementById("currentDate");

const readingDate =
    document.getElementById("readingDate");


const today = getToday();


if (currentDate) {

    currentDate.textContent =
        formatKinyarwandaDate(today);

}


if (readingDate) {

    readingDate.textContent =
        formatKinyarwandaDate(today);

}


/* =========================================================
   HERO DATE
========================================================= */

const heroDay =
    document.getElementById("heroDay");

const heroMonth =
    document.getElementById("heroMonth");

const heroYear =
    document.getElementById("heroYear");


if (heroDay) {

    heroDay.textContent =
        today.getDate();

}


if (heroMonth) {

    heroMonth.textContent =
        getMonthName(today);

}


if (heroYear) {

    heroYear.textContent =
        today.getFullYear();

}


/* =========================================================
   FOOTER YEAR
========================================================= */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SEARCH
========================================================= */

const openSearch =
    document.getElementById("openSearch");

const closeSearch =
    document.getElementById("closeSearch");

const searchOverlay =
    document.getElementById("searchOverlay");

const searchInput =
    document.getElementById("searchInput");

const searchSubmit =
    document.getElementById("searchSubmit");

const searchMessage =
    document.getElementById("searchMessage");


function showSearch() {

    if (!searchOverlay) {
        return;
    }

    searchOverlay.classList.add("active");

    searchOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    setTimeout(() => {

        if (searchInput) {

            searchInput.focus();

        }

    }, 100);

}


function hideSearch() {

    if (!searchOverlay) {
        return;
    }

    searchOverlay.classList.remove("active");

    searchOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    if (searchMessage) {

        searchMessage.textContent = "";

    }

}


if (openSearch) {

    openSearch.addEventListener(
        "click",
        showSearch
    );

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        hideSearch
    );

}


if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchOverlay
            ) {

                hideSearch();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            hideSearch();

        }

    }
);


if (searchSubmit) {

    searchSubmit.addEventListener(
        "click",
        handleSearch
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                handleSearch();

            }

        }
    );

}


function handleSearch() {

    if (!searchInput) {
        return;
    }


    const query =
        searchInput.value.trim();


    if (!query) {

        if (searchMessage) {

            searchMessage.textContent =
                "Andika ijambo cyangwa umutwe ushaka gushakisha.";

        }

        return;

    }


    /*
        Ubu search izakuyobora ku bice
        by'ingenzi by'urubuga.
        Search database yuzuye tuzayikora
        nyuma muri backend.
    */

    const normalized =
        query.toLowerCase();


    let target = null;


    if (
        normalized.includes("isomo") ||
        normalized.includes("amasomo") ||
        normalized.includes("reading")
    ) {

        target =
            document.getElementById(
                "amasomo"
            );

    } else if (
        normalized.includes("zaburi")
    ) {

        target =
            document.getElementById(
                "amasomo"
            );

    } else if (
        normalized.includes("ivanji") ||
        normalized.includes("gospel")
    ) {

        target =
            document.getElementById(
                "amasomo"
            );

    } else if (
        normalized.includes("kuzirikana") ||
        normalized.includes("inyigisho")
    ) {

        target =
            document.getElementById(
                "kuzirikana"
            );

    } else if (
        normalized.includes("isomero") ||
        normalized.includes("pdf") ||
        normalized.includes("igitabo")
    ) {

        target =
            document.getElementById(
                "isomero"
            );

    } else if (
        normalized.includes("foto") ||
        normalized.includes("amafoto")
    ) {

        target =
            document.getElementById(
                "amafoto"
            );

    } else if (
        normalized.includes("isengesho") ||
        normalized.includes("gusenga")
    ) {

        target =
            document.getElementById(
                "isengesho"
            );

    } else if (
        normalized.includes("dushyigikire") ||
        normalized.includes("momo") ||
        normalized.includes("inkunga")
    ) {

        target =
            document.getElementById(
                "dushyigikire"
            );

    }


    if (target) {

        hideSearch();

        setTimeout(() => {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 150);

        return;

    }


    if (searchMessage) {

        searchMessage.textContent =
            `Nta gice gihuye na "${query}" cyabonetse. Search yuzuye y'ibiri muri website izongerwaho muri backend.`;

    }

}


/* =========================================================
   DAILY READINGS FROM SUPABASE
========================================================= */

async function loadDailyReading() {

    if (!supabaseClient) {

        console.warn(
            "Supabase ntirabonetse kuri page."
        );

        return;

    }


    const firstReading =
        document.getElementById(
            "firstReading"
        );

    const psalm =
        document.getElementById(
            "psalm"
        );

    const gospel =
        document.getElementById(
            "gospel"
        );


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("daily_readings")
            .select(
                "reading_date, first_reading, psalm, gospel"
            )
            .eq(
                "published",
                true
            )
            .order(
                "reading_date",
                {
                    ascending: false
                }
            )
            .limit(1);


        if (error) {

            console.error(
                "Ikibazo cyo gufata amasomo:",
                error
            );

            return;

        }


        if (
            !data ||
            data.length === 0
        ) {

            console.log(
                "Nta somo ryashyizwe muri database."
            );

            return;

        }


        const reading =
            data[0];


        if (
            firstReading &&
            reading.first_reading
        ) {

            firstReading.textContent =
                reading.first_reading;

        }


        if (
            psalm &&
            reading.psalm
        ) {

            psalm.textContent =
                reading.psalm;

        }


        if (
            gospel &&
            reading.gospel
        ) {

            gospel.textContent =
                reading.gospel;

        }


        if (
            reading.reading_date
        ) {

            updateReadingDate(
                reading.reading_date
            );

        }

    } catch (error) {

        console.error(
            "Unexpected reading error:",
            error
        );

    }

}


function updateReadingDate(
    dateValue
) {

    const date =
        new Date(
            `${dateValue}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return;

    }


    if (readingDate) {

        readingDate.textContent =
            formatKinyarwandaDate(
                date
            );

    }

}


/* =========================================================
   DAILY QUESTION
========================================================= */

const answerOptions =
    document.querySelectorAll(
        ".answer-option"
    );

const answerResult =
    document.getElementById(
        "answerResult"
    );


answerOptions.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                answerOptions.forEach(
                    option => {

                        option.classList.remove(
                            "correct"
                        );

                        option.classList.remove(
                            "wrong"
                        );

                    }
                );


                /*
                    Igisubizo cyiza:
                    D = index 3
                */

                if (index === 3) {

                    button.classList.add(
                        "correct"
                    );


                    if (answerResult) {

                        answerResult.textContent =
                            "✓ Neza! Ijambo ry'Imana riduhamagarira kurishyira mu bikorwa.";

                    }

                } else {

                    button.classList.add(
                        "wrong"
                    );


                    if (answerResult) {

                        answerResult.textContent =
                            "Gerageza kongera gutekereza. Ukwemera kwacu gukura iyo guhindutse ibikorwa by'urukundo.";

                    }

                }

            }
        );

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const contactMessage =
    document.getElementById(
        "contactMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (contactMessage) {

                contactMessage.textContent =
                    "✓ Ubutumwa bwawe bwakiriwe. Sisitemu yo kubwohereza izongerwaho muri backend.";

            }


            contactForm.reset();

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length <= 1
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".main-nav a[href^='#']"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >=
                    sectionTop &&
                window.scrollY <
                    sectionBottom
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        }
    );


    navigationLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !mainNav ||
            !menuToggle
        ) {

            return;

        }


        const clickedInsideMenu =
            mainNav.contains(
                event.target
            );

        const clickedToggle =
            menuToggle.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            mainNav.classList.contains(
                "active"
            )
        ) {

            mainNav.classList.remove(
                "active"
            );

            menuToggle.textContent =
                "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Fungura menu"
            );

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDailyReading();

        updateActiveNavigation();

        console.log(
            "Kiliziya Yacu Nziza - Frontend loaded successfully."
        );

    }
);