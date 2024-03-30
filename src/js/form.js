import { show, hide } from './helpers.js';

let currentStep = 0;
let steps = document.getElementsByClassName("step");

let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');
let saveBtn = document.getElementById('saveBtn')

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
    document.getElementById("type").value = "cold";
    document.getElementById("radius").value = null;
}

nextBtn.addEventListener('click', function () {
    showStep(currentStep + 1);
});

prevBtn.addEventListener('click', function () {
    showStep(currentStep - 1);
});

saveBtn.addEventListener('click', function () {
    
});