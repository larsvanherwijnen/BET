import { Truck, TruckForm, TruckType, TruckOverviewView, getById} from "../modules.js";

export default class TruckController {
    constructor(betTransport, animationState, weatherApi) {
        this._betTransport = betTransport;
        this._animationState = animationState;
        this._weatherApi = weatherApi;

        this._storedPackages = [];
        const originalLoadingHall = this._betTransport.activeLoadingHall;

        this._betTransport.activeLoadingHall = this._betTransport.loadingHalls[0].id;
        // Add two trucks to the first loading hall
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`, 3, 3, 2, TruckType.Cold));
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`, 6, 3, 3, TruckType.Fast));

        this._betTransport.activeLoadingHall = this._betTransport.loadingHalls[1].id;
        // Add two trucks to the second loading hall
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`, 5, 3, 2, TruckType.Fragile));
        this.addTruckToDock(new Truck(`${Date.now()}_${Math.floor(Math.random() * 1000)}`, 4, 3, 3, TruckType.Pallets));

        this._betTransport.activeLoadingHall = originalLoadingHall.id;

        this.render();
        this.autoPlacePackageInTruck(); 
    }


    render() {
        new TruckForm(this.createTruck.bind(this), 'section-left')
        new TruckOverviewView(
            this.removeTruck.bind(this),
            this._betTransport.activeLoadingHall.getTrucks(),
            'section-left'
        );
    }

    removeTruck(truckIndex) {
        const truckToRemove = this._betTransport.activeLoadingHall.getTrucks()[truckIndex];

        for (let i = 0; i < this._betTransport.activeLoadingHall.conveyorBelts.length; i++) {
            const conveyorBelt = this._betTransport.activeLoadingHall.conveyorBelts[i];
            for (let j = 0; j < conveyorBelt.docks.length; j++) {
                if (conveyorBelt.docks[j] === truckToRemove) {
                    conveyorBelt.removeTruckFromDock(j);
                    break;
                }
            }
        }

        this._betTransport.activeLoadingHall.removeTruck(truckIndex);

        this.render();
    }

    createTruck() {
        const truck = new Truck(
            `${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            getById('width').value,
            getById('length').value,
            getById('interval').value,
            TruckType[getById('truckType').value]
        );

        this.addTruckToDock(truck);
    }

    addTruckToDock(truck) {
        for (let i = 0; i < this._betTransport.activeLoadingHall.conveyorBelts.length; i++) {
            const conveyorBelt = this._betTransport.activeLoadingHall.conveyorBelts[i];
            const freeDockIndex = conveyorBelt.docks.findIndex(dock => dock === null);

            if (freeDockIndex !== -1) {
                conveyorBelt.addTruckToDock(truck, freeDockIndex);
                this._betTransport.activeLoadingHall.addTruck(truck);
                break;
            }
        }
        this.render();
    }


    autoPlacePackageInTruck() {
        setInterval(() => {
            if (!this._animationState()) return;

            this._betTransport.activeLoadingHall.conveyorBelts.forEach(conveyorBelt => {
                this.processConveyorBelt(conveyorBelt);
            });
        }, 1000);
    }

    processConveyorBelt(conveyorBelt) {
        const parcel = conveyorBelt.packages.slice(-1)[0];
        if (!parcel) return;

        let truck, position;

        for (let dock of conveyorBelt.docks) {
            if (!dock) continue;

            if (!this._weatherApi.canTruckDrive(dock.type)) {
                this._storedPackages.push(parcel);
                continue;
            }

            for (let row = 0; row < dock.length; row++) {
                for (let col = 0; col < dock.width; col++) {
                    if (dock.canPlacePackage(parcel.shape, row, col)) {
                        truck = dock;
                        position = { row, col };
                        break;
                    }
                }
                if (truck) break;
            }

            if (truck) break;
        }

        if (!truck || !position) return;

        const packageElement = getById(parcel.id);
        const truckElement = getById(truck._id);

        if (!packageElement || !truckElement) {
            return;
        }

        this.animateMovement(packageElement, truckElement, () => {
            conveyorBelt.removePackage(parcel.id);
            truck._packages.push(parcel);
            truck.fillParts(parcel.shape, position.row, position.col);
        });
    }

    animateMovement(element, targetElement, callback) {
        const elementRect = element.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        const deltaX = targetRect.left - elementRect.left;
        const deltaY = targetRect.top - elementRect.top;

        element.style.transition = 'transform 0.5s ease-in-out';
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        const animationEndHandler = () => {
            element.style.transition = '';
            element.style.transform = '';
            element.removeEventListener('transitionend', animationEndHandler);
            callback();
        };

        element.addEventListener('transitionend', animationEndHandler);

        const checkPosition = () => {
            const currentRect = element.getBoundingClientRect();
            const distanceToTarget = Math.sqrt(
                Math.pow(targetRect.left - currentRect.left, 2) +
                Math.pow(targetRect.top - currentRect.top, 2)
            );
            if (distanceToTarget <= 1) {
                animationEndHandler();
            } else {
                requestAnimationFrame(checkPosition);
            }
        };
        requestAnimationFrame(checkPosition);
    }
}