export default class BetTransport {
    constructor() {
        this._loadingHalls = [];
        this._activeLoadingHall = null;
    }

    get loadingHalls() {
        return this._loadingHalls;
    }

    set loadingHalls(loadingHalls) {
        this._loadingHalls = loadingHalls;
    }

    get activeLoadingHall() {
        return this._activeLoadingHall;
    }

    set activeLoadingHall(loadingHall) {
        if (this._activeLoadingHall) {
            this._activeLoadingHall.setIsActive(false);
        }

        this._activeLoadingHall = loadingHall;

        if (this._activeLoadingHall) {
            this._activeLoadingHall.setIsActive(true);
        }
    }
}