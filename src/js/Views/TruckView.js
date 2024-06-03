export default class TruckView {
    displayGrid(truck, trucksContainer) {
        // Create a new div for the truck container
        const truckContainer = document.createElement('div');
        truckContainer.classList.add('inline-block', 'm-4');

        // Create a new div for the truck grid
        const truckGrid = document.createElement('div');
        truckGrid.classList.add(`grid`, `grid-cols-${truck.width}`, 'gap-0');

        // Use the get width() and get length() methods from the Truck class
        const truckWidth = truck.width;
        const truckLength = truck.length;

        // Create the grid based on the truck's width and length
        for (let i = 0; i < truckLength; i++) {
            for (let j = 0; j < truckWidth; j++) {
                const cell = document.createElement('div');
                cell.classList.add('w-20', 'h-20', 'border', 'border-black', 'box-border', 'bg-red-500');

                // If the cell is filled, add a 'filled' class
                // if (truck.grid[i][j] === 1) {
                //     cell.classList.add('filled', 'bg-black-500');
                // }
                //
                // Make the cell droppable
                // cell.ondragover = this.allowDrop;
                // cell.ondrop = (event) => this.drop(event, i, j, truck);

                // Append the cell to the truck grid
                truckGrid.appendChild(cell);
            }
        }

        // Append the truck grid to the truck container
        truckContainer.appendChild(truckGrid);

        // Append the truck container to the trucks container
        trucksContainer.appendChild(truckContainer);
    }
}