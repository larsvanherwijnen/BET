import  {LoadingHall, LoadingHallSwitcher, TruckController} from "../modules.js"

export default class LoadingHallController {
    constructor(transport) {
        this._transport = transport;
        this.initiateLoadingHalls(2);
        this.render();

        this._truckController = new TruckController(transport);

    }

    render() {
        this._loadingHallSwitcherView = new LoadingHallSwitcher(this._transport.loadingHalls); 
    }

    initiateLoadingHalls(amountLoadingHalls) {
        const loadingHalls = []

        for(let i = 1; i <= amountLoadingHalls; i++) {
            loadingHalls.push(new LoadingHall(`Laadhal ${i}`, i))
        }

        this._transport.loadingHalls = loadingHalls;

    }

}