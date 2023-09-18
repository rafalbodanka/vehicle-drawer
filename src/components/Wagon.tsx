import { useState } from "react";
import { WagonType } from "../utils/Types"
import Column from "./Column";
import { deleteColumn, selectVehicle, addColumn } from "../redux/vehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type WagonProps = {
	wagon: WagonType;
	wagonIndex: number;
}

const Wagon = ({ wagon, wagonIndex }: WagonProps) => {

	const vehicle = useAppSelector(selectVehicle)
	const [displayedLength, setDisplayedLength] = useState(vehicle.wagons.length)
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
		<div className="flex flex-row-reverse pl-8 relative">
			<div className="w-4 bg-almostWhite rounded-r-2xl"></div>
			<div className="absolute -translate-y-28 text-xl">
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
			</div>
			{wagon.columns.map((column, columnIndex) => (
				<Column key={columnIndex} wagonIndex={wagonIndex} column={column} columnIndex={columnIndex}/>
			))}
			<div className="w-4 bg-almostWhite rounded-l-2xl"></div>
			<div className="flex items-center pr-8 text-5xl"><MoreHorizIcon fontSize="large"/></div>
		</div>
	)
}

export default Wagon