import {PackageView, TruckView, ConveyorBelt, ManageConveyorBeltsView, getById, createElement} from "../modules.js";

export default class ConveyorBeltController {
    constructor(transport) {
        this._transport = transport;

        this.maxAmountOfConveyorBelts = 3;
        this.amountOfPackages = 10;

        const originalLoadingHall = this._transport.activeLoadingHall;
        this._transport.activeLoadingHall = this._transport.loadingHalls[0].id;
        this.addConveyorBelt();
        this._transport.activeLoadingHall = this._transport.loadingHalls[1].id;
        this.addConveyorBelt();
        this._transport.activeLoadingHall = originalLoadingHall.id;
        new ManageConveyorBeltsView(this.addConveyorBelt.bind(this), this.removeConveyorBelt.bind(this), 'section-left');
        this.render();
    }

    render() {
        this.createConveyorBeltsContainer();
        this.renderConveyorBelts();
    }

    addConveyorBelt() {
        const beltId = this._transport.activeLoadingHall.conveyorBelts.length + 1;
        const newBelt = new ConveyorBelt(beltId, this.render.bind(this));
        this._transport.activeLoadingHall.conveyorBelts.push(newBelt);
        this.render();
    }

    createConveyorBeltsContainer() {
        let container = getById('conveyorBeltsContainer');
        const loadingHall = getById('loadingHall');
        if (!container) {
            container = createElement('div');
            container.id = 'conveyorBeltsContainer';
            loadingHall.appendChild(container);
        }
    }

    removeConveyorBelt() {
        if(this._transport.activeLoadingHall.conveyorBelts.length === 1) return;
        this._transport.activeLoadingHall.conveyorBelts.pop();
        this.render();
    }

    renderConveyorBelts() {
        const container = getById('conveyorBeltsContainer');
        container.innerHTML = ''; // Clear existing content

        const conveyorBelts = this._transport.activeLoadingHall.conveyorBelts;
        conveyorBelts.forEach(belt => {
            this.renderConveyorBelt(container, belt);
        });

    }

    renderConveyorBelt(container, conveyorBelt) {
        const beltDiv = createElement('div');
        beltDiv.id = `conveyorBelt${conveyorBelt.id}`;
        beltDiv.classList.add('conveyor-belt', 'relative', 'bg-gray-600', 'my-4', 'p-2', 'rounded', 'flex', 'flex-wrap', 'justify-between'); // Add 'flex', 'flex-wrap', 'justify-between'
        beltDiv.style.height = '150px';

        const docksDiv = createElement('div');
        docksDiv.classList.add('docks', 'flex', 'justify-between', 'mb-2');
        container.appendChild(docksDiv);
        container.appendChild(beltDiv);


        const truckView = new TruckView();

        conveyorBelt.docks.forEach((dock, index) => {
            const dockDiv = createElement('div');
            dockDiv.classList.add('dock', 'flex-grow', 'm-2', 'rounded', 'h-48');
            dockDiv.style.flexBasis = '0';
            if (dock !== null) {
                // Display the truck in the dock
                truckView.displayGrid(dock, dockDiv, this.removePackageFromConveyorBelt.bind(this));
            }
            docksDiv.appendChild(dockDiv);
        });

        conveyorBelt.packages.forEach(parcel => {
            const containerHeight = beltDiv.offsetHeight;
            const packageView = new PackageView(parcel, containerHeight);
            const packageElement = packageView.render();
            beltDiv.appendChild(packageElement);
        });

    }


    removePackageFromConveyorBelt(packageId) {
        console.log('Removing package with id:', packageId);
        this._transport.activeLoadingHall.conveyorBelts.forEach(belt => {
            belt.removePackage(packageId);
        });
    }
}
