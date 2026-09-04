(() => {
  "use strict";

  const themeStorageKey = "apounder-color-theme";
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const themeButton = document.createElement("button");

  themeButton.type = "button";
  themeButton.className = "theme-toggle";
  themeButton.innerHTML = `
    <svg class="theme-icon theme-icon-moon" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 15.3A8.5 8.5 0 0 1 8.7 4a8.5 8.5 0 1 0 11.3 11.3Z"/>
    </svg>
    <svg class="theme-icon theme-icon-sun" aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3.5"/>
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
    </svg>
    <span class="theme-toggle-label"></span>
  `;

  const getThemePreference = () =>
    document.documentElement.dataset.themePreference || "system";

  const getResolvedTheme = () =>
    document.documentElement.dataset.theme || (darkModeQuery.matches ? "dark" : "light");

  const renderThemeControl = () => {
    const current = getResolvedTheme();
    const next = current === "dark" ? "light" : "dark";
    const nextLabel = next === "dark" ? "dark" : "light";
    themeButton.dataset.currentTheme = current;
    themeButton.setAttribute("aria-pressed", String(current === "dark"));
    themeButton.setAttribute("aria-label", `Switch to ${nextLabel} mode`);
    themeButton.setAttribute("title", `Switch to ${nextLabel} mode`);
    themeButton.querySelector(".theme-toggle-label").textContent =
      next === "dark" ? "Dark" : "Light";
    if (themeColor) themeColor.content = current === "dark" ? "#0e1513" : "#165c58";
  };

  const applyTheme = (theme, { persist = false } = {}) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    if (persist) {
      document.documentElement.dataset.themePreference = theme;
      try {
        window.localStorage.setItem(themeStorageKey, theme);
      } catch {
        // The theme still works for this page when storage is unavailable.
      }
    }

    renderThemeControl();
    window.dispatchEvent(new CustomEvent("apounder:themechange", { detail: { theme } }));
  };

  const header = document.querySelector(".header-inner");
  if (header) {
    const contactButton = header.querySelector(".orbit-button, .email-button");
    const menu = header.querySelector(".menu");
    const actions = document.createElement("div");
    actions.className = "header-actions";
    header.insertBefore(actions, contactButton || menu || null);
    actions.append(themeButton);
    if (contactButton) actions.append(contactButton);
    if (menu) actions.append(menu);
    renderThemeControl();

    themeButton.addEventListener("click", () => {
      applyTheme(getResolvedTheme() === "dark" ? "light" : "dark", { persist: true });
    });
  }

  darkModeQuery.addEventListener("change", event => {
    if (getThemePreference() === "system") applyTheme(event.matches ? "dark" : "light");
  });

  const menuButton = document.querySelector(".menu");
  const navigation = document.querySelector(".nav");

  if (menuButton && navigation) {
    if (!navigation.id) navigation.id = "site-navigation";
    navigation.setAttribute("aria-label", "Primary navigation");
    menuButton.setAttribute("aria-controls", navigation.id);
    menuButton.setAttribute("aria-expanded", String(navigation.classList.contains("open")));

    const syncMenu = () => {
      const open = navigation.classList.contains("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      document.body.classList.toggle("nav-open", open);
    };

    const closeMenu = () => {
      navigation.classList.remove("open");
      syncMenu();
    };

    // Page scripts perform the existing class toggle. This listener runs next
    // and keeps the accessible state synchronized with that established logic.
    menuButton.addEventListener("click", syncMenu);
    navigation.addEventListener("click", event => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && navigation.classList.contains("open")) {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener("click", event => {
      if (
        navigation.classList.contains("open") &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760 && navigation.classList.contains("open")) closeMenu();
    }, { passive: true });
  }

  document.querySelectorAll(".nav a.active").forEach(link => {
    link.setAttribute("aria-current", "page");
  });

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  });

  document.querySelectorAll("img").forEach(image => {
    if (!image.hasAttribute("decoding")) image.decoding = "async";
  });

  const setupResultCount = ({ toolbarSelector, itemSelector, label }) => {
    const toolbar = document.querySelector(toolbarSelector);
    const items = [...document.querySelectorAll(itemSelector)];
    if (!toolbar || items.length === 0) return;

    const status = document.createElement("p");
    status.className = "results-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    toolbar.insertAdjacentElement("afterend", status);

    const update = () => {
      const visible = items.filter(item => !item.classList.contains("hidden")).length;
      status.textContent = `${visible} ${visible === 1 ? label : `${label}s`} shown`;
    };

    const observer = new MutationObserver(update);
    items.forEach(item => observer.observe(item, { attributes: true, attributeFilter: ["class"] }));
    update();
  };

  setupResultCount({
    toolbarSelector: ".pub-toolbar",
    itemSelector: ".pub-item",
    label: "record"
  });
  setupResultCount({
    toolbarSelector: ".resource-toolbar",
    itemSelector: ".resource-card",
    label: "resource"
  });

  document.querySelectorAll(".filter, .resource-filter").forEach(button => {
    const group = button.closest(".filters, .resource-filter-row");
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => {
      group?.querySelectorAll("button").forEach(item => {
        item.setAttribute("aria-pressed", String(item.classList.contains("active")));
      });
    });
  });

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(hover: none) and (pointer: coarse)");

  if (!reducedMotionQuery.matches && !coarsePointerQuery.matches) {
    const motionSurfaces = document.querySelectorAll(
      ".hero, .page-hero, .research-card, .hex-cell, .presentation-card"
    );

    motionSurfaces.forEach(surface => {
      surface.classList.add("has-pointer-motion");
      let frame = 0;
      let fallbackTimer = 0;
      let point = { x: 0, y: 0, px: 50, py: 50 };

      const paint = () => {
        surface.style.setProperty("--pointer-x", point.x.toFixed(3));
        surface.style.setProperty("--pointer-y", point.y.toFixed(3));
        surface.style.setProperty("--pointer-position-x", `${point.px.toFixed(1)}%`);
        surface.style.setProperty("--pointer-position-y", `${point.py.toFixed(1)}%`);
        surface.style.setProperty("--motion-x", `${(point.x * 10).toFixed(2)}px`);
        surface.style.setProperty("--motion-y", `${(point.y * 8).toFixed(2)}px`);
        surface.style.setProperty("--motion-x-subtle", `${(point.x * 3).toFixed(2)}px`);
        surface.style.setProperty("--motion-y-subtle", `${(point.y * 2).toFixed(2)}px`);
        surface.style.setProperty("--motion-x-inverse", `${(point.x * -12).toFixed(2)}px`);
        surface.style.setProperty("--motion-y-inverse", `${(point.y * -9).toFixed(2)}px`);
        surface.style.setProperty("--motion-angle", `${(point.x * 1.5).toFixed(2)}deg`);
        surface.classList.add("is-pointer-active");
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        fallbackTimer = 0;
        frame = 0;
      };

      surface.addEventListener("pointermove", event => {
        const bounds = surface.getBoundingClientRect();
        point = {
          x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
          px: ((event.clientX - bounds.left) / bounds.width) * 100,
          py: ((event.clientY - bounds.top) / bounds.height) * 100
        };
        if (!frame) {
          frame = window.requestAnimationFrame(paint);
          fallbackTimer = window.setTimeout(() => {
            if (!frame) return;
            window.cancelAnimationFrame(frame);
            paint();
          }, 48);
        }
      }, { passive: true });

      surface.addEventListener("pointerleave", () => {
        if (frame) window.cancelAnimationFrame(frame);
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        frame = 0;
        fallbackTimer = 0;
        surface.classList.remove("is-pointer-active");
        surface.style.setProperty("--pointer-x", "0");
        surface.style.setProperty("--pointer-y", "0");
        surface.style.setProperty("--pointer-position-x", "50%");
        surface.style.setProperty("--pointer-position-y", "50%");
        surface.style.setProperty("--motion-x", "0px");
        surface.style.setProperty("--motion-y", "0px");
        surface.style.setProperty("--motion-x-subtle", "0px");
        surface.style.setProperty("--motion-y-subtle", "0px");
        surface.style.setProperty("--motion-x-inverse", "0px");
        surface.style.setProperty("--motion-y-inverse", "0px");
        surface.style.setProperty("--motion-angle", "0deg");
      }, { passive: true });
    });
  }
})();
