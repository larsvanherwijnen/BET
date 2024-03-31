import { TextInput, SectionTitle, Button } from "../modules.js";

export default class LocationInputView {
    constructor(onchangeFunction) {
        this._onchangeFunction = onchangeFunction;
        this._wrapperElementId = 'weather';
        this._city = "Den bosch"
        this.render();
        this.handleLocationUpdate();
    }

    setWeatherData(weahterData) {
        const wrapperElement = document.getElementById(this._wrapperElementId)
        wrapperElement.innerHTML += `
             ${weahterData.city}
            <p>Het is momenteel ${weahterData.temperature} graden en het is ${weahterData.condition} </p>
        `
    }


    render() {
        const wrapperElement = document.getElementById(this._wrapperElementId)
        if(wrapperElement) {
            wrapperElement.innerHTML = '';
        }

        wrapperElement.appendChild(new SectionTitle("Weer"))
        wrapperElement.appendChild(new TextInput("city", "Welke stad?"));
        wrapperElement.appendChild(new Button(true, "Toepassen", "button", this.handleLocationUpdate.bind(this)));
        document.getElementById('city').value = this._city
    }



    handleLocationUpdate() {
        this._lastCity = document.getElementById('city').value || this._lastCity;
        this._onchangeFunction(this._lastCity);
    }
}