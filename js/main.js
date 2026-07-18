const THEME_STORAGE_KEY = "learnora-theme";
const DIRECTION_STORAGE_KEY = "learnora-direction";

const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    document.querySelectorAll("#themeToggle").forEach((button) => {
        button.setAttribute("aria-pressed", String(isDark));
        button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        const icon = button.querySelector("i");
        if (icon) icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
};

const applyDirection = (direction) => {
    const dir = direction === "rtl" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === "rtl" ? "ar" : "en";
    document.querySelectorAll("#rtlToggle").forEach((button) => {
        button.setAttribute("aria-pressed", String(dir === "rtl"));
        button.setAttribute("aria-label", dir === "rtl" ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
    });
};

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
const savedDirection = localStorage.getItem(DIRECTION_STORAGE_KEY) || "ltr";

applyTheme(savedTheme);
applyDirection(savedDirection);

document.querySelectorAll("#themeToggle").forEach((themeToggle) => {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
    });
});

document.querySelectorAll("#rtlToggle").forEach((rtlToggle) => {
    rtlToggle.addEventListener("click", () => {
        const nextDirection = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
        localStorage.setItem(DIRECTION_STORAGE_KEY, nextDirection);
        applyDirection(nextDirection);
    });
});

//scroll to top button

/* ==========================
   Scroll To Top
========================== */

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollTopBtn.classList.add("active");

        } else {

            scrollTopBtn.classList.remove("active");

        }

    });

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });
}


// Active navigation state
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navItems = document.querySelectorAll(".navbar-nav a[href]");

navItems.forEach((item) => {
    const itemPage = item.getAttribute("href").split("#")[0];

    if (itemPage === currentPage) {
        item.classList.add("active");
        item.setAttribute("aria-current", "page");

        const dropdown = item.closest(".dropdown");
        const dropdownToggle = dropdown?.querySelector(".dropdown-toggle");

        if (dropdownToggle) {
            dropdownToggle.classList.add("active");
        }
    }
});

// Scroll reveal animations
const revealConfig = [
    {
        selector: [
            ".hero-content",
            ".hero-slide > div",
            ".find-hero-content",
            ".subjects-hero-content",
            ".top-rated-hero-content",
            ".become-hero-content",
            ".pricing-page-banner-content",
            ".page-banner-content",
            ".contact-page-banner-content",
            ".dash-page-intro"
        ].join(","),
        type: "reveal-from-bottom reveal-hero",
        immediate: true
    },
    {
        selector: [
            ".section-header",
            ".story-content",
            ".impact-content",
            ".guidance-content",
            ".tutor-cta-content",
            ".cta-content",
            ".dash-section-heading"
        ].join(","),
        type: "reveal-from-left"
    },
    {
        selector: [
            ".story-images",
            ".guidance-image",
            ".cta-image",
            ".tutor-image-area",
            ".process-visual",
            ".dashboard-preview-image"
        ].join(","),
        type: "reveal-from-right"
    },
    {
        selector: [
            ".pathway-card",
            ".home-bento-card",
            ".top-tutor-card",
            ".review-card",
            ".mission-card",
            ".vision-card",
            ".about-bento-card",
            ".value-card",
            ".team-card",
            ".pricing-plan-card",
            ".pricing-card",
            ".marketplace-tutor-card",
            ".subject-horizontal-card",
            ".find-process-card",
            ".story-card",
            ".featured-tutor-card",
            ".level-card",
            ".leaderboard-item",
            ".love-card",
            ".featured-story",
            ".benefit-card",
            ".benefit-box",
            ".requirement-card",
            ".journey-step",
            ".dash-card",
            ".dash-table-card",
            ".dash-child-profile",
            ".dash-session-grid article",
            ".dash-achievement-grid article",
            ".dash-alert-grid article",
            ".dash-conversation-list article",
            ".dash-activity-list > div",
            ".dash-calendar > div"
        ].join(","),
        type: "reveal-from-bottom",
        stagger: true
    },
    {
        selector: [
            ".stats-card",
            ".hero-stat",
            ".stat-box",
            ".about-impact-card",
            ".top-rated-hero-stat",
            ".subjects-hero-stat",
            ".dash-kpi-card",
            ".dash-ring-card",
            ".dashboard-stat-card"
        ].join(","),
        type: "reveal-scale",
        stagger: true
    },
    {
        selector: [
            ".home-cta-wrapper",
            ".about-cta-wrapper",
            ".become-tutor-wrapper",
            ".top-rated-cta-wrapper",
            ".tutor-cta-wrapper",
            ".top-class-cta",
            ".trust-banner"
        ].join(","),
        type: "reveal-fade"
    }
];

const prepareRevealElements = () => {
    const seen = new Set();

    revealConfig.forEach((config, configIndex) => {
        const elements = document.querySelectorAll(config.selector);

        elements.forEach((element, index) => {
            if (seen.has(element) || element.closest(".carousel-item:not(.active)")) return;

            seen.add(element);
            element.classList.add("reveal", ...config.type.split(" "));

            if (config.immediate) {
                element.classList.add("revealed");
                return;
            }

            if (config.stagger) {
                const delay = Math.min((index % 6) * 90, 450);
                element.style.setProperty("--reveal-delay", `${delay}ms`);
            } else {
                const delay = configIndex % 2 === 0 ? 40 : 90;
                element.style.setProperty("--reveal-delay", `${delay}ms`);
            }
        });
    });
};

const initScrollReveal = () => {
    prepareRevealElements();

    const revealElements = document.querySelectorAll(".reveal:not(.revealed)");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("revealed"));
        return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("revealed");
            activeObserver.unobserve(entry.target);
        });
    }, {
        root: document.querySelector(".dashboard-main") || null,
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach((element) => observer.observe(element));
};

initScrollReveal();

// Animated counters
const counterSelectors = [
    ".hero-mini-stats h4",
    ".stats-card h3",
    ".hero-stat h3",
    ".stat-box h3",
    ".about-impact-card h3",
    ".story-counter h3",
    ".top-rated-hero-stat h3",
    ".subjects-hero-stat h3",
    ".cta-stat h3",
    ".dash-kpi-card strong",
    ".dashboard-stat-card strong",
    ".dash-ring",
    ".dash-child-profile li strong",
    ".progress-row span",
    ".pricing-plan-card .plan-price",
    ".price",
    ".plan-card strong"
].join(",");

const parseCounterValue = (text) => {
    const valueMatch = text.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    if (!valueMatch) return null;

    const rawValue = valueMatch[0];
    const startIndex = text.indexOf(rawValue) >= 0
        ? text.indexOf(rawValue)
        : text.replace(/,/g, "").indexOf(rawValue);
    const decimals = rawValue.includes(".") ? rawValue.split(".")[1].length : 0;

    return {
        finalValue: Number(rawValue),
        decimals,
        prefix: text.slice(0, Math.max(startIndex, 0)).replace(/\d|,|\./g, ""),
        suffix: text.slice(Math.max(startIndex, 0) + rawValue.length).replace(/\d|,|\./g, ""),
        usesComma: /,\d{3}/.test(text),
        compactK: /k/i.test(text)
    };
};

const formatCounterValue = (value, config) => {
    const fixed = config.decimals > 0 ? value.toFixed(config.decimals) : Math.round(value).toString();
    const formatted = config.usesComma
        ? Number(fixed).toLocaleString(undefined, {
            minimumFractionDigits: config.decimals,
            maximumFractionDigits: config.decimals
        })
        : fixed;

    return `${config.prefix}${formatted}${config.suffix}`;
};

const animateCounter = (element) => {
    if (element.dataset.counterAnimated === "true") return;

    const originalText = element.dataset.counterValue || element.textContent.trim();
    const config = parseCounterValue(originalText);

    if (!config || Number.isNaN(config.finalValue)) return;

    element.dataset.counterValue = originalText;
    element.dataset.counterAnimated = "true";

    const duration = 1300 + Math.min(config.finalValue, 1200) * 0.12;
    const startTime = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = config.finalValue * eased;

        element.textContent = progress >= 1
            ? originalText
            : formatCounterValue(currentValue, config);

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    };

    element.textContent = formatCounterValue(0, config);
    requestAnimationFrame(tick);
};

const initCounters = () => {
    const counters = Array.from(document.querySelectorAll(counterSelectors))
        .filter((element) => parseCounterValue(element.textContent.trim()));

    counters.forEach((element, index) => {
        element.style.setProperty("--counter-delay", `${Math.min((index % 6) * 70, 350)}ms`);
    });

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCounter);
        return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            const delay = parseInt(element.style.getPropertyValue("--counter-delay"), 10) || 0;

            window.setTimeout(() => animateCounter(element), delay);
            activeObserver.unobserve(element);
        });
    }, {
        root: document.querySelector(".dashboard-main") || null,
        threshold: 0.35,
        rootMargin: "0px 0px -6% 0px"
    });

    counters.forEach((element) => observer.observe(element));
};

initCounters();

const lrxButtons = document.querySelectorAll(".lrx-toggle-btn");
const lrxPlans = document.querySelectorAll(".lrx-plan-area");

function showPlan(plan) {

    lrxButtons.forEach(btn => {
        btn.classList.remove("active");

        if (btn.dataset.plan === plan) {
            btn.classList.add("active");
        }
    });

    lrxPlans.forEach(item => item.classList.remove("active"));

    document.getElementById(
        plan === "monthly" ? "lrxMonthly" : "lrxYearly"
    ).classList.add("active");

    localStorage.setItem("lrxSelectedPlan", plan);

}

lrxButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        showPlan(btn.dataset.plan);

    });

});

const savedPlan = localStorage.getItem("lrxSelectedPlan") || "monthly";

showPlan(savedPlan);