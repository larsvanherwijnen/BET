import { Button } from '../modules.js';

export default class TruckOverviewView {

    constructor(loadingHalls) {
        this._loadingHalls = loadingHalls;

        this._wrapperElementId = 'existingTrucks';
        this.render();
    }

    /**
     * Renders the LoadingHallSwitcher component.
     */
    render() {
        const wrapperElement = document.getElementById(this._wrapperElementId)

        if(wrapperElement) {
            wrapperElement.innerHTML = '';
        }
        

        for (const loadingHall of this._loadingHalls) {
            const buttonElement = new Button(loadingHall.getIsActive(), loadingHall.name, loadingHall.id, this._callbackFunction);
            wrapperElement.appendChild(buttonElement);
        }
    }
}
