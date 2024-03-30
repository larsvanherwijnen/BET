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