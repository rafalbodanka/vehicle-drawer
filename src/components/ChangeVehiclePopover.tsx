import { VehicleType } from "../utils/Types"
import Popover from "@mui/material/Popover"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react"
import { resetVehicle, setVehicleType } from "../redux/vehicle"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectProject, setIsChooseVehicleModalOpen, setIsStarterModalOpen, setIsVehicleSet } from "../redux/project"
import DeleteProject from "./DeleteProject"
import train from "../img/train.png"
import bus from "../img/bus.png"
import plane from "../img/plane.png"

const ChangeVehicle = ({ vehicle }: {vehicle: VehicleType}) => {

    const vehicleImages = {
        Train: train,
        Bus: bus,
        Plane: plane,
    };

    const projectTitle = useAppSelector(selectProject).title

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'column-edit-popover' : undefined;

    const vehicleTypes = ['Train', 'Bus', 'Plane']

    const dispatch = useAppDispatch()

    const handleVehicleTypeChange = (newVehicleType: string) => {
        dispatch(setVehicleType(newVehicleType))
    }

    const handleStartNewProject = () => {
        dispatch(setIsStarterModalOpen(true))
        dispatch(setIsChooseVehicleModalOpen(false))
        dispatch(setIsVehicleSet(false))
        dispatch(resetVehicle())
    }

    return (
        <div className="flex items-center">
            <button className="flex items-center" onClick={handleClick}>
                <img
                alt={vehicle.type}
                src={vehicleImages[vehicle.type as keyof typeof vehicleImages]}
                className="max-h-12 pl-4"></img>
                <span className="text-center text-lg ml-4 font-bold text-ellipsis break-words overflow-hidden line-clamp-2">{projectTitle ? projectTitle : vehicle.type}</span>
            </button>
            <Popover                
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}>
                <List>
                    {vehicleTypes.filter(vehicleType => {
                        if (vehicleType !== vehicle.type) return vehicleType
                    }).map(vehicleType => {
                        return (
                            <ListItem key={vehicleType} disablePadding
                            onClick={() => handleVehicleTypeChange(vehicleType)}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <img
                                        alt={vehicle.type}
                                        src={vehicleImages[vehicleType as keyof typeof vehicleImages]}
                                        className="max-h-8 invert"
                                        ></img>
                                    </ListItemIcon>
                                    <ListItemText primary={vehicleType} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                    <ListItem disablePadding onClick={handleStartNewProject}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="New project" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <DeleteProject />
                    </ListItem>
                </List>
            </Popover>
        </div>
    )
}

export default ChangeVehicle