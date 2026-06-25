const currentDashboardPage = window.location.pathname.split("/").pop() || "dashboard.html";
const dashboardPage = document.body;
const dashboardSidebar = document.querySelector(".dashboard-sidebar");
const dashboardTopbar = document.querySelector(".dashboard-topbar");
const topbarCopy = document.querySelector(".topbar-copy");

let dashboardMenuToggle = null;
let dashboardSidebarOverlay = null;
let dashboardSidebarClose = null;
let lastFocusedElement = null;

if (dashboardSidebar && dashboardTopbar && topbarCopy) {
    dashboardSidebar.id ||= "dashboardSidebar";
    dashboardSidebar.setAttribute("aria-label", "Dashboard navigation");

    const topbarLeft = document.createElement("div");
    topbarLeft.className = "topbar-left";

    dashboardMenuToggle = document.createElement("button");
    dashboardMenuToggle.className = "topbar-icon-btn dashboard-menu-toggle";
    dashboardMenuToggle.type = "button";
    dashboardMenuToggle.setAttribute("aria-label", "Open navigation menu");
    dashboardMenuToggle.setAttribute("aria-controls", dashboardSidebar.id);
    dashboardMenuToggle.setAttribute("aria-expanded", "false");
    dashboardMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    dashboardTopbar.insertBefore(topbarLeft, topbarCopy);
    topbarLeft.append(dashboardMenuToggle, topbarCopy);

    dashboardSidebarClose = document.createElement("button");
    dashboardSidebarClose.className = "dashboard-sidebar-close";
    dashboardSidebarClose.type = "button";
    dashboardSidebarClose.setAttribute("aria-label", "Close navigation menu");
    dashboardSidebarClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    dashboardSidebar.prepend(dashboardSidebarClose);

    dashboardSidebarOverlay = document.createElement("div");
    dashboardSidebarOverlay.className = "dashboard-sidebar-overlay";
    dashboardSidebarOverlay.setAttribute("aria-hidden", "true");
    dashboardSidebar.after(dashboardSidebarOverlay);
}

const setDashboardSidebarState = (isOpen) => {
    if (!dashboardSidebar || !dashboardMenuToggle) return;

    dashboardPage.classList.toggle("dashboard-nav-open", isOpen);
    dashboardSidebar.classList.toggle("is-open", isOpen);
    dashboardMenuToggle.setAttribute("aria-expanded", String(isOpen));
    dashboardMenuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

    if (isOpen) {
        lastFocusedElement = document.activeElement;
        dashboardSidebarClose?.focus();
    } else if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }
};

const closeDashboardSidebar = () => setDashboardSidebarState(false);
const openDashboardSidebar = () => setDashboardSidebarState(true);
const getSidebarFocusableElements = () => {
    if (!dashboardSidebar) return [];
    return Array.from(
        dashboardSidebar.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    );
};

dashboardMenuToggle?.addEventListener("click", () => {
    const isOpen = dashboardPage.classList.contains("dashboard-nav-open");
    setDashboardSidebarState(!isOpen);
});

dashboardSidebarClose?.addEventListener("click", closeDashboardSidebar);
dashboardSidebarOverlay?.addEventListener("click", closeDashboardSidebar);

document.querySelectorAll(".dashboard-menu-link").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === currentDashboardPage);
    link.addEventListener("click", closeDashboardSidebar);
});

document.querySelectorAll('.dashboard-menu-link[href="messages.html"] i').forEach((icon) => {
    icon.className = "fa-solid fa-envelope";
});

const logoutModal = document.getElementById("logoutModal");
const logoutTriggers = document.querySelectorAll("[data-logout-trigger]");
const confirmLogout = document.getElementById("confirmLogout");
const cancelLogout = document.getElementById("cancelLogout");

const openLogoutModal = () => {
    if (!logoutModal) return;
    logoutModal.classList.add("show");
    logoutModal.setAttribute("aria-hidden", "false");
    cancelLogout?.focus();
};

const closeLogoutModal = () => {
    if (!logoutModal) return;
    logoutModal.classList.remove("show");
    logoutModal.setAttribute("aria-hidden", "true");
};

logoutTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        closeDashboardSidebar();
        openLogoutModal();
    });
});

confirmLogout?.addEventListener("click", () => {
    window.location.href = "login.html";
});

cancelLogout?.addEventListener("click", closeLogoutModal);

logoutModal?.addEventListener("click", (event) => {
    if (event.target === logoutModal) {
        closeLogoutModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dashboardPage.classList.contains("dashboard-nav-open")) {
        closeDashboardSidebar();
        return;
    }

    if (event.key === "Tab" && dashboardPage.classList.contains("dashboard-nav-open")) {
        const focusableElements = getSidebarFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    if (event.key === "Escape" && logoutModal?.classList.contains("show")) {
        closeLogoutModal();
    }
});

window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1200px)").matches) {
        closeDashboardSidebar();
    }
});
