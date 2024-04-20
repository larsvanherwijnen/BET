export function createElement(type) {
    return document.createElement(type);
}

export function getById(id) {
    return document.getElementById(id);
}

export function getElementsByClassName(name) {
   return document.getElementsByClassName(name);
}

export function clear(id) {
    const existsCheck = getById(id);
    if (existsCheck) {
        existsCheck.remove();
    }
}

export function show(element) {
    if (element) {
        element.classList.remove("hidden");
    }
}

export function hide(element) {
    if (element) {
        element.classList.add("hidden");
    }
}
