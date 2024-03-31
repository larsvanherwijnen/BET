export default class TextInput {
    /**
     * @param { string } name
     * @param { string } labelText
     * @returns { HTMLInputElement }
     */
    constructor(name, labelText, callback) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col';

        const input = document.createElement('input');
        input.name = name;
        input.id = name;
        input.className = 'rounded p-2'

        const label = document.createElement('label');
        label.innerHTML = labelText;
        label.for = name;
        label.className = 'text-md font-semibold'

        const errors =document.createElement('span');
        errors.id = `${name}-errors`;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(errors);
        
        return wrapper;
    }
}