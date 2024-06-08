export default class Truck {
    constructor(id, width, length, arrivalInterval, type) {
        this._id = id;
        this._width = width;
        this._length = length;
        this._arrivalInterval = arrivalInterval;
        this._type = type;
        this._filledParts = Array.from({ length: this._length }, () => Array(this._width).fill(false));
    }

    canPlacePackage(packageShape, startRow, startCol) {
        console.log("packageShape: ", packageShape);
        if (startRow + packageShape.length > this._width || startCol + packageShape[0].length > this._width) {
            return false;
        }
        for (let row = 0; row < packageShape.length; row++) {
            for (let col = 0; col < packageShape[row].length; col++) {
                if (packageShape[row][col] === 1 && this._filledParts[startRow + row][startCol + col]) {
                    return false;
                }
            }
        }
        return true;
    }

    clearPackages() {
        this._filledParts = Array.from({ length: this._length }, () => Array(this._width).fill(false));
    }

    fillParts(packageShape, startRow, startCol) {
        for (let row = 0; row < packageShape.length; row++) {
            for (let col = 0; col < packageShape[row].length; col++) {
                if (packageShape[row][col] === 1) {
                    this._filledParts[startRow + row][startCol + col] = true;
                }
            }
        }
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