import { Button, SectionTitle, createElement, clear, getById} from '../modules.js';

export default class LoadingHallSwitcher {

    constructor(loadingHalls, callback, sectionId) {
        this._loadingHalls = loadingHalls;
        this._callbackFunction = callback;
        this._sectionId = sectionId;
        this._wrapperElementId = 'loadingHallSwitcher';
        this.render();
    }
    
    render() {
        clear(this._wrapperElementId);

        const wrapperElement = createElement('div');
        wrapperElement.appendChild(new SectionTitle("Laadhallen"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.id = this._wrapperElementId;

        const loadingHallWrapper = createElement('div');
        loadingHallWrapper.classList = 'grid grid-cols-2 gap-x-2 w-full';

        for (const loadingHall of this._loadingHalls) {
            const hallElement = new Button(loadingHall.getIsActive(), loadingHall.name, loadingHall.id, this._callbackFunction);
            loadingHallWrapper.appendChild(hallElement);
        }

        wrapperElement.appendChild(loadingHallWrapper);

        const targetElement = getById(this._sectionId);
        targetElement.insertBefore(wrapperElement, targetElement.firstChild);
    }
}
