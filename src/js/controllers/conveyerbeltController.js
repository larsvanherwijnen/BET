import {TruckView, ConveyorBelt, ManageConveyorBeltsView, Truck, TruckType} from "../modules.js";

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
        beltDiv.classList.add('conveyor-belt', 'relative', 'bg-gray-600', 'my-4', 'p-12', 'rounded');

        const docksDiv = document.createElement('div');
        docksDiv.classList.add('docks', 'flex', 'justify-between', 'mb-2');


        const truckView = new TruckView();

        conveyorBelt.docks.forEach((dock, index) => {
            const dockDiv = document.createElement('div');
            dockDiv.classList.add('dock', 'flex-grow', 'm-2', 'rounded', 'h-64');
            dockDiv.style.flexBasis = '0'; // Add this line
            if (dock !== null) {
                // Display the truck in the dock
                truckView.displayGrid(dock, dockDiv);
            }

            docksDiv.appendChild(dockDiv);
        });

        container.appendChild(docksDiv);
        container.appendChild(beltDiv);
    }
}
