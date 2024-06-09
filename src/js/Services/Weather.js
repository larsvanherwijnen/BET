import {TruckType, getById} from "../modules.js";

export default class Weather {
    constructor(){
        this.apiKey = "287acabb2762c04d15acfc423d950581";
        this.currentCity = "Amsterdam"
        this.weatherData = {};
    }

    async getCityCoordinates(city) {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    getById("cityError").textContent = "Oeps! Er is iets fout gegaan";
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    return { lat, lon };
                } else {
                    getById("cityError").textContent = "Stad niet gevonden";
                    throw new Error("City not found");
                }
            })
            .catch(error => {
                console.error("Error getting city coordinates:", error.message);
                throw error;
            });
    }

    async getWeatherInformation(city) {
        getById("cityError").textContent = "";
        this.currentCity = city;

        return this.getCityCoordinates(city)
            .then(({ lat, lon }) => {
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=nl`;
                return fetch(weatherUrl);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Weather data not available");
                }
                return response.json();
            })
            .then(data => {
                this.weatherData = {
                    city: city,
                    temperature: data.main.temp,
                    isWindy: data.wind.speed > 25,
                    isRaining: data.weather[0].main == "Rain",
                    isSnowing: data.weather[0] == "Snow",
                    condition: data.weather[0].description,
                };
            })
            .catch(error => {
                console.error("Error getting weather information:", error.message);
                throw error;
            });
    }

    updateWeatherData(city) {
        return this.getWeatherInformation(city);
    }

    canTruckDrive(truckType) {
        if (truckType === TruckType.Fragile && (this.weatherData.isRaining || this.weatherData.isSnowing)) {
            return false;
        }
        if (truckType === TruckType.Cold && this.weatherData.temperature > 35) {
            return false;
        }
        if (truckType === TruckType.Pallets && this.weatherData.isWindy) {
            return false;
        }
        return true;
    }
}
