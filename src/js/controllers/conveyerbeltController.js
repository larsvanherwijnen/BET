import { ManageConveyerBeltsView, ConveyerBelt } from "../modules.js";

export default class ConveyerbeltController {
    constructor(transport) {
        this._transport = transport;
        this.render()
    }

    render() {
        this._manageConveyerBeltsView = new ManageConveyerBeltsView(this.addConveyerbelt.bind(this), this.removeConveyerbelt.bind(this)); 
        document.getElementById('conveyerBeltsCount').textContent = " NO of Belt" + this._transport.activeLoadingHall.conveyorBelts.length
    }

    addConveyerbelt() {
        this._transport.activeLoadingHall.conveyorBelts.push(new ConveyerBelt)
        this.render()
    }

    removeConveyerbelt() {
        this._transport.activeLoadingHall.conveyorBelts.pop()
        this.render()
    }


    
}