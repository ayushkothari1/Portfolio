/* ============================================================
   script.js – Portfolio JavaScript
   ============================================================ */
//
// ─── FORMSUBMIT CONFIG ───────────────────────────────────────
// Emails go to pahadiayush61@gmail.com via Formsubmit.co (no account needed)
// First submission triggers a one-time activation email — just click the link!
const FORM_ENDPOINT = "https://formsubmit.co/ajax/pahadiayush61@gmail.com";

// ─── CURSOR GLOW ────────────────────────────────────────────
const glow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ─── NAVBAR SCROLL + PROGRESS BAR ───────────────────────────
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);

    // Scroll progress bar
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  },
  { passive: true },
);

// ─── HAMBURGER MENU ─────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ─── TYPED TEXT ─────────────────────────────────────────────
const phrases = [
  "Front-End Developer",
  "React Specialist",
  "UI / UX Enthusiast",
  "Open-Source Contributor",
  "Full-Stack Developer",
];
let pIdx = 0,
  cIdx = 0,
  deleting = false;
const typedEl = document.getElementById("typedText");

function type() {
  const current = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ─── PARTICLE CANVAS ────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5;
    this.a = Math.random() * 0.5 + 0.1;
  }
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.update();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168,85,247,${p.a})`;
      ctx.fill();
    });
    // connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── COUNTER ANIMATION ──────────────────────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 40);
}

// ─── INTERSECTION OBSERVER (reveal + skill bars + counters) ──
const revealEls = document.querySelectorAll(".reveal");
const skillFills = document.querySelectorAll(".skill-fill");
const statNums = document.querySelectorAll(".stat-num");
const observed = new Set();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Reveal animation
      if (el.classList.contains("reveal")) {
        const siblings = [...el.parentElement.querySelectorAll(".reveal")];
        const idx = siblings.indexOf(el);
        setTimeout(() => el.classList.add("visible"), idx * 80);
      }

      // Skill bars
      if (el.classList.contains("skill-fill") && !observed.has(el)) {
        observed.add(el);
        setTimeout(() => {
          el.style.width = el.dataset.width + "%";
        }, 200);
      }

      // Counters
      if (el.classList.contains("stat-num") && !observed.has(el)) {
        observed.add(el);
        animateCounter(el);
      }
    });
  },
  { threshold: 0.15 },
);

revealEls.forEach((el) => observer.observe(el));
skillFills.forEach((el) => observer.observe(el));
statNums.forEach((el) => observer.observe(el));

// ─── SKILLS CATEGORY FILTER ─────────────────────────────────
const catBtns = document.querySelectorAll(".skill-cat");
const skillCards = document.querySelectorAll(".skill-card");

catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    catBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category;

    skillCards.forEach((card) => {
      const show = cat === "all" || card.dataset.category === cat;
      if (show) {
        card.classList.remove("hidden");
        // re-trigger reveal
        card.classList.remove("visible");
        setTimeout(() => card.classList.add("visible"), 50);
      } else {
        card.classList.add("hidden");
      }
    });

    // Re-animate skill bars for visible cards
    document
      .querySelectorAll(".skill-card:not(.hidden) .skill-fill")
      .forEach((fill) => {
        fill.style.width = "0";
        setTimeout(() => {
          fill.style.width = fill.dataset.width + "%";
        }, 300);
      });
  });
});

// ─── CONTACT FORM (Formsubmit.co) ───────────────────────────
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");

  // Hide any previous messages
  formSuccess.hidden = true;
  formError.hidden = true;

  // Show loading state
  btnText.hidden = true;
  btnLoader.hidden = false;
  submitBtn.disabled = true;

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        _replyto: form.email.value, // so you can hit Reply in Gmail
        subject: form.subject.value,
        message: form.message.value,
        _subject: "📩 New message from portfolio: " + form.subject.value,
      }),
    });

    const data = await res.json();

    // Restore button
    btnText.hidden = false;
    btnLoader.hidden = true;
    submitBtn.disabled = false;

    if (data.success === "true" || data.success === true) {
      // ✅ Success
      formSuccess.hidden = false;
      form.reset();
      setTimeout(() => {
        formSuccess.hidden = true;
      }, 6000);
    } else {
      // ❌ Formsubmit returned an error
      formError.hidden = false;
      formError.innerHTML =
        '❌ Something went wrong. Email me at <a href="mailto:pahadiayush61@gmail.com">pahadiayush61@gmail.com</a>';
      setTimeout(() => {
        formError.hidden = true;
      }, 8000);
    }
  } catch (err) {
    // ❌ Network or fetch error
    console.error("Form error:", err);
    btnText.hidden = false;
    btnLoader.hidden = true;
    submitBtn.disabled = false;
    formError.hidden = false;
    formError.innerHTML =
      '❌ Network error. Email me at <a href="mailto:pahadiayush61@gmail.com">pahadiayush61@gmail.com</a>';
    setTimeout(() => {
      formError.hidden = true;
    }, 8000);
  }
});

// ─── FOOTER YEAR ────────────────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();

// ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle(
        "active-link",
        a.getAttribute("href") === "#" + current,
      );
    });
  },
  { passive: true },
);
