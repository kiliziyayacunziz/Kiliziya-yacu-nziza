const SUPABASE_URL =
    "https://iqurlyrppouwcssctonu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_QZVM-iXloVEDgc7fpwZhCQ_4bHRfp8d";

let supabaseClient = null;

if (window.supabase) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
}

function formatDate(dateValue = new Date()) {
    const date = new Date(dateValue);

    return new Intl.DateTimeFormat("rw-RW", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(date);
}

function updateDates() {
    const today = formatDate();

    const heroDate = document.getElementById("heroDate");
    const readingDate = document.getElementById("readingDate");
    const year = document.getElementById("year");

    if (heroDate) {
        heroDate.textContent = today;
    }

    if (readingDate) {
        readingDate.textContent = today;
    }

    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

async function loadDailyReading() {
    if (!supabaseClient) {
        console.warn("Supabase ntabwo yabonetse.");
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from("daily_readings")
            .select(
                "reading_date, first_reading, psalm, gospel"
            )
            .eq("published", true)
            .order("reading_date", {
                ascending: false
            })
            .limit(1);

        if (error) {
            console.error(
                "Ntibyashobotse gufata amasomo:",
                error
            );
            return;
        }

        if (!data || data.length === 0) {
            return;
        }

        const reading = data[0];

        const firstReading =
            document.getElementById("firstReading");

        const psalm =
            document.getElementById("psalm");

        const gospel =
            document.getElementById("gospel");

        const readingDate =
            document.getElementById("readingDate");

        if (firstReading) {
            firstReading.textContent =
                reading.first_reading ||
                "Isomo rya mbere ntirishyirwaho.";
        }

        if (psalm) {
            psalm.textContent =
                reading.psalm ||
                "Zaburi ntirashyirwaho.";
        }

        if (gospel) {
            gospel.textContent =
                reading.gospel ||
                "Ivanjili ntirashyirwaho.";
        }

        if (readingDate && reading.reading_date) {
            readingDate.textContent =
                formatDate(
                    reading.reading_date + "T12:00:00"
                );
        }

    } catch (error) {
        console.error(error);
    }
}

function setupMenu() {
    const button =
        document.getElementById("menuButton");

    const nav =
        document.getElementById("mainNav");

    if (!button || !nav) {
        return;
    }

    button.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });
}

function setupQuestion() {
    const button =
        document.getElementById("answerButton");

    const answer =
        document.getElementById("answerBox");

    if (!button || !answer) {
        return;
    }

    button.addEventListener("click", () => {
        answer.classList.toggle("hidden");

        button.textContent =
            answer.classList.contains("hidden")
                ? "Reba igisubizo"
                : "Hisha igisubizo";
    });
}

function setupContactForm() {
    const form =
        document.getElementById("contactForm");

    const message =
        document.getElementById("formMessage");

    if (!form || !message) {
        return;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        message.textContent =
            "Murakoze. Ubutumwa bwawe bwakiriwe.";

        form.reset();

        setTimeout(() => {
            message.textContent = "";
        }, 5000);
    });
}

document.addEventListener(
    "DOMContentLoaded",
    async () => {
        updateDates();
        setupMenu();
        setupQuestion();
        setupContactForm();

        await loadDailyReading();
    }
);
