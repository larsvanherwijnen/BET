import {PackageShape, Package, TruckView, ConveyorBelt, ManageConveyorBeltsView, Truck, TruckType} from "../modules.js";
import PackageView from "../Views/PackageView.js";

export default class ConveyorBeltController {
    constructor(transport) {
        this._transport = transport;

        const originalLoadingHall = this._transport.activeLoadingHall;
        this._transport.activeLoadingHall = this._transport.loadingHalls[0].id;
        this.addConveyorBelt();
        this._transport.activeLoadingHall = this._transport.loadingHalls[1].id;
        this.addConveyorBelt();
        this._transport.activeLoadingHall = originalLoadingHall.id;
        new ManageConveyorBeltsView(this.addConveyorBelt.bind(this), this.removeConveyorBelt.bind(this), 'section-left');

        this.shapes = new PackageShape();
        this.generatePackages();
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
        let container = document.getElementById('conveyorBeltsContainer');
        const loadingHall = document.getElementById('loadingHall');
        if (!container) {
            container = document.createElement('div');
            container.id = 'conveyorBeltsContainer';
            loadingHall.appendChild(container);
        }
    }

    removeConveyorBelt() {
        this._transport.activeLoadingHall.conveyorBelts.pop();
        this.render();
    }

    renderConveyorBelts() {
        const container = document.getElementById('conveyorBeltsContainer');
        container.innerHTML = ''; // Clear existing content

        const conveyorBelts = this._transport.activeLoadingHall.conveyorBelts;
        conveyorBelts.forEach(belt => {
            this.renderConveyorBelt(container, belt);
        });

    }

    renderConveyorBelt(container, conveyorBelt) {
        const beltDiv = document.createElement('div');
        beltDiv.classList.add('conveyor-belt', 'relative', 'bg-gray-600', 'my-4', 'p-2', 'rounded', 'flex', 'flex-wrap', 'justify-between'); // Add 'flex', 'flex-wrap', 'justify-between'
        beltDiv.style.height = '150px';

        const docksDiv = document.createElement('div');
        docksDiv.classList.add('docks', 'flex', 'justify-between', 'mb-2');
        container.appendChild(docksDiv);
        container.appendChild(beltDiv);


        const truckView = new TruckView();

        conveyorBelt.docks.forEach((dock, index) => {
            const dockDiv = document.createElement('div');
            dockDiv.classList.add('dock', 'flex-grow', 'm-2', 'rounded', 'h-48');
            dockDiv.style.flexBasis = '0';
            if (dock !== null) {
                // Display the truck in the dock
                truckView.displayGrid(dock, dockDiv);
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

    generatePackages() {
        const shapeKeys = Object.keys(this.shapes);
        for (let i = 0; i < 10; i++) {
            const randomShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            const randomShape = this.shapes[randomShapeKey];
            const parcel = new Package(`package${i}`, randomShape);
            this._transport.conveyorBelts[0].addPackage(parcel);
        }
    }
}
