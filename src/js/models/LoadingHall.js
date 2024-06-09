export default class LoadingHall {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._conveyorBelts = [];
        this._trucks = [];
    }

    setIsActive = (isActive) => this._isActive = isActive;
    getIsActive = () => this._isActive;

    set conveyorBelts(conveyorBelts) {
        this._conveyorBelts = conveyorBelts;
    }

    get conveyorBelts() {
        return this._conveyorBelts;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    getTrucks() {
        return this._trucks;
    }

    addTruck(truck) {
        this._trucks.push(truck)
    }

    removeTruck(truckId) {
        this._trucks.splice(truckId, 1)
        return false;
    }
}