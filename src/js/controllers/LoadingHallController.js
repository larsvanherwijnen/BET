import  {LoadingHall, LoadingHallSwitcher, TruckController, ConveyorBeltController} from "../modules.js"

export default class LoadingHallController {
    constructor(transport) {
        this._transport = transport;
        this.initiateLoadingHalls(2);
        this.render();
        this._conveyerbeltController = new ConveyorBeltController(transport)
        this._truckController = new TruckController(transport);
        this.switchLoadingHall(1);
    }

    render() {
        this._loadingHallSwitcherView = new LoadingHallSwitcher(this._transport.loadingHalls, this.switchLoadingHall.bind(this), 'section-left'); 
    }

    initiateLoadingHalls(amountLoadingHalls) {
        const loadingHalls = []

        for(let i = 1; i <= amountLoadingHalls; i++) {
            loadingHalls.push(new LoadingHall(`Laadhal ${i}`, i))
        }

        this._transport.loadingHalls = loadingHalls;
    }

    switchLoadingHall(id) {
        this._transport.activeLoadingHall = id;
        this.render();
        this._truckController.render();
        this._conveyerbeltController.render();
    }

}