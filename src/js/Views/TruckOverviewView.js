import { TruckInfo } from '../modules.js';

export default class TruckOverviewView {

    constructor(callback, trucks) {
        this._trucks = trucks;
        this._callback = callback
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
        
        for (const truck of this._trucks) {
            const truckOverviewView = new TruckInfo(this._callback.bind(this), truck)
            wrapperElement.appendChild(truckOverviewView);
        }
    }
}
