import {ConveyorBelt, ManageConveyorBeltsView} from "../modules.js";

export default class ConveyorBeltController {
    constructor(transport) {
        this._transport = transport;
        this.render();
    }

    render() {
        this.createConveyorBeltsContainer();
        this.renderConveyorBelts();
        this.updateConveyorBeltCount();
    }

    addConveyorBelt() {
        const beltId = this._transport.activeLoadingHall.conveyorBelts.length + 1;
        const newBelt = new ConveyorBelt(beltId, { x: 50 * beltId, y: 100 });
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

    updateConveyorBeltCount() {
        this._manageConveyerBeltsView = new ManageConveyorBeltsView(this.addConveyorBelt.bind(this), this.removeConveyorBelt.bind(this), 'section-left');
        document.getElementById('conveyerBeltsCount').textContent = " NO of Belt" + this._transport.activeLoadingHall.conveyorBelts.length    }

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

        conveyorBelt.docks.forEach((dock, index) => {
            const dockDiv = document.createElement('div');
            dockDiv.classList.add('dock', 'inline-block', 'w-48', 'h-48', 'border', 'border-black', 'm-2', 'bg-gray-300', 'rounded');
            if (dock !== null) {
                dockDiv.classList.add('bg-blue-500'); // Indicate occupied dock
            }

            docksDiv.appendChild(dockDiv);
        });

        container.appendChild(docksDiv);
        container.appendChild(beltDiv);
    }
}
