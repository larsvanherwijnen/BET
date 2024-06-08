import { TruckView, Truck, TruckForm, TruckType, TruckOverviewView, getById} from "../modules.js";

export default class TruckController {
    constructor(betTransport) {
        this._betTransport = betTransport;

        const originalLoadingHall = this._betTransport.activeLoadingHall;

        this._betTransport.activeLoadingHall = this._betTransport.loadingHalls[0].id;
        // Add two trucks to the first loading hall
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`, 3, 3, 2, TruckType.Cold));
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`,6, 3, 3, TruckType.Fast));

        this._betTransport.activeLoadingHall = this._betTransport.loadingHalls[1].id;
        // Add two trucks to the second loading hall
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`,5, 3, 2, TruckType.Fragile));
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`,4, 3, 3, TruckType.Pallets));

        this._betTransport.activeLoadingHall = originalLoadingHall.id;

        this.render();
    }


    render() {
        new TruckForm(this.createTruck.bind(this), 'section-left')
        new TruckOverviewView(
            this.removeTruck.bind(this),
            this._betTransport.activeLoadingHall.getTrucks(),
            'section-left'
        );
    }

    removeTruck(truckIndex) {
        // Get the truck to be removed
        const truckToRemove = this._betTransport.activeLoadingHall.getTrucks()[truckIndex];

        // Find the conveyor belt and dock where the truck is located
        for (let i = 0; i < this._betTransport.activeLoadingHall.conveyorBelts.length; i++) {
            const conveyorBelt = this._betTransport.activeLoadingHall.conveyorBelts[i];
            for (let j = 0; j < conveyorBelt.docks.length; j++) {
                if (conveyorBelt.docks[j] === truckToRemove) {
                    // Found the dock, remove the truck from this dock
                    conveyorBelt.removeTruckFromDock(j);
                    break;
                }
            }
        }

        // Remove the truck from the active loading hall
        this._betTransport.activeLoadingHall.removeTruck(truckIndex);

        // Render the updated state
        this.render();
    }

    createTruck() {
        const truck = new Truck(
        `${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            getById('width').value,
            getById('length').value,
            getById('interval').value,
            TruckType[getById('truckType').value]
        );

        this.addTruckToDock(truck);
    }

    addTruckToDock(truck) {
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
}