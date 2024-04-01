import { TextInput, SectionTitle, Button } from "../modules.js";

export default class LocationInputView {
    constructor(onchangeFunction) {
        this._onchangeFunction = onchangeFunction;
        this._wrapperElementId = 'weather';
        this._lastCity = "Den bosch"
        this.render();
        this.handleLocationUpdate();
    }

    setWeatherData(weatherData) {
        const wrapperElement = document.getElementById("weatherDescription")
        wrapperElement.innerHTML = `
            ${weatherData.city}
            <p>Het is momenteel ${weatherData.temperature} graden en het is ${weatherData.condition} </p>
        `
    }


    render() {
        const wrapperElement = document.getElementById(this._wrapperElementId)
        if (wrapperElement) {
            wrapperElement.innerHTML = '';
        }

        wrapperElement.appendChild(new SectionTitle("Weer"))
        wrapperElement.appendChild(new TextInput("city", "Welke stad?"));
        const cityErrorSpan = document.createElement('span'); // Create span element
        cityErrorSpan.id = 'cityError'; // Set id
        cityErrorSpan.className = 'text-red-600'; // Set class
        wrapperElement.appendChild(cityErrorSpan);        wrapperElement.appendChild(new Button(true, "Toepassen", "button", this.handleLocationUpdate.bind(this)));
        document.getElementById('city').value = this._lastCity
    }



    handleLocationUpdate() {
        this._lastCity = document.getElementById('city').value || this._lastCity;
        this._onchangeFunction(this._lastCity);
    }
}