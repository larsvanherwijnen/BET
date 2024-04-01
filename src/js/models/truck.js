export default class Truck {
    constructor(width, length, arrivalInterval, type) {
        this._width = width;
        this._length = length;
        this._arrivalInterval = arrivalInterval;
        this._type = type;
    }


    get width() {
        return this._width;
    }

    get length() {
        return this._length;
    }

    get type() {
        return this._type;
    }

    get arrivalInterval() {
        return this._arrivalInterval
    }
}