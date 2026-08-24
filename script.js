/* ====================================================================
   SLIET Antriksha Vigyan Society - Application Logic & Starfield Canvas
   ==================================================================== */

// Set Current Date & Year dynamically + Sync Google Form URL from config.js
document.addEventListener('DOMContentLoaded', () => {
    // 0. Ensure site opens in Light Mode
    initTheme();

    // 1. Dynamic Date & Year
    const dateSpan = document.getElementById('current-date-display');
    if (dateSpan) {
        const now = new Date();
        dateSpan.textContent = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Automatically sync Google Form URLs from config.js (SEPARATE JOIN VS EVENT FORMS)
    if (window.CLUB_CONFIG) {
        // Sync Membership / Recruitment Form Link
        if (window.CLUB_CONFIG.joinUsFormUrl) {
            const joinButtons = document.querySelectorAll('.join-form-link, #join-modal a');
            joinButtons.forEach(btn => {
                btn.href = window.CLUB_CONFIG.joinUsFormUrl;
            });
        }
        // Sync Specific Event Registration Form Link
        if (window.CLUB_CONFIG.eventFormUrl) {
            const eventButtons = document.querySelectorAll('.event-form-link');
            eventButtons.forEach(btn => {
                btn.href = window.CLUB_CONFIG.eventFormUrl;
            });
        }
    }

    // 3. Automated Real-Time Astronomical Alert & Moon Phase Calculations
    updateAstronomicalAlerts();

    // 4. Scroll Reveal Observer for dynamic section & card entrance
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // 5. Initialize Research & Publications Engine
    initPublications();

    // 6. Initialize Latest Event Announcement Popup
    initEventPopup();
});

// Theme Switcher Logic (Default: Light Mode on page open)
function initTheme() {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
    updateThemeIcons(false);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
    const iconDesktop = document.getElementById('theme-toggle-icon');
    const iconMobile = document.getElementById('theme-toggle-icon-mobile');
    if (isDark) {
        if (iconDesktop) iconDesktop.className = 'fa-solid fa-moon text-sky-300';
        if (iconMobile) iconMobile.className = 'fa-solid fa-moon text-sky-300';
    } else {
        if (iconDesktop) iconDesktop.className = 'fa-solid fa-sun text-amber-500';
        if (iconMobile) iconMobile.className = 'fa-solid fa-sun text-amber-500';
    }
}

initTheme();

// Interactive Canvas Particle Starfield + Shooting Stars (Meteors)
const canvas = document.getElementById('space-stars');
const ctx = canvas ? canvas.getContext('2d') : null;
let stars = [];
let meteors = [];

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    if (!canvas) return;
    stars = [];
    // Reduced particle density for a subtle, clean, non-distracting background
    const count = Math.floor((canvas.width * canvas.height) / 6500);
    const colorsLight = [
        'rgba(217, 119, 6, ',  // Amber
        'rgba(79, 70, 229, ',  // Indigo
        'rgba(14, 165, 233, ',  // Sky Blue
        'rgba(192, 132, 252, ' // Purple
    ];
    for (let i = 0; i < count; i++) {
        const colorPrefix = colorsLight[Math.floor(Math.random() * colorsLight.length)];
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2.0 + 0.6,
            alpha: Math.random() * 0.5 + 0.3,
            speed: Math.random() * 0.25 + 0.05,
            colorPrefix: colorPrefix
        });
    }
}

function createMeteor() {
    if (!canvas) return;
    if (Math.random() < 0.04 && meteors.length < 3) {
        meteors.push({
            x: Math.random() * canvas.width * 0.9 + canvas.width * 0.1,
            y: Math.random() * (canvas.height * 0.35),
            dx: -(Math.random() * 5 + 4),
            dy: Math.random() * 4 + 3,
            alpha: 1,
            decay: Math.random() * 0.015 + 0.012
        });
    }
}

function updateAndDrawMeteors() {
    if (!ctx || !canvas) return;
    createMeteor();
    const isDark = document.documentElement.classList.contains('dark');
    for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        ctx.beginPath();
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.dx * 12, m.y - m.dy * 12);
        if (isDark) {
            grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
            grad.addColorStop(0.4, `rgba(56, 189, 248, ${m.alpha * 0.7})`);
            grad.addColorStop(1, `rgba(124, 58, 237, 0)`);
        } else {
            // High visibility meteor trail in Light Mode
            grad.addColorStop(0, `rgba(217, 119, 6, ${m.alpha * 0.95})`);
            grad.addColorStop(0.4, `rgba(79, 70, 229, ${m.alpha * 0.85})`);
            grad.addColorStop(1, `rgba(245, 158, 11, 0)`);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.dx * 14, m.y - m.dy * 14);
        ctx.stroke();

        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x < 0 || m.y > canvas.height) {
            meteors.splice(i, 1);
        }
    }
}

function animateStars() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.classList.contains('dark');

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        // Color tuning based on active mode
        if (isDark) {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.95})`;
        } else {
            // High contrast visible starlight dots in Light Mode (opacity up to 0.85)
            ctx.fillStyle = `${star.colorPrefix}${star.alpha * 0.85})`;
        }
        ctx.fill();

        // Gentle upward floating animation
        star.y -= star.speed;
        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }
    });

    // Animate Shooting Stars / Meteors
    updateAndDrawMeteors();

    requestAnimationFrame(animateStars);
}

if (canvas) {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateStars();
}

// Mobile Menu Toggle & Auto-Close Handler
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Auto-close menu when clicking navigation links
    const mobileLinks = mobileMenu.querySelectorAll('a, button');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Modal Controls with Keyboard (ESC) & Backdrop Accessibility
function openJoinModal() {
    const modal = document.getElementById('join-modal');
    const modalBox = modal ? modal.querySelector('.glass-card') : null;
    const form = document.getElementById('membership-form');
    const success = document.getElementById('form-success');
    if (modal) {
        modal.classList.remove('hidden');
        if (modalBox) {
            modalBox.classList.remove('modal-animate-enter');
            void modalBox.offsetWidth;
            modalBox.classList.add('modal-animate-enter');
        }
    }
    if (form) form.classList.remove('hidden');
    if (success) success.classList.add('hidden');
}

function closeJoinModal() {
    const modal = document.getElementById('join-modal');
    if (modal) modal.classList.add('hidden');
}

// Lightbox Controls
function openLightbox(src) {
    const lightbox = document.getElementById('image-lightbox');
    const img = document.getElementById('lightbox-img');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        lightbox.classList.add('opacity-100');
        img.classList.remove('scale-95');
        img.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    const img = document.getElementById('lightbox-img');
    if (lightbox && img) {
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0', 'pointer-events-none');
        img.classList.remove('scale-100');
        img.classList.add('scale-95');
        document.body.style.overflow = '';
    }
}

// Keyboard ESC listener & backdrop click listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeJoinModal();
        closeLightbox();
    }
});

const joinModal = document.getElementById('join-modal');
if (joinModal) {
    joinModal.addEventListener('click', (e) => {
        if (e.target === joinModal) {
            closeJoinModal();
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('membership-form');
    const success = document.getElementById('form-success');
    if (form) form.classList.add('hidden');
    if (success) success.classList.remove('hidden');
}

// Event Toggle Tabs
function switchEventTab(tab) {
    const upcomingContainer = document.getElementById('events-upcoming');
    const pastContainer = document.getElementById('events-past');
    const tabUpcoming = document.getElementById('tab-upcoming');
    const tabPast = document.getElementById('tab-past');

    if (tab === 'upcoming') {
        if (upcomingContainer) {
            upcomingContainer.classList.remove('hidden');
            upcomingContainer.classList.add('grid');
        }
        if (pastContainer) {
            pastContainer.classList.add('hidden');
            pastContainer.classList.remove('grid');
        }
        if (tabUpcoming) tabUpcoming.className = "px-5 py-2 rounded-lg text-sm font-semibold transition-all bg-indigo-600 text-white shadow-md";
        if (tabPast) tabPast.className = "px-5 py-2 rounded-lg text-sm font-semibold transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
    } else {
        if (pastContainer) {
            pastContainer.classList.remove('hidden');
            pastContainer.classList.add('grid');
        }
        if (upcomingContainer) {
            upcomingContainer.classList.add('hidden');
            upcomingContainer.classList.remove('grid');
        }
        if (tabPast) tabPast.className = "px-5 py-2 rounded-lg text-sm font-semibold transition-all bg-indigo-600 text-white shadow-md";
        if (tabUpcoming) tabUpcoming.className = "px-5 py-2 rounded-lg text-sm font-semibold transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
    }
}

// Team Filter Tabs
function filterTeam(category) {
    const cards = document.querySelectorAll('.team-card');
    const buttons = document.querySelectorAll('.team-filter-btn');

    buttons.forEach(btn => {
        btn.className = "team-filter-btn px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all";
    });
    const activeBtn = document.getElementById(`team-btn-${category}`);
    if (activeBtn) {
        activeBtn.className = "team-filter-btn active px-4 py-2 rounded-lg text-xs font-extrabold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-md transition-all";
    }

    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

/* ====================================================================
   Automated Astronomical Engine & Real-Time Sky Event Calculations
   Calculates moon phase & seasonal celestial events for SLIET Longowal (30.23°N)
   ==================================================================== */
function updateAstronomicalAlerts() {
    const now = new Date();
    const month = now.getMonth(); // 0 - 11
    const day = now.getDate();

    // 1. Calculate Real Moon Phase & Illumination Percentage
    const synodicMonth = 29.53058867;
    const refNewMoon = new Date(2024, 0, 11, 11, 57);
    const diffDays = (now.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const cycle = (diffDays % synodicMonth + synodicMonth) % synodicMonth;
    const phasePercent = Math.round((cycle / synodicMonth) * 100);

    let moonPhaseName = "Waxing Moon";
    let moonIcon = "fa-solid fa-moon";
    let moonDesc = "";

    if (cycle < 1.845) {
        moonPhaseName = "New Moon (0% Illumination)";
        moonIcon = "fa-solid fa-circle text-slate-800 dark:text-slate-200";
        moonDesc = "Complete dark sky tonight! Perfect conditions for observing faint nebulae and deep-space galaxies from SLIET Observatory.";
    } else if (cycle < 5.537) {
        moonPhaseName = `Waxing Crescent (${phasePercent}%)`;
        moonIcon = "fa-solid fa-moon";
        moonDesc = `Slim crescent moon visible in western sky after dusk. Low atmospheric interference for deep-sky observation.`;
    } else if (cycle < 9.228) {
        moonPhaseName = `First Quarter Moon (${phasePercent}%)`;
        moonIcon = "fa-solid fa-circle-half-stroke";
        moonDesc = `Half-illuminated moon visible in southern sky. Sharp shadow contrast along the lunar terminator line.`;
    } else if (cycle < 12.920) {
        moonPhaseName = `Waxing Gibbous (${phasePercent}%)`;
        moonIcon = "fa-solid fa-moon";
        moonDesc = `Bright lunar disc dominating the night sky. Excellent target for telescope viewing of Copernicus crater.`;
    } else if (cycle < 16.611) {
        moonPhaseName = `Full Moon (100% Illumination)`;
        moonIcon = "fa-solid fa-circle text-amber-300 dark:text-yellow-200";
        moonDesc = `Peak lunar brightness tonight! High surface reflectivity across the whole visible moon disc.`;
    } else if (cycle < 20.302) {
        moonPhaseName = `Waning Gibbous (${phasePercent}%)`;
        moonIcon = "fa-solid fa-moon";
        moonDesc = `Moon rises after dusk. Great stargazing window during early evening hours before moonrise.`;
    } else if (cycle < 23.994) {
        moonPhaseName = `Third Quarter Moon (${phasePercent}%)`;
        moonIcon = "fa-solid fa-circle-half-stroke";
        moonDesc = `Third quarter moon rising around midnight. Pristine dark skies during pre-midnight hours.`;
    } else {
        moonPhaseName = `Waning Crescent (${phasePercent}%)`;
        moonIcon = "fa-solid fa-moon";
        moonDesc = `Thin morning crescent visible before sunrise. Ideal conditions for pre-dawn planetary imaging.`;
    }

    const moonTitleEl = document.getElementById('sky-moon-title');
    const moonBadgeEl = document.getElementById('sky-moon-badge');
    const moonDescEl = document.getElementById('sky-moon-desc');
    const moonIconEl = document.getElementById('sky-moon-icon');

    if (moonTitleEl) moonTitleEl.textContent = moonPhaseName;
    if (moonBadgeEl) moonBadgeEl.textContent = `Lunar Illumination: ${phasePercent}%`;
    if (moonDescEl) moonDescEl.textContent = moonDesc;
    if (moonIconEl) moonIconEl.className = moonIcon;

    // 2. Real Astronomical Events by Calendar Date/Month
    let eventTitle = "Perseids Meteor Shower Peak";
    let eventBadge = "Active Peak Event";
    let eventDesc = "Peak visibility tonight! Best viewed after midnight towards the north-eastern sky away from light interference.";

    if (month === 0) { // Jan
        if (day <= 5) {
            eventTitle = "Quadrantids Meteor Shower";
            eventBadge = "Peak Meteor Stream";
            eventDesc = "High-rate meteor shower peaking with up to 120 meteors/hr. Look towards the constellation Boötes in the northern sky.";
        } else {
            eventTitle = "Winter Hexagon Alignment";
            eventBadge = "Seasonal Constellation";
            eventDesc = "Orion, Sirius, Procyon, Pollux, Capella, and Aldebaran forming the giant Winter Hexagon high in SLIET night sky.";
        }
    } else if (month === 1) { // Feb
        eventTitle = "Alpha Centaurids Shower & Venus";
        eventBadge = "Evening Sky Event";
        eventDesc = "Dazzling Venus shining as the evening star in the west, with faint meteor streaks visible after 9 PM.";
    } else if (month === 2) { // Mar
        if (day >= 19 && day <= 22) {
            eventTitle = "Vernal Spring Equinox";
            eventBadge = "Solar Cycle Event";
            eventDesc = "Sun crosses the celestial equator today giving equal 12-hour day & night length across SLIET Longowal (30.23°N).";
        } else {
            eventTitle = "Messier Deep-Sky Marathon";
            eventBadge = "Deep Space Observation";
            eventDesc = "Optimal spring window for viewing galaxies in Virgo Cluster, Andromeda (M31), and Orion Nebula (M42).";
        }
    } else if (month === 3) { // Apr
        if (day >= 16 && day <= 26) {
            eventTitle = "Lyrids Meteor Shower";
            eventBadge = "Active Meteor Event";
            eventDesc = "Debris from comet C/1861 G1 Thatcher producing fast meteors with glowing dust trains near Vega in Lyra.";
        } else {
            eventTitle = "Spring Galaxy Season";
            eventBadge = "Observatory Peak";
            eventDesc = "Prime season for deep-sky astrophotography. Sombrero Galaxy (M104) and Whirlpool (M51) visible via telescope.";
        }
    } else if (month === 4) { // May
        if (day <= 10) {
            eventTitle = "Eta Aquariids Meteor Shower";
            eventBadge = "Halley Comet Debris";
            eventDesc = "Speedy meteors originating from Halley's Comet. Peak viewing in early pre-dawn hours toward Aquarius.";
        } else {
            eventTitle = "Milky Way Core Rising";
            eventBadge = "Astrophotography Window";
            eventDesc = "Bright Galactic Core of the Milky Way rising late night toward Sagittarius. High contrast in dark skies.";
        }
    } else if (month === 5) { // Jun
        if (day >= 20 && day <= 23) {
            eventTitle = "Summer Solstice Peak";
            eventBadge = "Longest Day Solstice";
            eventDesc = "Maximum northern solar tilt. Sun reaches highest annual path over Punjab with extended twilight hours.";
        } else {
            eventTitle = "June Boötid Meteors";
            eventBadge = "Variable Meteor Stream";
            eventDesc = "Comet 7P/Pons-Winnecke dust trail producing occasional slow-moving golden meteors.";
        }
    } else if (month === 6) { // Jul
        if (day >= 26) {
            eventTitle = "Delta Aquariids Meteor Shower";
            eventBadge = "Southern Sky Stream";
            eventDesc = "Steady stream of faint meteors with long persistent trains visible after midnight towards southern horizon.";
        } else {
            eventTitle = "Summer Triangle Mastery";
            eventBadge = "Bright Star Triangle";
            eventDesc = "Vega, Deneb, and Altair forming the prominent Summer Triangle directly overhead at SLIET campus.";
        }
    } else if (month === 7) { // Aug
        if (day >= 9 && day <= 15) {
            eventTitle = "Perseids Meteor Shower Peak";
            eventBadge = "Active Peak Event";
            eventDesc = "Comet 109P/Swift-Tuttle debris producing up to 100 meteors/hr with vivid fireballs towards Perseus!";
        } else {
            eventTitle = "Saturn Near Opposition";
            eventBadge = "Planetary Highlight";
            eventDesc = "Saturn reaches peak annual brightness & proximity to Earth. Rings and titan moon visible via 100mm+ telescope.";
        }
    } else if (month === 8) { // Sep
        if (day >= 21 && day <= 24) {
            eventTitle = "Autumnal Equinox";
            eventBadge = "Seasonal Transition";
            eventDesc = "Sun crosses the celestial equator southwards. Equal day/night ratio marking the start of crisp autumn stargazing.";
        } else {
            eventTitle = "Neptune at Opposition";
            eventBadge = "Outer Planet Transit";
            eventDesc = "The blue ice giant Neptune is at its closest point to Earth. Visible as a blue point with telescope aid.";
        }
    } else if (month === 9) { // Oct
        if (day >= 19 && day <= 24) {
            eventTitle = "Orionids Meteor Shower";
            eventBadge = "Halley Comet Debris";
            eventDesc = "Fast meteors striking Earth's atmosphere at 66 km/s, leaving bright lingering trails near Orion's belt.";
        } else {
            eventTitle = "Andromeda Galaxy (M31) Peak";
            eventBadge = "Naked Eye Deep Space";
            eventDesc = "Our nearest spiral galaxy M31 high overhead. Visible as a faint fuzzy patch to the naked eye under dark skies.";
        }
    } else if (month === 10) { // Nov
        if (day >= 16 && day <= 20) {
            eventTitle = "Leonids Meteor Shower";
            eventBadge = "Comet Tempel-Tuttle";
            eventDesc = "Famous meteor shower known for producing intense meteor storms. Radiant located inside Leo constellation.";
        } else {
            eventTitle = "Pleiades (Seven Sisters) Peak";
            eventBadge = "Open Star Cluster";
            eventDesc = "The iconic Pleiades star cluster (M45) sparkling brightly in Taurus, visible to naked eye and binoculars.";
        }
    } else if (month === 11) { // Dec
        if (day >= 12 && day <= 16) {
            eventTitle = "Geminids Meteor Shower Peak";
            eventBadge = "King of Meteor Showers";
            eventDesc = "The year's most reliable and abundant meteor shower! Up to 120 multi-colored meteors/hr from asteroid 3200 Phaethon.";
        } else if (day >= 20 && day <= 23) {
            eventTitle = "Winter Solstice & Ursids";
            eventBadge = "Longest Night Solstice";
            eventDesc = "Shortest day & longest night of the year in SLIET Punjab, accompanied by the Ursid meteor shower towards Ursa Minor.";
        } else {
            eventTitle = "Orion Nebula (M42) Season";
            eventBadge = "Stellar Nursery Showcase";
            eventDesc = "The famous Orion Nebula M42 glowing vividly in Orion. Outstanding target for telescope observation.";
        }
    }

    const eventTitleEl = document.getElementById('sky-event-title');
    const eventBadgeEl = document.getElementById('sky-event-badge');
    const eventDescEl = document.getElementById('sky-event-desc');

    if (eventTitleEl) eventTitleEl.textContent = eventTitle;
    if (eventBadgeEl) eventBadgeEl.textContent = eventBadge;
    if (eventDescEl) eventDescEl.textContent = eventDesc;

    // 3. Dynamic Visible Planets for Current Season
    let planetTitle = "Saturn & Jupiter Watch";
    let planetDesc = "Saturn with ring structure visible in evening sky. Jupiter rising with 4 Galilean moons (Io, Europa, Ganymede, Callisto).";
    let planetBadge = "Visible Planets (30°N)";

    if (month >= 4 && month <= 8) { // Spring / Summer
        planetTitle = "Saturn Ring System & Mars";
        planetDesc = "Saturn visible in late evening sky with crisp ring separation. Mars appearing reddish in early morning twilight.";
    } else if (month >= 9 && month <= 11) { // Autumn / Early Winter
        planetTitle = "Jupiter & Saturn Double Show";
        planetDesc = "Jupiter shining as the brightest evening star with cloud bands visible. Saturn high in the southern sky.";
    } else { // Winter / Early Spring
        planetTitle = "Venus & Jupiter Conjunction";
        planetDesc = "Dazzling Venus brilliant in twilight sky alongside gas giant Jupiter and bright winter stars (Sirius & Betelgeuse).";
    }

    const planetTitleEl = document.getElementById('sky-planet-title');
    const planetBadgeEl = document.getElementById('sky-planet-badge');
    const planetDescEl = document.getElementById('sky-planet-desc');

    if (planetTitleEl) planetTitleEl.textContent = planetTitle;
    if (planetBadgeEl) planetBadgeEl.textContent = planetBadge;
    if (planetDescEl) planetDescEl.textContent = planetDesc;
}

/* ====================================================================
   5. Research & Publications System Logic
   ==================================================================== */
let currentPubCategory = 'all';

function initPublications() {
    renderPublications();
    handlePublicationsRouting();
}

function handlePublicationsRouting() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.endsWith('/publications') || path.endsWith('/publications.html') || hash === '#publications') {
        const pubSection = document.getElementById('publications');
        if (pubSection) {
            setTimeout(() => {
                pubSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
}

function renderPublications(filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('publications-grid');
    if (!grid) return;

    if (!window.CLUB_CONFIG || !window.CLUB_CONFIG.publications) {
        grid.innerHTML = `<p class="text-center text-slate-500 py-8">No publications configured.</p>`;
        return;
    }

    let items = window.CLUB_CONFIG.publications;

    if (filterCategory !== 'all') {
        items = items.filter(item => item.category === filterCategory);
    }

    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        items = items.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.journal.toLowerCase().includes(query) ||
            item.authors.some(author => author.toLowerCase().includes(query)) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
        );
    }

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="glass-card rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400">
                <i class="fa-solid fa-file-circle-xmark text-4xl mb-3 text-indigo-400"></i>
                <p class="font-bold text-base">No matching publications found.</p>
                <p class="text-xs mt-1">Try clearing your search query or selecting another topic category.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(item => {
        const authorBadges = item.authors.map(author => {
            if (author.includes("Dr. Ravi Kant Mishra")) {
                return `<span class="px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-sky-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800 whitespace-nowrap"><i class="fa-solid fa-user-graduate mr-1 text-indigo-500"></i> ${author}</span>`;
            }
            return `<span class="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs whitespace-nowrap">${author}</span>`;
        }).join(" ");

        const tagBadges = (item.tags || []).map(tag => 
            `<span class="px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-mono text-[11px]">#${tag}</span>`
        ).join(" ");

        return `
            <div class="glass-card rounded-2xl p-6 sm:p-8 hover:border-indigo-500/40 transition-all duration-300 group shadow-lg relative overflow-hidden">
                <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span class="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                        ${item.journal} (${item.year})
                    </span>
                    <span class="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check text-emerald-500 text-[9px]"></i> Peer-Reviewed
                    </span>
                </div>

                <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors mb-4">
                    ${item.title}
                </h3>

                <div class="flex flex-wrap items-center gap-2 mb-4">
                    <span class="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mr-1">AUTHORS:</span>
                    ${authorBadges}
                </div>

                <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 mb-5">
                    <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        ${item.abstract}
                    </p>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                    <div class="flex flex-wrap items-center gap-1.5">
                        ${tagBadges}
                    </div>
                </div>
            </div>

        `;
    }).join('');
}

function filterPublications(category) {
    currentPubCategory = category;
    const filterBtns = document.querySelectorAll('.pub-filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    });

    const activeBtn = document.getElementById(`pub-filter-${category}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-md');
        activeBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    }

    const searchInput = document.getElementById('pub-search-input');
    const query = searchInput ? searchInput.value : '';
    renderPublications(category, query);
}

function searchPublications() {
    const searchInput = document.getElementById('pub-search-input');
    const query = searchInput ? searchInput.value : '';
    renderPublications(currentPubCategory, query);
}

function copyCitation(pubId) {
    if (!window.CLUB_CONFIG || !window.CLUB_CONFIG.publications) return;
    const item = window.CLUB_CONFIG.publications.find(p => p.id === pubId);
    if (!item) return;

    const citationText = `${item.authors.join(', ')} (${item.year}). "${item.title}." ${item.journal}. DOI: ${item.doiUrl}`;
    
    navigator.clipboard.writeText(citationText).then(() => {
        showToast('Citation copied to clipboard!');
    }).catch(() => {
        alert('Citation copied:\n' + citationText);
    });
}

function showToast(message) {
    const existing = document.getElementById('savs-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'savs-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs shadow-2xl flex items-center gap-2 border border-slate-700 dark:border-slate-300 transition-all transform translate-y-0 opacity-100';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 dark:text-emerald-600"></i> <span>${message}</span>`;
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Announcement Popup Logic
function initEventPopup() {
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname === '';
    const hasShown = sessionStorage.getItem('eventPopupShown');
    
    if (isHomePage && !hasShown) {
        setTimeout(() => {
            const popup = document.getElementById('event-popup');
            const popupCard = popup ? popup.querySelector('.glass-card') : null;
            if (popup) {
                popup.classList.remove('opacity-0', 'pointer-events-none');
                popup.classList.add('opacity-100');
                if (popupCard) {
                    popupCard.classList.remove('scale-95');
                    popupCard.classList.add('scale-100');
                }
                sessionStorage.setItem('eventPopupShown', 'true');
            }
        }, 1500);
    }
}

function closeEventPopup() {
    const popup = document.getElementById('event-popup');
    const popupCard = popup ? popup.querySelector('.glass-card') : null;
    if (popup) {
        popup.classList.remove('opacity-100');
        popup.classList.add('opacity-0', 'pointer-events-none');
        if (popupCard) {
            popupCard.classList.remove('scale-100');
            popupCard.classList.add('scale-95');
        }
    }
}

function navigateToEvent() {
    closeEventPopup();
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        setTimeout(() => {
            eventsSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}


