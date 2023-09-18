import { useState } from "react"
import { SitType } from "../utils/Types"
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ClearIcon from '@mui/icons-material/Clear';
import Popover from '@mui/material/Popover'
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectDeleting } from "../redux/deleting";
import { setSitType, switchSitDirection } from "../redux/vehicle";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';

type SitProps = {
    sit: SitType
	wagonIndex: number;
	columnIndex: number;
	rowIndex: number;
}

const Sit = ({ sit, wagonIndex, columnIndex, rowIndex }: SitProps) => {

	const {deletingColumn, deletingRow}  = useAppSelector(selectDeleting)

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	  if (!deletingColumn && !deletingRow) setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

	const dispatch = useAppDispatch()

    const open = Boolean(anchorEl);
    const id = open ? 'sit-type-popover' : undefined;

	const sitTypes = ['person', 'bike', 'empty', 'table', '']
	const pickSitType = (newType: string) => {
		dispatch(setSitType({ wagonIndex, columnIndex, rowIndex, newType}))
	}
	
	const handleChangeSitDirection = ( opposite: boolean ) => {
		dispatch(switchSitDirection({wagonIndex, columnIndex, rowIndex, opposite }))
	}
	return (
		<div className="sit w-full h-full" data-row={rowIndex} data-column={columnIndex} data-wagon={wagonIndex}>
			<div className="h-20 flex justify-center items-center">
				<button onClick={handleClick}>
					<div className="cursor-pointer p-2">
						{sit.type === 'person' ?
							<AirlineSeatReclineExtraIcon className={`${sit.opposite && 'transform: scale-x-[-1]'}`}/>
						: sit.type === 'bike' ?
							<PedalBikeIcon />
							: sit.type === 'table' ?
							<TableRestaurantIcon/>
							: sit.type === 'empty' ?
							<SpaceBarIcon />
							:
							<AddCircleIcon />
						}
					</div>
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
					}}
				>
					<List>
						{sit.type === "person" && 
						<ListItem disablePadding onClick={() => handleChangeSitDirection(!sit.opposite)}>
							<ListItemButton>
								<ListItemIcon>
									<AirlineSeatReclineExtraIcon className={`${!sit.opposite && 'transform: scale-x-[-1]'}`}/>
								</ListItemIcon>
								<ListItemText primary="Switch" />
							</ListItemButton>
						</ListItem>
						}
						{sitTypes.filter(sitType => sitType !== sit.type).map(option => {
							return(
								<ListItem disablePadding key={option} onClick={() => pickSitType(option)}>
									<ListItemButton>
										<ListItemIcon>
											{option === "person"
											?
											<AirlineSeatReclineExtraIcon/>
											: option === "bike" ?
											<PedalBikeIcon />
											: option === "table" ?
											<TableRestaurantIcon />
											: option === "empty" ?
											<SpaceBarIcon />
											:
											<ClearIcon />
											}
										</ListItemIcon>
										<ListItemText primary={option === '' ? "Clear": option.charAt(0).toUpperCase() + option.slice(1)} />
									</ListItemButton>
								</ListItem>
							)
						})}
				</List>
				</Popover>
			</div>
		</div>
	)
}

export default Sit