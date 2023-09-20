import { ColumnType } from "../utils/Types";
import Sit from "./Sit";
import { deleteColumn, selectVehicle, deleteRow, moveCorridor, deleteCorridor, removeCorridorDuplicates } from "../redux/vehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ColumnEditPopover from "./ColumnEditPopover";
import { selectDeleting } from "../redux/deleting";
import Corridor from "./Corridor";

type ColumnProps = {
	column: ColumnType
	columnIndex: number;
	wagonIndex: number;
}

const Column = ({ column, columnIndex, wagonIndex }: ColumnProps) => {

	const vehicle = useAppSelector(selectVehicle)
	const {deletingColumn, deletingRow} = useAppSelector(selectDeleting)
	const corridors = vehicle.wagons[wagonIndex].corridors
	
	const dispatch = useAppDispatch()

	const handleDeleteColumn = () => {
		if (!deletingColumn) return
		if (columnIndex === 0 && vehicle.wagons[wagonIndex].columns.length <= 1) return
		dispatch(deleteColumn({ wagonIndex, columnIndex }));
	}

	const handleDeleteRow = (rowIndex: number) => {
		if (!deletingRow) return
		const columnLength = vehicle.wagons[wagonIndex].columns[columnIndex].sits.length
		if (rowIndex === 0 && columnLength <= 1) return
		dispatch(deleteRow({wagonIndex, rowIndex}))

		//adjust corridors
		vehicle.wagons[wagonIndex].corridors.filter(corridor => {
			if (corridor > rowIndex && corridor < columnLength) return corridor
		}).map((corridor) => {
			if (corridor === 0) {
				dispatch(deleteCorridor({wagonIndex, corridorIndex: corridor}))
			} else {
				dispatch(moveCorridor({wagonIndex, prevCorridorIndex: corridor, newCorridorIndex: corridor - 1}))
			}
		})
	}

	return (
		<div>
			<div className="grid grid-rows-[16px,1fr,16px] w-24 h-full">
				<div className="h-4 w-full bg-almostWhite">
				</div>
				<div className="h-full" onClick={handleDeleteColumn}>
					<div className="grid grid-rows w-24 h-full">
						{column.sits.map((sit, rowIndex) => (
							<div key={rowIndex}>
							{corridors.includes(rowIndex) &&
							<Corridor wagonIndex={wagonIndex} columnIndex={columnIndex} rowIndex={rowIndex}/>
							}
							<div key={rowIndex} className="flex justify-center items-center" onClick={() => handleDeleteRow(rowIndex)}>
								<Sit sit={sit} wagonIndex={wagonIndex} columnIndex={columnIndex} rowIndex={rowIndex}/>
							</div>
							</div>
						))}
						{corridors.includes(column.sits.length) &&
						<Corridor wagonIndex={wagonIndex} columnIndex={columnIndex} rowIndex={column.sits.length}/>
						}
					</div>
				</div>
				<div className="h-4 w-full bg-almostWhite">
					<ColumnEditPopover wagonIndex={wagonIndex} columnIndex={columnIndex}/>
				</div>
			</div>
		</div>
	)
}

export default Column