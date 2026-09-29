// Eduford University — Interactive Navigation, Program Catalog, Campus Switcher & Admissions Form

const PROGRAM_DATA = {
    degree: {
        meta: "01. Honours Undergraduate · 3–4 Years Full-Time · London, New York & Washington",
        title: "Bachelor of Arts & Bachelor of Science Honours",
        description: "Our signature undergraduate pathway combines weekly small-group Oxbridge-style tutorials with modern empirical research labs. Students declare a primary concentration in their second term while completing cross-disciplinary seminars.",
        modules: [
            "Year 1: Quantitative Reasoning, Historical Epistemology & Foundational Labs",
            "Year 2: Disciplinary Core Seminars & Cross-Campus Methodologies",
            "Year 3: Global Residence Term (London, New York, or Washington, D.C.)",
            "Year 4: Senior Honours Thesis & Faculty Research Colloquium"
        ],
        tuition: "$62,400 / Academic Year",
        deadline: "Nov 15, 2026 (Early Action)"
    },
    intermediate: {
        meta: "02. Pre-University & Visiting · 1 Year Intensive · London & New York",
        title: "Foundation & Intermediate Fellows Program",
        description: "Designed for accomplished secondary school graduates seeking intensive academic immersion prior to honours matriculation. Fellows earn 36 transferable credit units.",
        modules: [
            "Term 1: Seminar Rhetoric, Academic Writing & Source Criticism",
            "Term 2: Linear Algebra, Multivariate Calculus & Empirical Statistics",
            "Term 3: Supervised Independent Research Paper & Faculty Defense"
        ],
        tuition: "$48,900 / 3-Term Residency",
        deadline: "Dec 01, 2026 (Fellowship Review)"
    },
    postgrad: {
        meta: "03. Graduate & Doctoral · 1–5 Years · All Global Campuses",
        title: "Postgraduate Master’s & Doctoral Research",
        description: "Graduate fellows work alongside principal investigators in endowed research institutes. All doctoral candidates receive full tuition remission plus a twelve-month living stipend.",
        modules: [
            "M.Sc. / M.A. Track: 12-Month Intensive Coursework & Capstone Dissertation",
            "M.P.P. Track: 2-Year Policy Analysis, Econometrics & Diplomatic Practicum",
            "Ph.D. Track: Qualifying Examinations, Archival/Lab Residency & Defense"
        ],
        tuition: "$58,200 (100% Waived for Ph.D.)",
        deadline: "Dec 15, 2026 (Graduate Cycle)"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Drawer
    const navLinks = document.getElementById("navLinks");
    const openMenuBtn = document.getElementById("openMenuBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");

    if (openMenuBtn && navLinks) {
        openMenuBtn.addEventListener("click", () => {
            navLinks.classList.add("is-open");
        });
    }

    if (closeMenuBtn && navLinks) {
        closeMenuBtn.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
        });
    }

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinks) navLinks.classList.remove("is-open");
        });
    });

    // 2. Academic Programs Filter Tabs
    const filterTabs = document.querySelectorAll(".filter-tab");
    const programCards = document.querySelectorAll(".program-card");

    filterTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const filter = tab.getAttribute("data-filter");

            filterTabs.forEach((t) => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            programCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    if (filter !== "all") {
                        card.style.gridColumn = "span 12";
                    } else {
                        card.style.gridColumn = card.classList.contains("featured-program") ? "span 12" : "";
                    }
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 3. Program Curriculum Modal Inspector
    const modal = document.getElementById("programModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalMeta = document.getElementById("modalMeta");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalModules = document.getElementById("modalModules");
    const modalTuition = document.getElementById("modalTuition");
    const modalDeadline = document.getElementById("modalDeadline");
    const modalApplyBtn = document.getElementById("modalApplyBtn");
    const programLevelSelect = document.getElementById("programLevel");

    let currentProgramKey = "degree";

    document.querySelectorAll(".open-program-modal").forEach((btn) => {
        btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-program") || "degree";
            currentProgramKey = key;
            const info = PROGRAM_DATA[key];
            if (!info || !modal) return;

            modalMeta.textContent = info.meta;
            modalTitle.textContent = info.title;
            modalDescription.textContent = info.description;
            modalTuition.textContent = info.tuition;
            modalDeadline.textContent = info.deadline;

            modalModules.innerHTML = "";
            info.modules.forEach((mod) => {
                const li = document.createElement("li");
                li.textContent = mod;
                modalModules.appendChild(li);
            });

            modal.hidden = false;
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => {
            modal.hidden = true;
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.hidden = true;
            }
        });
    }

    if (modalApplyBtn) {
        modalApplyBtn.addEventListener("click", () => {
            if (modal) modal.hidden = true;
            if (programLevelSelect) {
                if (currentProgramKey === "degree") programLevelSelect.selectedIndex = 0;
                if (currentProgramKey === "intermediate") programLevelSelect.selectedIndex = 1;
                if (currentProgramKey === "postgrad") programLevelSelect.selectedIndex = 2;
            }
            const admissionsSection = document.getElementById("admissions");
            if (admissionsSection) {
                admissionsSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // 4. Global Campuses Highlight & Tour Booking Pre-fill
    const campusTabs = document.querySelectorAll(".campus-tab");
    const campusCards = document.querySelectorAll(".campus-card");
    const preferredCampusSelect = document.getElementById("preferredCampus");

    campusTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-campus");
            campusTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            campusCards.forEach((card) => {
                if (card.getAttribute("data-campus-card") === target) {
                    card.classList.add("active-campus");
                } else {
                    card.classList.remove("active-campus");
                }
            });
        });
    });

    document.querySelectorAll(".btn-campus-book").forEach((btn) => {
        btn.addEventListener("click", () => {
            const campusName = btn.getAttribute("data-book-campus");
            if (preferredCampusSelect && campusName) {
                Array.from(preferredCampusSelect.options).forEach((opt, idx) => {
                    if (opt.value === campusName) {
                        preferredCampusSelect.selectedIndex = idx;
                    }
                });
            }
            const admissionsSection = document.getElementById("admissions");
            if (admissionsSection) {
                admissionsSection.scrollIntoView({ behavior: "smooth" });
                const nameInput = document.getElementById("applicantName");
                if (nameInput) nameInput.focus();
            }
        });
    });

    // 5. Admissions Form Validation & Confirmation
    const admissionsForm = document.getElementById("admissionsForm");
    const formError = document.getElementById("formError");
    const formConfirmation = document.getElementById("formConfirmation");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const resetFormBtn = document.getElementById("resetFormBtn");

    if (admissionsForm) {
        admissionsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("applicantName").value.trim();
            const email = document.getElementById("applicantEmail").value.trim();
            const term = document.getElementById("entryTerm").value;
            const pathway = document.getElementById("programLevel").value;
            const campus = document.getElementById("preferredCampus").value;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name) {
                formError.textContent = "Please enter your full legal name.";
                formError.hidden = false;
                return;
            }

            if (!emailRegex.test(email)) {
                formError.textContent = "Please provide a valid academic or personal email address.";
                formError.hidden = false;
                return;
            }

            formError.hidden = true;
            admissionsForm.hidden = true;
            confirmationMessage.textContent = `Thank you, ${name}. Your digital prospectus for ${pathway} (${term}) and campus tour invitation for our ${campus} campus have been dispatched to ${email}.`;
            formConfirmation.hidden = false;
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener("click", () => {
            admissionsForm.reset();
            formConfirmation.hidden = true;
            admissionsForm.hidden = false;
        });
    }
});
