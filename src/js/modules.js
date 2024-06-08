/**
 * Manages the applications' module imports
 */

// Controllers
import MainController from "./controllers/MainController.js"
import LoadingHallController from "./Controllers/LoadingHallController.js"
import TruckController from "./Controllers/TruckController.js"
import ConveyorBeltController from "./Controllers/ConveyerbeltController.js"

// Models
import BetTransport from "./Models/BetTransport.js"
import LoadingHall from "./Models/LoadingHall.js"
import Truck from "./models/truck.js"
import TruckForm from "./Views/TruckCreateFormView.js"
import TruckType from "./Enums/TruckTypes.js"
import ConveyorBelt from "./models/ConveyorBelt.js"
import Package from "./models/Package.js";
import PackageShape from "./models/PackageShape.js";

//Views
import LoadingHallSwitcher from "./Views/LoadingHallSwitcherView.js"
import LocationInputView from "./Views/LocationInputView.js"
import TruckOverviewView from "./Views/TruckOverviewView.js"
import ManageConveyorBeltsView from "./Views/ManageConveyerBeltsView.js"
import AnimationToggle from "./Views/AnimationToggle.js"
//Components
import Button from "./Views/Component/Button.js"
import Input from "./Views/Component/Input.js"
import SelectInput from "./Views/Component/SelectInput.js"
import SectionTitle from "./Views/Component/SectionTitle.js"
import TruckInfo from "./Views/Component/TruckInfo.js"
import TruckView from "./Views/TruckView.js"
import PackageView from "./Views/PackageView.js"

//API
import WeatherApi from "./Services/weather.js"

//Utils
import { createElement, clear, getById, show, hide, getElementsByClassName } from "./Utils/DomUtil.js"

export {
    MainController,
    LoadingHallController,
    TruckController,
    ConveyorBeltController,

    LoadingHall,
    BetTransport,
    Truck,
    TruckForm,
    ConveyorBelt,
    Package,
    PackageShape,

    LoadingHallSwitcher,
    LocationInputView,
    TruckOverviewView,
    ManageConveyorBeltsView,
    AnimationToggle,

    Button,
    Input,
    SectionTitle,
    SelectInput,
    TruckInfo,
    TruckView,
    PackageView,

    WeatherApi,

    TruckType,

    createElement,
    getElementsByClassName,
    clear,
    getById,
    show,
    hide
}