import { show, hide} from '../Helpers/ElementVisibilty.js';
import {TruckType} from '../modules.js'
let currentStep = 0;
let steps = document.getElementsByClassName("step");

let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');
let saveBtn = document.getElementById('saveBtn');
let truckTypes = document.getElementById('truckTypes');

showStep(currentStep)


function showStep(stepIndex) {
    steps = Array.from(steps);

    steps.forEach((step, index) => {
        if (index === stepIndex) {
            show(step)
        } else {
            hide(step)
        }
    });

    currentStep = stepIndex;
    updateButtonVisibility();
}

function updateButtonVisibility() {
    if (currentStep === 0) {
        hide(prevBtn);
    } else {
        show(prevBtn);
    }

    if (currentStep === steps.length - 1) {
        hide(nextBtn);
        show(saveBtn);
    } else {
        show(nextBtn);
        hide(saveBtn);
    }
}

function resetForm() {
    currentStep = 0;
    document.getElementById("length").value = null;
    document.getElementById("width").value = null;
    document.getElementById("arrival_interval").value = null;
    showStep(currentStep)
}

nextBtn.addEventListener('click', function () {
    showStep(currentStep + 1);
});

prevBtn.addEventListener('click', function () {
    showStep(currentStep - 1);
});


export default class TruckForm {
    constructor(callback) {
        saveBtn.addEventListener('click', function() {
            callback();
            resetForm()
        })

        Object.values(TruckType).map((lang, i) => {
            let opt = document.createElement("option");
            opt.value = i; 
            opt.innerHTML = lang;
            truckTypes.append(opt);
        });
    }
}

