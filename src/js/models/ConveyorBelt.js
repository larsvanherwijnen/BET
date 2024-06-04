
export default class ConveyorBelt {
    constructor(id, rerenderCallback) {
        this.id = id;
        this.rerenderCallback = rerenderCallback; // Callback for rerendering
        this.docks = Array(3).fill(null); // Initialize with 3 empty docks
    }

    addTruckToDock(truck, dockIndex) {
        if (this.docks[dockIndex] === null) {
            this.docks[dockIndex] = truck;
            this.rerenderCallback();
        }
    }

    removeTruckFromDock(dockIndex) {
        this.docks[dockIndex] = null;
        this.rerenderCallback();
    }
}
