
export default class ConveyorBelt {
    constructor(id, position) {
        this.id = id;
        this.position = position; // { x: number, y: number }
        this.docks = Array(3).fill(null); // Initialize with 3 empty docks
    }

    addTruckToDock(truck, dockIndex) {
        console.log('Adding truck to dock', dockIndex);
        if (this.docks[dockIndex] === null) {
            this.docks[dockIndex] = truck;
            console.log('Truck added to dock', dockIndex);
            console.log('Docks:', this.docks);
        }
    }

    removeTruckFromDock(dockIndex) {
        this.docks[dockIndex] = null;
    }
}
