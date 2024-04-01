class Package {
    static PackageShape = {
        O: {shape: [[1, 1], [1, 1]], info: {name: 'o', color: 'pink'}},
        I: {shape: [[1], [1], [1], [1]], info: {name: 'i', color: 'yellow'}},
        T: {shape: [[1, 1, 1], [0, 1, 0]], info: {name: 't', color: 'green'}}
    };

    constructor(shapeName) {
        if (!Package.PackageShape[shapeName]) {
            throw new Error(`Invalid shape name: ${shapeName}`);
        }

        this.shape = Package.PackageShape[shapeName].shape; // The shape of the package
        this.info = Package.PackageShape[shapeName].info; // Additional info about the package
    }
}
export default Package;