(() => {
  "use strict";

  const storageKey = "apounder-color-theme";
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  let preference = "system";
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (["light", "dark", "system"].includes(saved)) preference = saved;
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  const resolved = preference === "system"
    ? (darkQuery.matches ? "dark" : "light")
    : preference;

  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = resolved;
})();
