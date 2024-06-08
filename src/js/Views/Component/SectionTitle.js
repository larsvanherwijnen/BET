export default class SectionTitle {
    constructor(textContent) {
        const element = document.createElement('span')
        element.className ="text-2xl font-semibold";
        element.textContent = textContent;

        return element;
    }
}