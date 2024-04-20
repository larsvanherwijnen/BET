import { Button, SectionTitle, clear, createElement, getById } from "../modules.js";

export default class ManageConveyerBeltsView {
    constructor(addConveyerbeltCallback, removeConveyerbeltCallback, sectionId) {
        this._addConveyerbeltCallback = addConveyerbeltCallback;
        this._removeConveyerbeltCallback = removeConveyerbeltCallback;
        this._wrapperElementId = 'conveyerBelts';
        this._sectionId = sectionId;
        this.render();
    }

    render() {
        clear(this._wrapperElementId)
        const targetElement = getById(this._sectionId);

        const wrapperElement = createElement('div')
        wrapperElement.id = this._wrapperElementId;
        wrapperElement.className = 'flex flex-col'
        wrapperElement.appendChild(new SectionTitle("Lopende banden"))

        const buttonSection = createElement('div');
        buttonSection.className = 'grid grid-cols-2 gap-4 mt-3';

        const addBelt = new Button(true, "Toevoegen", 1, this._addConveyerbeltCallback);

        const removeBelt = new Button(true, "Verwijderen", 2, this._removeConveyerbeltCallback);


        buttonSection.appendChild(addBelt);  
        buttonSection.appendChild(removeBelt);  
        
        wrapperElement.appendChild(buttonSection);

        targetElement.insertBefore(wrapperElement, targetElement.children[3]);
    }



}