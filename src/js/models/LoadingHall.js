import ConveyorBelt from './conveyerbelt.js';
import Package from './package.js';
export default class LoadingHall {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        // this._conveyorBelts = [];
        this.conveyorBelt = new ConveyorBelt();

        this.conveyorBelt.addPackage(new Package('O'));
        this.conveyorBelt.addPackage(new Package('I'));
        this.displayPackages();

    }
    displayPackages() {
        this.conveyorBelt.displayPackages();
    }

    setIsActive() {

    }

    getIsActive() {
        return false;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }


    addTruck(truck) {
        console.log(truck)
    }
}