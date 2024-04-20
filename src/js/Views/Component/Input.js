export default class Input {
    constructor(type,name, labelText, min, max) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col w-full';

        const input = document.createElement('input');
        input.type = type
        input.name = name;
        input.id = name;
        input.className = 'rounded p-2'

        if(type == 'number') {
            input.min = min;
            input.max = max;
        }


        const label = document.createElement('label');
        label.innerHTML = labelText;
        label.for = name;
        label.className = 'text-md font-semibold'

        const errors =document.createElement('span');
        errors.id = `${name}-errors`;
        errors.className = 'text-red-600'

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(errors);
        
        return wrapper;
    }
}