import { Truck, TruckForm, TruckType, TruckOverviewView} from "../modules.js";


export default class TruckController {

    constructor(betTransport) {
        this._betTransport = betTransport;

        this._betTransport.activeLoadingHall.addTruck(new Truck(2, 3, 2, TruckType.COLD));
        this._betTransport.activeLoadingHall.addTruck(new Truck(3, 6, 3, TruckType.FAST));
        this._betTransport.loadingHalls[1].addTruck(new Truck(2, 3, 2, TruckType.FRAGILE));
        this._betTransport.loadingHalls[1].addTruck(new Truck(3, 5, 3, TruckType.PALLET));

        this.render()
    }


    render() {
        new TruckForm(this.createTruck.bind(this))
        new TruckOverviewView(
            this.removeTruck.bind(this),
            this._betTransport.activeLoadingHall.getTrucks(),
        );
    }

    removeTruck(truckId) {
        this._betTransport.activeLoadingHall.removeTruck(truckId);
        this.render();
    }

    // 2 keer op de button klikken triggerd deze functie 2 keer. 
    createTruck() {  
        let types = Object.values(TruckType);
        const truck = new Truck(
            document.getElementById('width').value, 
            document.getElementById('length').value, 
            document.getElementById('arrival_interval').value,
            types[document.getElementById('truckTypes').value]
        );

        this._betTransport.activeLoadingHall.addTruck(truck);
        this.render();
    }
}