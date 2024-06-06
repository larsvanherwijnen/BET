export default class PackageView {
    constructor(parcel, containerHeight) {
        this.package = parcel;
        this.containerHeight = containerHeight * 0.7; // Height of the container in pixels (70% of the container height)
        this.fixedPackageWidth = 120; // Set a fixed width for all packages (adjust as needed)
    }

    render() {
        const packageElement = document.createElement('div');
        if (this.package == null) {
            return packageElement;
        }
        packageElement.id = this.package.id;
        packageElement.dataset.shape = JSON.stringify(this.package.shape);
        packageElement.classList.add('package', 'flex', 'justify-center', 'items-center', 'bg-transparent');
        packageElement.draggable = true;
        packageElement.style.width = `${this.fixedPackageWidth}px`;

        // Calculate the number of rows and columns in the package shape
        const numRows = this.package.shape.length;
        const numCols = this.package.shape[0].length;

        // Calculate max size of cells to fit in container height
        const cellSize = this.containerHeight / Math.max(numRows, numCols); // Ensure square cells

        // Transpose the shape matrix
        const transposedShape = this.package.shape[0].map((_, i) => this.package.shape.map(row => row[i]));

        transposedShape.forEach(column => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('column', 'flex', 'flex-col', 'justify-center', 'items-center');
            column.forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell', cell ? 'bg-blue-500' : 'bg-transparent');
                cellElement.style.width = `${cellSize}px`;
                cellElement.style.height = `${cellSize}px`;
                cellElement.style.margin = '0.5px';
                columnElement.appendChild(cellElement);
            });
            packageElement.appendChild(columnElement);
        });

        packageElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        });

        return packageElement;
    }
}
