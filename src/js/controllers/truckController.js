import { Truck, TruckForm, TruckType} from "../modules.js";


export default class TruckController {

    constructor(betTransport) {
        console.log(betTransport);
        this._betTransport = betTransport;

        // this._betTransport.activeLoadingHall.addTruck(new Truck(2, 3, 2, TruckType.COLD));
        // this._betTransport.activeLoadingHall.addTruck(new Truck(6, 3, 3, TruckType.FAST));
        // this._betTransport.loadingHalls[1].addTruck(new Truck(2, 3, 2, TruckType.FRAGILE));
        // this._betTransport.loadingHalls[1].addTruck(new Truck(5, 3, 3, TruckType.PALLET));


        this.render()
    }


    render() {
        new TruckForm(this.createTruck.bind(this))
    }


    createTruck() {
        const width = document.getElementById('width').value;
        const height = document.getElementById('length').value;
        const interval = document.getElementById('arrival_interval').value;
        const type = document.getElementById('truckTypes').value;
        const truckTypesElement = document.getElementById('truckTypes');

        const truck = new Truck(
            width,
            height,
            interval,
            TruckType[type]
        );

        this._betTransport.activeLoadingHall.addTruck(truck);
        this.displayGrid(truck);
        this.render();
    }

    displayGrid(truck) {
        // Get the hall where the grid will be displayed
        const hall = document.getElementById('hall');

        // Create a new div for the truck grid
        const truckGrid = document.createElement('div');
        truckGrid.classList.add('w-1/6', 'h-full', 'overflow-auto', 'mx-auto'); // Removed bg-blue-200 class

        // Create a new div for the grid wrapper and add the background color to it
        const gridWrapper = document.createElement('div');
        gridWrapper.classList.add('bg-blue-200', 'inline-block'); // Added bg-blue-200 and inline-block classes

        // For each row in the grid
        for (let i = 0; i < truck.grid.length; i++) {
            // Create a new div for the row
            const row = document.createElement('div');
            row.classList.add('flex');

            // For each cell in the row
            for (let j = 0; j < truck.grid[i].length; j++) {
                // Create a new div for the cell
                const cell = document.createElement('div');
                cell.classList.add('w-8', 'h-8', 'border', 'border-black', 'box-border');
                cell.draggable = true; // Make the cell draggable

                // Append the cell to the row
                row.appendChild(cell);
            }

            // Append the row to the grid wrapper
            gridWrapper.appendChild(row);
        }

        // Append the grid wrapper to the truck grid
        truckGrid.appendChild(gridWrapper);

        // Append the truck grid to the hall
        hall.appendChild(truckGrid);
    }
}