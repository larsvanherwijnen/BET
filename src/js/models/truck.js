export default class Truck {
    constructor(id, width, length, arrivalInterval, type) {
        this._id = id;
        this._width = width;
        this._length = length;
        this._arrivalInterval = arrivalInterval;
        this._type = type;
        this._packages = [];
        this._filledParts = Array.from({ length: this._length }, () => Array(this._width).fill(false));
    }

    canPlacePackage(packageShape, startRow, startCol) {
        // Check if packageShape is a valid 2D array
        if (!Array.isArray(packageShape) || !packageShape.every(row => Array.isArray(row))) {
            throw new Error("Invalid package shape");
        }

        // Check if the package fits within the truck dimensions
        if (startRow < 0 || startCol < 0 ||
            startRow + packageShape.length > this._length ||
            startCol + packageShape[0].length > this._width) {
            return false;
        }

        // Check for collision with already filled parts
        for (let row = 0; row < packageShape.length; row++) {
            for (let col = 0; col < packageShape[row].length; col++) {
                if (packageShape[row][col] === 1 &&
                    this._filledParts[startRow + row][startCol + col]) {
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
        return this._arrivalInterval;
    }
}
