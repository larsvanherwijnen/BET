import  {LoadingHall, LoadingHallSwitcher, TruckController, ConveyerbeltController} from "../modules.js"

export default class LoadingHallController {
    constructor(transport) {
        this._transport = transport;
        this.initiateLoadingHalls(2);
        this.render();
        this._truckController = new TruckController(transport);
        this._conveyerbeltController = new ConveyerbeltController(transport)

    }

    render() {
        this._loadingHallSwitcherView = new LoadingHallSwitcher(this._transport.loadingHalls, this.switchLoadingHall.bind(this), 'section-left'); 
        document.getElementById('loadingHall').textContent = this._transport.activeLoadingHall.name;

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