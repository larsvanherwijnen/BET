export default class Truck {
    constructor(width, height, arrivalInterval, type) {
        this._width = width;
        this._height = height;
        this._arrivalInterval = arrivalInterval;
        this._type = type;

        this.grid = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

    }
}