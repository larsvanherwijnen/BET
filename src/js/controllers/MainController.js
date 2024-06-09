import {WeatherApi, BetTransport, LoadingHallController, LocationInputView,AnimationToggle} from "../modules.js"

export default class MainController {
    constructor() {
        const betTransport = new BetTransport();
        this._weatherApi = new WeatherApi()
        let animationsOn = true ;
        this._animationToggle = new AnimationToggle(this.AnimationToggle.bind(this), this._animationsOn, 'section-left');
        new LoadingHallController(betTransport, this._weatherApi, this.getAnimationState.bind(this));        this._locationInputView = new LocationInputView(this.handleLocationInput.bind(this), 'section-left');
       }

    handleLocationInput(city){
        this._weatherApi.updateWeatherData(city).then(() => {
            this._locationInputView.setWeatherData(this._weatherApi.weatherData);
        });
    }

    getAnimationState(){
        return this._animationsOn;
    }

    AnimationToggle(){
        this._animationsOn = !this._animationsOn;
        this._animationToggle.render(this._animationsOn);
    }

}