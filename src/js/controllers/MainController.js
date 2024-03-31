import {WeatherHelper, BetTransport, LoadingHallController, LocationInputView} from "../modules.js"

export default class MainController {
    constructor() {
        const betTransport = new BetTransport();
        new LoadingHallController(betTransport);
        this._weatherHelper = new WeatherHelper()
        this._locationInputView = new LocationInputView(this.handleLocationInput.bind(this), 'section-left');
        this.render()
    }

    render() {
        this._locationInputView.render();
    }

    handleLocationInput(city){
        this._weatherHelper.updateWeatherData(city).then(() => {
            this._locationInputView.setWeatherData(this._weatherHelper.weatherData)
        });
    }
}