import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addColumn, deleteColumn, selectVehicle } from "../redux/vehicle";
import { WagonType } from "../utils/Types";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

type EditWagonProps = {
    wagon: WagonType;
    wagonIndex: number;
    setDisplayedLength: React.Dispatch<React.SetStateAction<number>>;
}

const EditWagon = ({ wagon, wagonIndex, setDisplayedLength }: EditWagonProps) => {

    const theme = createTheme({
		palette: {
			primary: {
				main: "#311b92"
			},
		},
	});

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

	const open = Boolean(anchorEl);
	const id = open ? 'column-edit-popover' : undefined;

    const vehicle = useAppSelector(selectVehicle)
	const dispatch = useAppDispatch()
	const incrementWagonColumns = (wagonIndex: number) => {
		setDisplayedLength(prevLength => prevLength + 1)
		dispatch(addColumn(wagonIndex))
	};

	const decrementDisplayedLength = (wagonIndex: number) => {
		const columnIndex = wagon.columns.length - 1
		if (columnIndex === 0) return
		setDisplayedLength(prevLength => prevLength - 1)
		dispatch(deleteColumn({ wagonIndex, columnIndex }));
	};

    return (
        <ThemeProvider theme={theme}>
        <div className="flex justify-center absolute">
            <Button aria-describedby={id} variant="contained" className="h-8" onClick={handleClick} fullWidth={false} color="primary">
                <span>Wagon - {wagonIndex}</span>
                {open ? 
                <ExpandLessIcon />
                :
                <ExpandMoreIcon/>
                }
            </Button>
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
				}}
            >
				<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => incrementWagonColumns(wagonIndex)}>
						<ListItemIcon>
                            <AddIcon/>
						</ListItemIcon>
						<ListItemText primary="Add column" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<KeyboardDoubleArrowLeftIcon />
						</ListItemIcon>
						<ListItemText primary="Move wagon left" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<KeyboardDoubleArrowRightIcon />
						</ListItemIcon>
						<ListItemText primary="Move wagon right" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText primary="Remove wagon"/>
					</ListItemButton>
				</ListItem>
			</List>
            </Popover>
        </div>
			</ThemeProvider>
        
    )
}

export default EditWagon

{/* <div className="absolute text-xl">
        <span>
            Wagon {wagonIndex}
        </span>
        <div>
            <span> 
                Length:
            </span>
            <span>
                &nbsp;
                {vehicle.wagons[wagonIndex].columns.length}
            </span>
        </div>
        <div className="flex justify-end gap-4 pt-2">
            <button
            className="bg-purple-900 rounded-full h-6 w-6"
            onClick={() => decrementDisplayedLength(wagonIndex)}
            >-</button>
            <button
            className="bg-purple-900 rounded-full h-6 w-6"
            onClick={() => incrementWagonColumns(wagonIndex)}
            >+</button>
        </div>
    </div> */}