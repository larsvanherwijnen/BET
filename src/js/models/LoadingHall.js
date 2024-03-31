export default class LoadingHall {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._conveyorBelts = [];
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
}