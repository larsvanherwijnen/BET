import { PackageShape, Package } from "../modules.js";

export default class ConveyorBelt {
    constructor(id, rerenderCallback) {
        this.id = id;
        this.rerenderCallback = rerenderCallback; // Callback for rerendering
        this.packages = [];
        this.docks = Array(3).fill(null); // Initialize 3 empty docks

        for (let i = 0; i < 10; i++) {
            const newPackage = this.generateNewPackage();
            this.packages.push(newPackage);
        }
    }

    addTruckToDock(truck, dockIndex) {
        if (this.docks[dockIndex] === null) {
            this.docks[dockIndex] = truck;
            this.rerenderCallback();
        }
    }

    addPackage(parcel) {
        this.packages.unshift(parcel);
        this.rerenderCallback();
    }


    removePackage(packageId) {
        const index = this.packages.findIndex(pkg => pkg.id === packageId);
        if (index > -1) {
            // Immediately remove the package to be dragged
            this.packages.splice(index, 1);
            const packageElement = document.getElementById(packageId);
            packageElement.style.opacity = '0';
            this.updatePackagePositions(index);
            // Add a new package at the beginning of the array after the animation
            setTimeout(() => {
                const newPackage = this.generateNewPackage();
                this.addPackage(newPackage);
            }, 500); // Adjust this value to match the duration of the CSS transition
        }
    }

    generateNewPackage() {
        const packageShapes = new PackageShape();
        const shapeKeys = Object.keys(packageShapes);
        const randomShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
        const randomShape = packageShapes[randomShapeKey];
        const uniqueId = `package_${this.id}_${this.packages.length}_${Date.now()}`;
        return new Package(uniqueId, randomShape);    }

    removeTruckFromDock(dockIndex) {
        this.docks[dockIndex] = null;
        this.rerenderCallback();
    }

    updatePackagePositions(removedPackageIndex) {
        const conveyorBeltElement = document.querySelector(`#conveyorBelt${this.id}`);
        if (!conveyorBeltElement) return;

        const conveyorBeltWidth = conveyorBeltElement.offsetWidth;
        const packageElements = Array.from(document.querySelectorAll(`#conveyorBelt${this.id} .package`));

        if (packageElements.length === 0) return;

        const totalPackageWidth = packageElements.reduce((sum, el) => sum + el.offsetWidth, 0);
        const totalGapWidth = conveyorBeltWidth - totalPackageWidth;
        const gapWidth = totalGapWidth / (packageElements.length + 1);

        let currentPosition = gapWidth;
        packageElements.forEach((packageElement, index) => {
            if (index < removedPackageIndex) {
                packageElement.style.transition = 'transform 0.5s ease-in-out';
                packageElement.style.transform = `translateX(${packageElement.offsetWidth + gapWidth}px)`;
            }
        });
    }

}
