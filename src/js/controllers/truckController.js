import { TruckView, Truck, TruckForm, TruckType, TruckOverviewView, getById} from "../modules.js";


export default class TruckController {
    constructor(betTransport) {
        this._betTransport = betTransport;

        this._betTransport.activeLoadingHall.addTruck(new Truck(2, 3, 2, TruckType.Cold));
        this._betTransport.activeLoadingHall.addTruck(new Truck(6, 3, 3, TruckType.Fast));
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
        this.displayTrucksInLoadingHall();
    }

    removeTruck(truckId) {
        this._betTransport.activeLoadingHall.removeTruck(truckId);
        this.render();
    }

    createTruck() {
        const truck = new Truck(
            getById('width').value,
            getById('length').value,
            getById('interval').value,
            TruckType[getById('truckType').value]
        );

        // Find the first conveyor belt with a free dock
        for (let i = 0; i < this._betTransport.activeLoadingHall.conveyorBelts.length; i++) {
            const conveyorBelt = this._betTransport.activeLoadingHall.conveyorBelts[i];
            const freeDockIndex = conveyorBelt.docks.findIndex(dock => dock === null);

            if (freeDockIndex !== -1) {
                // Found a free dock, add the truck to this dock
                conveyorBelt.addTruckToDock(truck, freeDockIndex);
                this._betTransport.activeLoadingHall.addTruck(truck);
                break;
            }
        }

        this.render();
    }

    displayTrucksInLoadingHall() {
        const trucks = this._betTransport.activeLoadingHall.getTrucks();
        const loadingHallElement = document.getElementById('loadingHall');
        loadingHallElement.innerHTML = '';

        const truckView = new TruckView();
        trucks.forEach((truck) => {
            truckView.displayGrid(truck, loadingHallElement);
        });
    }
}