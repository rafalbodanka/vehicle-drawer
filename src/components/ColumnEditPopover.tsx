import { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { selectVehicle, deleteColumn, resetColumn, addCorridor, addRow, deleteRow } from "../redux/vehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const ColumnEditPopover = ({ wagonIndex, columnIndex }: {wagonIndex: number; columnIndex: number}) => {
	const [isDeleteActive, setIsDeleteActive] = useState(false)
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
	const handleDeleteColumn = (columnIndex: number) => {
		if (columnIndex === 0 && vehicle.wagons[wagonIndex].columns.length <= 1) return
		dispatch(deleteColumn({ wagonIndex, columnIndex }));
		handleClose();
	}

	const handleResetColumn = (columnIndex: number) => {
		dispatch(resetColumn({ wagonIndex, columnIndex }))
		handleClose();
	}

	const handleAddCorridor = () => {
		const maxCorridors = vehicle.wagons[wagonIndex].columns[columnIndex].sits.length
		console.log(vehicle.wagons[wagonIndex].corridors)
		const firstPossibleCorridor = (range: number, corridors: number[]) => {
			for (let i=0; i <= range; i++) {
				if (!corridors.includes(i)) return i
				if (i === range) console.log('brak miejsca')
			}
		}
		const corridorIndex = firstPossibleCorridor(maxCorridors, vehicle.wagons[wagonIndex].corridors)
		if (corridorIndex !== undefined && corridorIndex !== null) dispatch(addCorridor({wagonIndex, corridorIndex}))
	}

	const handleAddRow = () => {
		dispatch(addRow({wagonIndex}))
	}

    return (
			<ThemeProvider theme={theme}>
        <div className="flex justify-center">
            <Button aria-describedby={id} variant="contained" className="h-6 w-10" onClick={handleClick} fullWidth={false} color="primary">
                <MoreHorizIcon />
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
				<ListItem disablePadding onClick={handleAddRow}>
					<ListItemButton>
						<ListItemIcon>
							<PlaylistAddIcon />
						</ListItemIcon>
						<ListItemText primary="Add row" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding onClick={handleAddCorridor}>
					<ListItemButton>
						<ListItemIcon>
							<AddRoadIcon/>
						</ListItemIcon>
						<ListItemText primary="Add corridor" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding onClick={() => handleResetColumn(columnIndex)}>
					<ListItemButton>
						<ListItemIcon>
							<RestartAltIcon />
						</ListItemIcon>
						<ListItemText primary="Reset row" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding onClick={() => handleDeleteColumn(columnIndex)}>
					<ListItemButton>
						<ListItemIcon>
							<LayersClearIcon />
						</ListItemIcon>
						<ListItemText primary="Delete column"/>
					</ListItemButton>
				</ListItem>
			</List>
            </Popover>
        </div>
			</ThemeProvider>
    )
}

export default ColumnEditPopover