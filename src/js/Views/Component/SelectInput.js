export default class SelectInput {
    constructor(name, labelText, options, defaultSelected) {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col w-full';

        const select = document.createElement('select');
        select.name = name;
        select.id = name;
        select.className = 'w-full rounded p-2';

        Object.entries(options).forEach(([key, value]) => {
            const option = document.createElement('option');
            option.value = key;
            option.text = value;
            if (defaultSelected === value) option.selected = true;
            select.appendChild(option);
        });

        const label = document.createElement('label');
        label.innerHTML = labelText;
        label.htmlFor = name;
        label.className = 'text-md font-semibold';

        const errors = document.createElement('span');
        errors.id = `${name}-errors`;
        errors.className = 'text-red-600'

        wrapper.appendChild(label);
        wrapper.appendChild(select);
        wrapper.appendChild(errors);

        return wrapper;
    }
}
