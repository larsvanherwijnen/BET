import { Button, SectionTitle, createElement, clear, getById} from '../modules.js';

export default class AnimationToggle {
    constructor(callback, animationOn ,sectionId) {
        this._callbackFunction = callback;
        this._sectionId = sectionId;
        this._wrapperElementId = 'animationToggle';
        this.render(animationOn);
    }
    
    render(animationOn) {
        clear(this._wrapperElementId);
        const wrapperElement = createElement('div');
        wrapperElement.appendChild(new SectionTitle("Animatie"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.id = this._wrapperElementId;

        const animationToggleWrapper = createElement('div');
        animationToggleWrapper.classList = 'grid grid-cols-2 gap-x-2 w-full';

        const enableButton = new Button(animationOn, "Aan", "1", this._callbackFunction);
        const disableButton = new Button(!animationOn, "Uit", "0", this._callbackFunction);

        animationToggleWrapper.appendChild(enableButton);
        animationToggleWrapper.appendChild(disableButton);

        wrapperElement.appendChild(animationToggleWrapper);

        const targetElement = getById(this._sectionId);
        targetElement.insertBefore(wrapperElement, targetElement.children[1]);
    }
}
