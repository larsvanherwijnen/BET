// Import Package class
import Package from './package.js';

class ConveyorBelt {
    constructor() {
        this.packages = []; // The packages on the conveyor belt

        // Listen for the DOMContentLoaded event
        document.addEventListener('DOMContentLoaded', () => {
            // Call the method to display packages once the DOM content is loaded
            this.displayPackages();
        });
    }

    // Add a package to the conveyor belt
    addPackage(pkg) {
        this.packages.push(pkg);
        // After adding the package, update the display
        this.displayPackages();
    }

    // Remove a package from the conveyor belt
    removePackage(pkg) {
        const index = this.packages.indexOf(pkg);
        if (index > -1) {
            this.packages.splice(index, 1);
            // After removing the package, update the display
            this.displayPackages();
        }
    }

    // Display the packages on the conveyor belt
    // Display the packages on the conveyor belt
    displayPackages() {
        // Get the "Hall" element where the conveyor belt will be displayed
        let hallElement = document.getElementById('hall');

        // Check if the "Hall" element exists
        if (!hallElement) {
            console.error("Element 'Hall' not found. Please ensure it exists in your HTML.");
            return;
        }

        // Get or create the conveyor belt element within the "Hall" element
        let conveyorBeltElement = hallElement.querySelector('#conveyorBelt');
        if (!conveyorBeltElement) {
            conveyorBeltElement = document.createElement('div');
            conveyorBeltElement.id = 'conveyorBelt';
            hallElement.appendChild(conveyorBeltElement);
        }

        // Clear the conveyor belt element
        conveyorBeltElement.innerHTML = '';

        // For each package on the conveyor belt
        for (const pkg of this.packages) {
            // Create a new div for the package
            const packageElement = document.createElement('div');
            packageElement.classList.add('package', 'w-24', 'h-24', 'bg-blue-500', pkg.info.color); // Added Tailwind CSS classes

            // For each row in the shape
            for (const row of pkg.shape) {
                // Create a new div for the row
                const rowElement = document.createElement('div');
                rowElement.classList.add('row', 'flex'); // Added Tailwind CSS classes

                // For each cell in the row
                for (const cell of row) {
                    // Create a new div for the cell
                    const cellElement = document.createElement('div');
                    cellElement.classList.add('cell', 'w-8', 'h-8', 'border', 'border-black', 'box-border'); // Added Tailwind CSS classes

                    // If the cell is filled, add a 'filled' class
                    if (cell === 1) {
                        cellElement.classList.add('filled', 'bg-black'); // Added Tailwind CSS classes
                    }

                    // Append the cell to the row
                    rowElement.appendChild(cellElement);
                }

                // Append the row to the package
                packageElement.appendChild(rowElement);
            }

            // Append the package to the conveyor belt
            conveyorBeltElement.appendChild(packageElement);
        }
    }
}

export default ConveyorBelt;
