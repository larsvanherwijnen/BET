export default class BetTransport {
    set loadingHalls(loadingHalls) {
        this._loadingHalls = loadingHalls;
        this.activeLoadingHall = loadingHalls[0].id;
    }

    get loadingHalls() {
        return this._loadingHalls;
    }

    get conveyorBelts() {
        return this._activeLoadingHall.conveyorBelts;
    }

    get activeLoadingHall() {
        return this._loadingHalls.find(hall => hall.getIsActive() === true);
    }

    set activeLoadingHall(id) {
        const currentActive = this._loadingHalls.find(hall => hall.getIsActive() === true);
        currentActive?.setIsActive(false);

        const newActive = this._loadingHalls.find(hall => hall.id == id);
        newActive.setIsActive(true);

        this._activeLoadingHall = newActive;
    }
}