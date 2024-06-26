import {getById} from "../modules.js";

export default class TruckView {
    displayGrid(truck, trucksContainer, removePackageCallBack, sendTruckAwayCallback) {
        const truckContainer = document.createElement('div');
        truckContainer.id = truck._id;
        truckContainer.classList.add('inline-block', 'm-4');

        const sendTruckButton = document.createElement('button');
        sendTruckButton.textContent = 'Send Away';
        sendTruckButton.addEventListener('click', () => {
            sendTruckAwayCallback(truck._id); 
        });

        truckContainer.appendChild(sendTruckButton);
    
        const truckGrid = document.createElement('div');
        truckGrid.classList.add('grid', `grid-cols-${truck.width}`, 'gap-0');

        const truckWidth = truck.width;
        const truckLength = truck.length;

        for (let i = 0; i < truckLength; i++) {
            for (let j = 0; j < truckWidth; j++) {
                const cell = document.createElement('div');
                cell.classList.add('w-16', 'h-16', 'border', 'border-black', 'box-border');
                cell.classList.add(truck._filledParts[i][j] ? 'bg-blue-500' : 'bg-red-500');

                cell.addEventListener('dragover', (event) => {
                    event.preventDefault();
                });

                cell.addEventListener('drop', (event) => {
                    event.preventDefault();
                    const data = event.dataTransfer.getData('text/plain');
                    const packageElement = getById(data);
                    if (packageElement) {
                        const packageShape = JSON.parse(packageElement.dataset.shape);
                        if (truck.canPlacePackage(packageShape, i, j)) {
                            this.recolorGrid(truck, truckGrid, packageShape, i, j, truckWidth);
                            removePackageCallBack(packageElement.id);
                        }
                    }
                });

                truckGrid.appendChild(cell);
            }
        }

        truckContainer.appendChild(truckGrid);

        trucksContainer.appendChild(truckContainer);
    }

    recolorGrid(truck, truckGrid, packageShape, startRow, startCol, truckWidth) {
        for (let row = 0; row < packageShape.length; row++) {
            for (let col = 0; col < packageShape[row].length; col++) {
                if (packageShape[row][col] === 1) {
                    const cellIndex = (startRow + row) * truckWidth + (startCol + col);
                    const cell = truckGrid.children[cellIndex];
                    if (cell) {
                        cell.classList.add('bg-blue-500');
                        cell.classList.remove('bg-red-500');
                    }
                }
            }
        }
        truck.fillParts(packageShape, startRow, startCol);
    }
}
