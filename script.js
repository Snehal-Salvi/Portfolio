document.addEventListener("DOMContentLoaded", function () {
    const CAREER_START_DATE = new Date(2021, 11, 24); // Dec 24, 2021

    function updateYearsOfExperience() {
        const now = new Date();
        let years = now.getFullYear() - CAREER_START_DATE.getFullYear();
        const hadAnniversaryThisYear =
            now.getMonth() > CAREER_START_DATE.getMonth() ||
            (now.getMonth() === CAREER_START_DATE.getMonth() && now.getDate() >= CAREER_START_DATE.getDate());
        if (!hadAnniversaryThisYear) years--;

        document.querySelectorAll(".yoe-number").forEach((el) => {
            el.textContent = years;
        });
    }
    updateYearsOfExperience();

    const yearEl = document.getElementById("currentYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile nav toggle
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", isOpen);
        });
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Scroll-triggered section reveal
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    // Highlight the active nav link as sections scroll into view
    const sections = document.querySelectorAll("main section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
    if ("IntersectionObserver" in window && sections.length) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navAnchors.forEach((a) => a.classList.remove("active"));
                        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                        if (activeLink) activeLink.classList.add("active");
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );
        sections.forEach((s) => navObserver.observe(s));
    }

    // Project video modal
    const videoModal = document.getElementById("videoModal");
    const largeVideo = document.getElementById("largeVideo");
    const closeBtn = document.querySelector(".close-btn");

    function closeVideoModal() {
        videoModal.style.display = "none";
        largeVideo.pause();
        largeVideo.currentTime = 0;
    }

    document.querySelectorAll(".project-media[data-video-src]").forEach((video) => {
        video.addEventListener("click", () => {
            largeVideo.src = video.getAttribute("data-video-src");
            videoModal.style.display = "block";
            largeVideo.play();
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeVideoModal);
    if (videoModal) {
        videoModal.addEventListener("click", (event) => {
            if (event.target === videoModal) closeVideoModal();
        });
    }
});
