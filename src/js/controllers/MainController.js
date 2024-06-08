import {WeatherApi, BetTransport, LoadingHallController, LocationInputView,AnimationToggle} from "../modules.js"

export default class MainController {
    constructor() {
        const betTransport = new BetTransport();
        new LoadingHallController(betTransport);
        this._weahterApi = new WeatherApi()
        this._locationInputView = new LocationInputView(this.handleLocationInput.bind(this), 'section-left');
        this._animationsOn = true;
        this._animationToggle = new AnimationToggle(this.AnimationToggle.bind(this), this._animationsOn, 'section-left');
    }

    handleLocationInput(city){
        this._weahterApi.updateWeatherData(city).then(() => {
            this._locationInputView.setWeatherData(this._weahterApi.weatherData);
        });
    }

    AnimationToggle(){
        this._animationsOn = !this._animationsOn;
        this._animationToggle.render(this._animationsOn);
    }

}