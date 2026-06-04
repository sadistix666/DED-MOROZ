(() => {
  const initPage = () => {
    const blocks = document.querySelectorAll(".reveal");
    const lightsToggle = document.querySelector("[data-lights-toggle]");
    let lastTinselLaunch = 0;

    const launchTinsel = () => {
      if (!lightsToggle || !lightsToggle.closest(".home-hero")) {
        return;
      }

      const now = Date.now();
      if (now - lastTinselLaunch < 700) {
        return;
      }

      lastTinselLaunch = now;
      lightsToggle.classList.remove("is-tinsel-pressed");
      void lightsToggle.offsetWidth;
      lightsToggle.classList.add("is-tinsel-pressed");
      window.setTimeout(() => lightsToggle.classList.remove("is-tinsel-pressed"), 560);

      const rect = lightsToggle.getBoundingClientRect();
      const colors = ["#ffffff", "#f4f0e7", "#d8dce3", "#e3c16d", "#c43c3c"];
      const count = 28;

      for (let i = 0; i < count; i += 1) {
        const particle = document.createElement("div");
        const isStrip = Math.random() > 0.45;
        const size = isStrip ? 3 + Math.random() * 3 : 5 + Math.random() * 4;
        const x = rect.left + rect.width * (0.38 + Math.random() * 0.24);
        const y = rect.top + rect.height * (0.28 + Math.random() * 0.22);
        const dx = (Math.random() - 0.5) * 260;
        const dy = -120 - Math.random() * 180;
        const duration = 1200 + Math.random() * 600;

        particle.className = `tinsel-particle${isStrip ? " tinsel-particle--strip" : ""}`;
        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);
        particle.style.setProperty("--w", `${isStrip ? size * 3.4 : size}px`);
        particle.style.setProperty("--h", `${isStrip ? size : size}px`);
        particle.style.setProperty("--dx", `${dx}px`);
        particle.style.setProperty("--dy", `${dy}px`);
        particle.style.setProperty("--rot", `${(Math.random() - 0.5) * 720}deg`);
        particle.style.setProperty("--scale", `${0.8 + Math.random() * 0.55}`);
        particle.style.setProperty("--duration", `${duration}ms`);
        particle.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
        particle.addEventListener("animationend", () => particle.remove(), { once: true });
        window.setTimeout(() => particle.remove(), duration + 160);
        document.body.appendChild(particle);
      }
    };

    if (lightsToggle) {
      lightsToggle.addEventListener("click", launchTinsel);
      lightsToggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          launchTinsel();
        }
      });
    }

    if (!("IntersectionObserver" in window)) {
      blocks.forEach((block) => block.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    blocks.forEach((block) => observer.observe(block));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage, { once: true });
  } else {
    initPage();
  }
})();
