import { Button } from '../modules.js';

export default class LoadingHallSwitcher {

    constructor(loadingHalls, callback) {
        this._loadingHalls = loadingHalls;
        this._callbackFunction = callback;
        this._wrapperElementId = 'loadingHallSwitcher';
        this.render();
    }
    
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
