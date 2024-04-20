import { Input, SectionTitle, Button, createElement, clear, getById } from "../modules.js";

export default class LocationInputView {
    constructor(onchangeFunction, sectionId) {
        this._onchangeFunction = onchangeFunction;
        this._sectionId = sectionId;
        this._wrapperElementId = 'weather';
        this._weatherDataElementId = 'weather-data'
        this._lastCity = "Den bosch"
        this.render();
        this.handleLocationUpdate();
    }

    setWeatherData(weatherData) {
        this._weatherData = weatherData;
        const wrapperElement = getById(this._wrapperElementId)
        const el = getById(this._weatherDataElementId);
        el.textContent = `${weatherData.temperature} graden ${weatherData.condition}`;

        wrapperElement.appendChild(el)
    }

    render() {
        clear(this._wrapperElementId)
        const wrapperElement = createElement('div')
        wrapperElement.appendChild(new SectionTitle("Locatie"))
        wrapperElement.appendChild(new Input("text","city", "Welke stad?"));
        wrapperElement.classList.add('flex-col')
        wrapperElement.id = this._wrapperElementId;
        
        const cityErrorSpan = createElement('span');
        cityErrorSpan.id = 'cityError';
        cityErrorSpan.className = 'text-red-600';
        wrapperElement.appendChild(cityErrorSpan);        
        wrapperElement.appendChild(new Button(true, "Toepassen", "button", this.handleLocationUpdate.bind(this)));
        
        const weatherDataElement = createElement('div')
        weatherDataElement.id = this._weatherDataElementId;
        wrapperElement.appendChild(weatherDataElement)
        const targetElement = getById(this._sectionId)
        targetElement.insertBefore(wrapperElement, targetElement.children[4]);

        getById('city').value = this._lastCity
      
        if (this._weatherData) {
            this.setWeatherData(this._weatherData)
        }
    }


    handleLocationUpdate() {
        this._lastCity = getById('city').value || this._lastCity;
        this._onchangeFunction(this._lastCity);
    }
}