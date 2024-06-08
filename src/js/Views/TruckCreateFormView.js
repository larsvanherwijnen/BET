
import { Button, Input, SectionTitle, SelectInput, TruckType, clear, createElement, getById, getElementsByClassName, hide, show } from '../modules.js'

export default class TruckForm {
    constructor(callback, sectionId) {
        this._wrapperElementId = 'truckFrom'
        this._sectionId = sectionId
        this._currentStep = 0;
        this._callback = callback;
        this._steps = null

        this._fields = [
            {
                'width': { 'type': 'number', 'min': 2, 'max': 6, 'label': 'Breedte' },
                'length': { 'type': 'number', 'min': 2, 'max': 3, 'label': 'Lengte' },
            },
            {
                'truckType': { 'type': 'select', 'options': TruckType, 'default': TruckType.General ,'label': 'Type' },
            },
            {
                'interval': { 'type': 'number', 'min': 1, 'max': 10, 'label': 'Interval' }
            }
        ];

        this.render();
    }

    render() {
        clear(this._wrapperElementId)
        const targetElement = getById(this._sectionId);

        const wrapperElement = createElement('div')
        wrapperElement.appendChild(new SectionTitle("Vrachtwagen toevoegen"))
        wrapperElement.id = this._wrapperElementId;

        const form = createElement('form');
        let iteration = 0;
        this._fields.forEach(element => {
            let input = this.renderStep(element)
            form.appendChild(input);
            if (iteration !== 0) {
                hide(input)
            }
            iteration++;
        });


        const buttonSection = createElement('div');
        buttonSection.className = 'flex justify-between';

        this._prevBtn = new Button(true, "Vorige", "prevBtn", () => this.showStep(this._currentStep - 1));
        this._nextBtn = new Button(true, "Volgende", "nextBtn", () => this.validateAndNextStep(this._currentStep));
        this._saveBtn = new Button(true, "Opslaan", "saveBtn", () => this.validateAndSave(this._currentStep));


        buttonSection.appendChild(this._prevBtn)
        buttonSection.appendChild(this._nextBtn)
        buttonSection.appendChild(this._saveBtn)

        form.appendChild(buttonSection)

        wrapperElement.appendChild(form)

        targetElement.insertBefore(wrapperElement, targetElement.children[2]);

        this._steps = getElementsByClassName('step')

        this.updateButtonVisibility()
    }


    renderStep(fields) {
        const step = createElement('div')
        step.className = 'flex space-x-2 w-full step'
        for (const fieldName in fields) {
            const field = fields[fieldName];
            switch (field.type) {
                case 'number':
                    step.appendChild(new Input(field.type, fieldName, field.label, field.min, field.max))
                    break;
                case 'select':
                    step.appendChild(new SelectInput(fieldName, field.label, field.options, field.default))
                    break;
            }
        }

        return step;
    }

    showStep(stepIndex) {
        let steps = Array.from(this._steps);
        if (stepIndex < 0 || stepIndex > steps.length) return;


        steps.forEach((step, index) => {
            if (index === stepIndex) {
                show(step)
            } else {
                hide(step)
            }
        });

        this._currentStep = stepIndex;
        this.updateButtonVisibility();
    }

    resetForm() {
        this._currentStep = 0;

        this._fields.forEach(element => {
            for (const fieldName in element) {
                getById(fieldName).value = null
            }
        });

        this.showStep(this._currentStep);
    }

    updateButtonVisibility() {
        if (this._currentStep === 0) {
            hide(this._prevBtn);
        } else {
            show(this._prevBtn);
        }

        if (this._currentStep === this._steps.length - 1) {
            hide(this._nextBtn);
            show(this._saveBtn);
        } else {
            show(this._nextBtn);
            hide(this._saveBtn);
        }
    }

    validateAndNextStep(step) {
        if (this.validateStep(step) != true) return;
        this.showStep(step + 1);
    }

    validateAndSave(step) {
        if (this.validateStep(step) != true) return;
        this._callback();
        this.resetForm();
    }


    validateStep(step) {
        let fieldsInStep = this._fields[step]
        let isValid = true

        for (const fieldName in fieldsInStep) {
            const field = fieldsInStep[fieldName];
            switch (field.type) {
                case 'number':
                    if (getById(fieldName).value == '') {
                        getById(`${fieldName}-errors`).textContent = `De ${field.label} mag niet leeg zijn.`;
                        isValid = false; 
                    } else if (getById(fieldName).value < field.min) {
                        getById(`${fieldName}-errors`).textContent = `De waarde van ${field.label} moet minimaal ${field.min} zijn`;
                        isValid = false; 
                    } else if (getById(fieldName).value > field.max) {
                        getById(`${fieldName}-errors`).textContent = `De waarde van ${field.label} mag maximaal ${field.max} zijn`;
                        isValid = false;
                    }
                    break;
                case 'select':
                    if (getById(fieldName).value == '') {
                        getById(`${fieldName}-errors`).textContent = `${field.label} mag niet leeg zijn.`
                        isValid = false;
                    }
                    break;
            }
        }
        return isValid;

    }

}