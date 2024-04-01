export default class TruckInfo {
    /**
     * @param { boolean } isActive
     * @param { string } textContent
     * @param { string } id
     * @param { Function } callBack
     * @returns { HTMLElement }
     */
    constructor(isActive, textContent, id, callBack) {
        const container = document.createElement('div');
        container.className = 'bg-gray-400 rounded p-2 flex justify-between items-center';

        const innerDiv = document.createElement('div');

        const sizeSpan = document.createElement('span');
        sizeSpan.id = 'size';
        sizeSpan.textContent = 'Maat: 6 x 3';
        innerDiv.appendChild(sizeSpan);

        const arrivalSpan = document.createElement('span');
        arrivalSpan.id = 'arrival_int';
        arrivalSpan.textContent = 'Aankomst interval: 3s';
        innerDiv.appendChild(arrivalSpan);

        const truckSpan = document.createElement('span');
        truckSpan.id = 'truck_type';
        truckSpan.textContent = 'Type: Snelkoerier';
        innerDiv.appendChild(truckSpan);

        container.appendChild(innerDiv);

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-xmark';
        container.appendChild(icon);

        // Create and configure button element
        const button = document.createElement('button');
        button.className = 'w-full border border-2 border-slate-700 rounded-2xl p-2 mt-2';
        button.textContent = textContent;
        button.id = id;
        button.addEventListener('click', e => {
            const buttonId = e.target.id;
            callBack(buttonId);
        });

        if (isActive) {
            button.classList.add('bg-slate-700', 'text-white');
        }

        // Append button to container
        container.appendChild(button);

        return container;
    }
}
