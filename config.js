/* ====================================================================
   SLIET ANTRIKSHA VIGYAN SOCIETY - BEGINNER CONFIGURATION FILE (config.js)
   ====================================================================
   Edit the Google Form links, emails, and details below easily!
   ==================================================================== */

window.CLUB_CONFIG = {
    // 1. Google Form Links (KEPT SEPARATE TO PREVENT CONFUSION)
    joinUsFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfj3bD3eaPQhxc_ZZ45Zcu8hq5t4m_zeN0X_cARRy2EM5NjIQ/viewform", // 🟢 1. Society Membership & Recruitment Google Form
    eventFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfj3bD3eaPQhxc_ZZ45Zcu8hq5t4m_zeN0X_cARRy2EM5NjIQ/viewform", // 🔵 2. Event Registration Google Form

    // 2. Official Contacts
    officialEmail: "antriksha@sliet.ac.in",    // Official Society Email
    instagramUrl: "https://instagram.com",     // Instagram Handle URL
    facultyWebsite: "https://rkmishra.com/",   // Dr. R.K. Mishra's website
    facultyPublicationPortal: "https://rkmishra.com/publication", // Dr. R.K. Mishra's official publication portal

    // 3. Astronomy Alert Banner (Sky Watch Section)
    skyWatchAlert: {
        dateLocation: "SLIET Longowal",
        eventTitle: "Perseids Meteor Shower",
        eventBadge: "Active Peak Event",
        description: "Peak visibility tonight! Best viewed after midnight towards the north-eastern sky away from light interference."
    },

    // 4. Faculty Head Information
    facultyHead: {
        name: "Dr. Ravi Kant Mishra",
        role: "Faculty Head & Society Mentor",
        designation: "Professor & Dean (Alumni and Industrial Relations)",
        photoPath: "rk_mishra.webp",
        bio: "Dr. Ravi Kant Mishra is a Professor and Dean at SLIET Longowal with 28+ years of leadership in Cosmology, Astrophysics, and Space Science, known for his extensive research in modified gravity theories and cosmological modeling. As the founder of the SLIET Antriksha Vigyan Society, he mentors student-led space research, while his academic footprint spans invited lectures at premier astrophysics forums across the USA and Europe, service as former Registrar of NIT Puducherry, and membership on Faculty Selection Boards across multiple NITs."
    },

    // 5. Research & Publications Data (Authored exclusively by Prof. Dr. Ravi Kant Mishra)
    publications: [
        {
            id: "pub-1",
            title: "Anisotropic cyclic cosmology in f(T) gravity: A Bianchi type-II framework for periodic big bang big crunch evolution",
            authors: ["Dr. Ravi Kant Mishra", "Rahul Sharma"],
            journal: "Modern Physics Letters A",
            year: "2026",
            category: "cosmology",
            coverImage: "images/publications/modern_physics_letters_a.webp",
            doiUrl: "https://rkmishra.com/publication",
            pdfUrl: "https://rkmishra.com/publication",
            abstract: "Investigating periodic Big Bang-Big Crunch cosmological evolution using Bianchi type-II metrics within the teleparallel gravity f(T) framework.",
            tags: ["Cosmology", "f(T) Gravity", "SCI / Scopus / WoS (IF: 2.6)"]
        },
        {
            id: "pub-2",
            title: "Beyond General Relativity: Comparative Analysis Between BDT & f(R,T) With NLDP",
            authors: ["Dr. Ravi Kant Mishra", "Rahul Sharma"],
            journal: "International Journal of Theoretical Physics",
            year: "2024",
            category: "cosmology",
            coverImage: "images/publications/intl_journal_theoretical_physics.webp",
            doiUrl: "https://rkmishra.com/publication",
            pdfUrl: "https://rkmishra.com/publication",
            abstract: "A comparative cosmological analysis between Brans-Dicke theory (BDT) and f(R,T) gravity formulated with non-linear deceleration parameters.",
            tags: ["Cosmology", "Brans-Dicke", "SCI / Scopus / WoS (IF: 3.4)"]
        },
        {
            id: "pub-3",
            title: "Numerical and statistical insights into f(R,T) cosmology: GRP, RK4, and MLE approaches",
            authors: ["Dr. Ravi Kant Mishra", "Navya Jain"],
            journal: "Romanian Journal of Physics",
            year: "2025",
            category: "astrophysics",
            coverImage: "images/publications/romanian_journal_of_physics.webp",
            doiUrl: "https://rkmishra.com/publication",
            pdfUrl: "https://rkmishra.com/publication",
            abstract: "Combining Runge-Kutta 4th order (RK4) numerical methods and Maximum Likelihood Estimation (MLE) with observational Hubble data to constrain f(R,T) cosmological models.",
            tags: ["Astrophysics", "Numerical Methods", "SCI / Scopus / WoS (IF: 1.5)"]
        },
        {
            id: "pub-4",
            title: "Analytical and Numerical Investigation of Cosmological Stability in Scalar-Tensor Gravity",
            authors: ["Dr. Ravi Kant Mishra", "Navya Jain"],
            journal: "Bulgarian Journal of Physics",
            year: "2026",
            category: "cosmology",
            coverImage: "images/publications/bulgarian_journal_of_physics.webp",
            doiUrl: "https://rkmishra.com/publication",
            pdfUrl: "https://rkmishra.com/publication",
            abstract: "Perturbative stability analysis and dynamical system phase-space behavior in scalar-tensor gravitation.",
            tags: ["Cosmology", "Scalar-Tensor", "SCI / Scopus / WoS (IF: 2.1)"]
        },
        {
            id: "pub-5",
            title: "Exploring Advanced Curvature and Linear Matter Coupling with Its Impact on the Expanding Universe",
            authors: ["Dr. Ravi Kant Mishra", "Rahul Sharma"],
            journal: "Journal of Physics: Conference Series",
            year: "2025",
            category: "astrophysics",
            coverImage: "images/publications/journal_of_physics_conf.webp",
            doiUrl: "https://rkmishra.com/publication",
            pdfUrl: "https://rkmishra.com/publication",
            abstract: "Analyzing curvature-matter couplings in modified gravity theories and their geometrical effects on cosmic expansion acceleration.",
            tags: ["Astrophysics", "Curvature Coupling", "SCI / Scopus / WoS (IF: 2.2)"]
        },
        {
            id: "pub-6",
            title: "Generalized fractional deceleration as a tool to decode the universe's expansion",
            authors: ["Dr. Ravi Kant Mishra", "Priya Awasthi", "Rahul Sharma"],
            journal: "Modern Physics Letters A",
            year: "2026",
            category: "cosmology",
            coverImage: "images/publications/modern_physics_letters_a.webp",
            doiUrl: "https://rkmishra.com/publication",
            pdfUrl: "https://rkmishra.com/publication",
            abstract: "Formulating fractional deceleration parameterizations to model cosmic transition from decelerating to accelerating expansion regimes.",
            tags: ["Cosmology", "Deceleration Parameter", "SCI / Scopus / WoS (IF: 1.6)"]
        }
    ]
};



