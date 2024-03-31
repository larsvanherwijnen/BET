export default class SectionTitle {
    constructor(textContent) {
        const element = document.createElement('span')
        element.className ="text-3xl font-semibold";
        element.textContent = textContent;

        return element;
    }
}