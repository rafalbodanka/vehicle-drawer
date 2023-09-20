import { useState } from "react";
import { WagonType } from "../utils/Types"
import Column from "./Column";
import { deleteColumn, selectVehicle, addColumn } from "../redux/vehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditWagon from "./EditWagon";

type WagonProps = {
	wagon: WagonType;
	wagonIndex: number;
}

const Wagon = ({ wagon, wagonIndex }: WagonProps) => {

	const vehicle = useAppSelector(selectVehicle)
	const [displayedLength, setDisplayedLength] = useState(vehicle.wagons.length)

	return (
		<div className="flex flex-row-reverse pl-8 relative">
			<div className="w-4 bg-almostWhite rounded-r-2xl"></div>
			{wagon && <EditWagon wagon={wagon} wagonIndex={wagonIndex} setDisplayedLength={setDisplayedLength}/>}
			{wagon && wagon.columns.map((column, columnIndex) => (
				<Column key={columnIndex} wagonIndex={wagonIndex} column={column} columnIndex={columnIndex}/>
			))}
			<div className="w-4 bg-almostWhite rounded-l-2xl"></div>
			<div className="flex items-center pr-8 text-5xl"><MoreHorizIcon fontSize="large"/></div>
		</div>
	)
}

export default Wagon