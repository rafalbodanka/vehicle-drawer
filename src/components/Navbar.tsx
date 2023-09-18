import { VehicleType } from "../utils/Types"
import ChangeVehicle from "./ChangeVehiclePopover"
import Deleting from "./Deleting"
import SaveProject from "./SaveProject"

const Navbar = ({ vehicle }: {vehicle: VehicleType}) => {


    return (
        <div className="fixed top-0 left-0 h-16 bg-purple-900 w-full flex items-center">
            <ChangeVehicle vehicle={vehicle}/>
            <div className="ml-24">
                <SaveProject />
            </div>
            <div className="ml-24">
                <Deleting />
            </div>
        </div>
    )
}

export default Navbar