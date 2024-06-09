export default class TruckInfo {
    constructor(callBack, truck, index) {
        const container = document.createElement('div');
        container.className = 'bg-gray-400 rounded p-2 flex justify-between items-center';

        const innerDiv = document.createElement('div');
        innerDiv.className = 'space-x-1'

        const sizeSpan = document.createElement('span');
        sizeSpan.id = 'size';
        sizeSpan.textContent = `Maat: ${truck.length} x ${truck.width}`;
        innerDiv.appendChild(sizeSpan);

        const arrivalSpan = document.createElement('span');
        arrivalSpan.id = 'arrival_int';
        arrivalSpan.textContent = `Aankomst interval: ${truck.arrivalInterval}s`;
        innerDiv.appendChild(arrivalSpan);

        const truckSpan = document.createElement('span');
        truckSpan.id = 'truck_type';
        truckSpan.textContent = `Type: ${truck.type}`;
        innerDiv.appendChild(truckSpan);

        container.appendChild(innerDiv);

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-xmark';
        icon.addEventListener('click', e => {
            callBack(index);        
        });
        container.appendChild(icon);
      

        return container;
    }
}
