export default class Weather {
    constructor(){
        this.apiKey = "287acabb2762c04d15acfc423d950581";
        this.currentCity = "Amsterdam"
        this.weatherData = {};
    }

    async getCityCoordinates(city) {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { lat, lon };
            } else {
                throw new Error("City not found");
            }
        } catch (error) {
            console.error("Error getting city coordinates:", error.message);
            throw error;
        }
    }
    
    async getWeatherInformation(city) {   
        this.currentCity = city

        try {
            const { lat, lon } = await this.getCityCoordinates(city);
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=nl`;
            const response = await fetch(weatherUrl);
            const data = await response.json();

            this.weatherData = {
                city: city,
                temperature: data.main.temp,
                isWindy: data.wind.speed > 25,
                isRaining: data.weather[0].main == "Rain",
                isSnowing: data.weather[0] == "Snow",
                condition: data.weather[0].description,
            }
            
        } catch (error) {
            console.error("Error getting weather information:", error.message);
        }
    }


    async updateWeatherData(city) {
        await this.getWeatherInformation(city);
    }


}







