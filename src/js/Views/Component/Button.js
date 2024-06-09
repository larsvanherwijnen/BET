export default class Button {
    constructor(isActive, textContent, id, callBack) {
        const element = document.createElement('button');
        element.className = 'w-full border border-2 border-slate-700 rounded-2xl p-2 mt-2';
        element.textContent = textContent;
        element.type = 'button'
        element.id = id;
        element.addEventListener('click', e => {
            const buttonId = e.target.id;
            callBack(buttonId);        
        });

        if (isActive) {
            element.classList.add('bg-slate-700', 'text-white');
        }

        return element;
    }
}
