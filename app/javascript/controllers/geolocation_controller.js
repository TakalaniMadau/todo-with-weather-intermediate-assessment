import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="geolocation"
export default class extends Controller {
  static targets = ["button", "result"];

  requestLocation() {
    if (!navigator.geolocation) {
      this.displayError("Geolocation is not supported by your browser.");
      return;
    }

    this.buttonTarget.disabled = true;
    this.buttonTarget.textContent = "Getting location...";

    navigator.geolocation.getCurrentPosition(
      (position) => this.handleSuccess(position),
      (error) => this.handleError(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  handleSuccess(position) {
    const { latitude, longitude, accuracy } = position.coords;
    this.fetchLocationName(latitude, longitude, accuracy);
  }

  async fetchLocationName(latitude, longitude, accuracy) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      const locationName =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        "Johannesburg";
      await this.fetchWeather(locationName);
    } catch (error) {
      console.error("Error fetching location name:", error);
      await this.fetchWeather("Johannesburg");
    }
    this.resetButton();
  }

  async fetchWeather(location) {
    try {
      const apiKey = "8d3c6e3127f04a24a9e135920250112";
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
          location
        )}&days=1&aqi=no&alerts=no`
      );

      if (!response.ok) {
        throw new Error("Weather API error");
      }

      const weatherData = await response.json();
      this.displayWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error);
      this.displayError("Unable to fetch weather data. Please try again.");
    }
  }

  displayWeather(data) {
    const location = data.location;
    const current = data.current;
    const forecast = data.forecast.forecastday[0];

    const message = `
      <strong>${location.name}, ${location.region}</strong><br>
      Temperature: ${current.temp_c}°C (${current.temp_f}°F)<br>
      Condition: ${current.condition.text}<br>
      Humidity: ${current.humidity}%<br>
      Wind: ${current.wind_kph} km/h<br>
      <br>
      <strong>Today's Forecast:</strong><br>
      High: ${forecast.day.maxtemp_c}°C | Low: ${forecast.day.mintemp_c}°C<br>
      Condition: ${forecast.day.condition.text}
    `;

    this.resultTarget.innerHTML = message;
    this.resultTarget.className =
      "mt-4 p-4 rounded-md font-medium bg-blue-50 text-blue-900";
  }

  handleError(error) {
    let errorMessage = "Unable to retrieve your location.";

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage =
          "Location access denied. Showing weather for Johannesburg instead.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage =
          "Location information unavailable. Showing weather for Johannesburg instead.";
        break;
      case error.TIMEOUT:
        errorMessage =
          "Location request timed out. Showing weather for Johannesburg instead.";
        break;
    }

    this.displayResult(errorMessage, "warning");
    this.fetchWeather("Johannesburg");
  }

  displayResult(message, type) {
    this.resultTarget.textContent = message;
    this.resultTarget.className = `mt-4 p-3 rounded-md font-medium ${
      type === "success"
        ? "bg-green-50 text-green-700"
        : "bg-red-50 text-red-700"
    }`;
  }

  displayError(message) {
    this.displayResult(message, "error");
  }

  resetButton() {
    this.buttonTarget.disabled = false;
    this.buttonTarget.textContent = "Weather View";
  }
}
