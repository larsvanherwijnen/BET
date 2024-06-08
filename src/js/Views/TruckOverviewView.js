import { TruckInfo, createElement, clear, getById, SectionTitle } from '../modules.js';

export default class TruckOverviewView {

    constructor(callback, trucks, sectionId) {
        this._trucks = trucks;
        this._callback = callback;
        this._sectionId = sectionId;
        this._wrapperElementId = 'existingTrucks';
        this.render()
    }

    /**
     * Renders the LoadingHallSwitcher component.
     */
    render() {
        clear(this._wrapperElementId);
        const targetElement = getById(this._sectionId);
    
        const wrapperElement = createElement('div');
        wrapperElement.appendChild(new SectionTitle("Vrachtwagens"))
        wrapperElement.className = 'space-y-2'
        wrapperElement.id = this._wrapperElementId;
    
        this._trucks.forEach((truck, index) => {
            const truckOverviewView = new TruckInfo(this._callback.bind(this), truck, index);
            wrapperElement.appendChild(truckOverviewView);
        });
    

        targetElement.insertBefore(wrapperElement, targetElement.children[2]);
    }
}
