import { Button } from "../modules.js";

export default class ManageConveyerBeltsView {
    constructor(addConveyerbeltCallback, removeConveyerbeltCallback) {
        this._addConveyerbeltCallback = addConveyerbeltCallback;
        this._removeConveyerbeltCallback = removeConveyerbeltCallback;
        this._wrapperElementId = 'conveyerBelts';
        this.render();
    }

    render() {
        const wrapperElement = document.getElementById(this._wrapperElementId)

        if(wrapperElement) {
            wrapperElement.innerHTML = '';
        }

        const addBelt = new Button(true, "Toevoegen", 1, this._addConveyerbeltCallback);

        const removeBelt = new Button(true, "Verwijderen", 2, this._removeConveyerbeltCallback);


        wrapperElement.appendChild(addBelt)  
        wrapperElement.appendChild(removeBelt)     
   
    }



}