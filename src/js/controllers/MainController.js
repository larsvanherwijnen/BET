import {WeatherApi, BetTransport, LoadingHallController, LocationInputView} from "../modules.js"

export default class MainController {
    constructor() {
        const betTransport = new BetTransport();
        new LoadingHallController(betTransport);
        this._weahterApi = new WeatherApi()
        this._locationInputView = new LocationInputView(this.handleLocationInput.bind(this), 'section-left');
    }

    handleLocationInput(city){
        this._weahterApi.updateWeatherData(city).then(() => {
            this._locationInputView.setWeatherData(this._weahterApi.weatherData);
        });
    }
}