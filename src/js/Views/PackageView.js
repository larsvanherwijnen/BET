export default class PackageView {
    constructor(parcel, containerHeight) {
        this.package = parcel;
        this.containerHeight = containerHeight * 0.7; // Height of the container in pixels (70% of the container height)
        this.fixedPackageWidth = 120; // Set a fixed width for all packages (adjust as needed)
    }

    render() {
        const packageElement = this.createPackageElement();
        if (!this.package) return packageElement;

        this.setPackageProperties(packageElement);
        this.createPackageShape(packageElement);

        packageElement.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', e.target.id));

        return packageElement;
    }

    setPackageProperties(packageElement) {
        packageElement.id = this.package.id;
        packageElement.dataset.shape = JSON.stringify(this.package.shape);
        packageElement.classList.add('package', 'flex', 'justify-center', 'items-center', 'bg-transparent');
        packageElement.draggable = true;
        packageElement.style.width = `${this.fixedPackageWidth}px`;
    }

    createPackageShape(packageElement) {
        const cellSize = this.calculateCellSize();
        const transposedShape = this.transposeShape();

        transposedShape.forEach(column => {
            const columnElement = this.createColumnElement();
            column.forEach(cell => columnElement.appendChild(this.createCellElement(cell, cellSize)));
            packageElement.appendChild(columnElement);
        });
    }

    calculateCellSize() {
        const numRows = this.package.shape.length;
        const numCols = this.package.shape[0].length;
        return this.containerHeight / Math.max(numRows, numCols);
    }

    transposeShape() {
        return this.package.shape[0].map((_, i) => this.package.shape.map(row => row[i]));
    }

    createColumnElement() {
        const columnElement = document.createElement('div');
        columnElement.classList.add('column', 'flex', 'flex-col', 'justify-center', 'items-center');
        return columnElement;
    }

    createCellElement(cell, cellSize) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell', cell ? 'bg-blue-500' : 'bg-transparent');
        cellElement.style.width = `${cellSize}px`;
        cellElement.style.height = `${cellSize}px`;
        cellElement.style.margin = '0.5px';
        return cellElement;
    }

    createPackageElement() {
        return document.createElement('div');
    }
}