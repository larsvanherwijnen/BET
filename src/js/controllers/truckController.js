import { Truck, TruckForm, TruckType, TruckOverviewView, getById} from "../modules.js";


export default class TruckController {
    constructor(betTransport) {
        this._betTransport = betTransport;

        this._betTransport.activeLoadingHall.addTruck(new Truck(2, 3, 2, TruckType.Cold));
        this._betTransport.activeLoadingHall.addTruck(new Truck(3, 6, 3, TruckType.Fast));
        this._betTransport.loadingHalls[1].addTruck(new Truck(2, 3, 2, TruckType.Fragile));
        this._betTransport.loadingHalls[1].addTruck(new Truck(3, 5, 3, TruckType.Pallets));

        this.render()
    }


    render() {
        new TruckForm(this.createTruck.bind(this),'section-left')
        new TruckOverviewView(
            this.removeTruck.bind(this),
            this._betTransport.activeLoadingHall.getTrucks(),
            'section-left'
        );
    }

    removeTruck(truckId) {
        this._betTransport.activeLoadingHall.removeTruck(truckId);
        this.render();
    }

    createTruck() {  
        const truck = new Truck(
            getById('width').value, 
            getById('lenght').value, 
            getById('interval').value,
            TruckType[getById('truckType').value]
        );

        this._betTransport.activeLoadingHall.addTruck(truck);
        this.render();
    }
}