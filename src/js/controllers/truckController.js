import { Truck, TruckForm, TruckType} from "../modules.js";


export default class TruckController {

    constructor(betTransport) {
        this._betTransport = betTransport;

        // this._betTransport.activeLoadingHall.addTruck(new Truck(2, 3, 2, TruckType.COLD));
        // this._betTransport.activeLoadingHall.addTruck(new Truck(6, 3, 3, TruckType.FAST));
        // this._betTransport.loadingHalls[1].addTruck(new Truck(2, 3, 2, TruckType.FRAGILE));
        // this._betTransport.loadingHalls[1].addTruck(new Truck(5, 3, 3, TruckType.PALLET));


        this.render()
    }


    render() {
        new TruckForm(this.createTruck.bind(this))
    }


    createTruck() {        
        const truck = new Truck(
            document.getElementById('width'), 
            document.getElementById('height'), 
            document.getElementById('interval'),
            TruckType[document.getElementById('type')]
        );

        this._betTransport.activeLoadingHall.addTruck(truck);
        this.render();
    }
}