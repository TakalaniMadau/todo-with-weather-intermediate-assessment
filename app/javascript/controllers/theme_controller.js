import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="theme"
export default class extends Controller {
  static targets = ["darkRadio", "lightRadio"];

  connect() {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    this.applyTheme(initialTheme);
  }

  change(event) {
    const value = event.target.value;
    const theme = value === "on" ? "dark" : "light";

    this.applyTheme(theme);
    localStorage.setItem("theme", theme);
  }

  applyTheme(theme) {
    if (this.hasDarkRadioTarget) {
      this.darkRadioTarget.checked = theme === "dark";
    }

    if (this.hasLightRadioTarget) {
      this.lightRadioTarget.checked = theme === "light";
    }
  }
}
