import { useAppSelector } from "../redux/hooks"
import { selectViewport } from "../redux/viewport"
import { VehicleType } from "../utils/Types"
import ChangeVehicle from "./ChangeVehiclePopover"
import Deleting from "./Deleting"
import SaveProject from "./SaveProject"
import NavbarMore from "./NavbarMore"

const Navbar = ({ vehicle }: {vehicle: VehicleType}) => {

    const viewportWidth = useAppSelector(selectViewport).width

    return (
        <div className="fixed top-0 left-0 h-16 bg-purple-900 w-full flex items-center z-10 justify-between md:justify-normal">
            <ChangeVehicle vehicle={vehicle}/>
            {viewportWidth >= 768 ?
            <div className="flex">
                <div className="ml-8 lg:ml-24 flex items-center justify-center">
                    <SaveProject />
                </div>
                <div className="ml-8 lg:ml-24 flex items-center justify-center">
                    <Deleting />
                </div>    
            </div>
            :
            <NavbarMore />
        }
        </div>
    )
}

export default Navbar