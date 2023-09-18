import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectVehicle, deleteCorridor, moveCorridor } from "../redux/vehicle";
import { selectDeleting } from "../redux/deleting";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";

type CorridorProps = {
    wagonIndex: number;
    columnIndex: number;
    rowIndex:number;
}

const Corridor = ({ wagonIndex, columnIndex, rowIndex }: CorridorProps) => {

    const dispatch = useAppDispatch()
    const {deletingRow} = useAppSelector(selectDeleting)
    const vehicle = useAppSelector(selectVehicle)

    const handleDeleteCorridor = (corridorIndex: number) => {
		if (deletingRow) dispatch(deleteCorridor({wagonIndex, corridorIndex}))
	}

    const moveCorridorUp = (wagonIndex: number, prevCorridorIndex: number, newCorridorIndex: number) => {
		if (newCorridorIndex < 0) return;
		const newCorridorIndexInCorridors = vehicle.wagons[wagonIndex].corridors.includes(newCorridorIndex)
		if (newCorridorIndexInCorridors && newCorridorIndex < 0) return

		const findFirstPossibleCorridorIndexUp = (array: number[], movedItemId: number) => {
			const reversedSortedArray = [...array].sort().reverse()
			for (let i=movedItemId; i>=0; i--) {
				if (!reversedSortedArray.includes(i)) {
					return i
				}
			}
			return false
		}

		const firstAvailableIndex = findFirstPossibleCorridorIndexUp(vehicle.wagons[wagonIndex].corridors, prevCorridorIndex)
		if (firstAvailableIndex !== false) {
			dispatch(moveCorridor({wagonIndex, prevCorridorIndex, newCorridorIndex: firstAvailableIndex}))
		}
	}

    const moveCorridorDown = (wagonIndex: number, prevCorridorIndex: number, newCorridorIndex: number) => {
		const columnLength = vehicle.wagons[wagonIndex].columns[columnIndex].sits.length
		if (prevCorridorIndex > columnLength) return;
		const newCorridorIndexInCorridors = vehicle.wagons[wagonIndex].corridors.includes(newCorridorIndex)
		if (newCorridorIndexInCorridors && newCorridorIndex === columnLength) return

		const findFirstPossibleCorridorIndexUp = (range: number, array: number[], movedItemId: number) => {
			const reversedSortedArray = [...array].sort()
			for (let i=movedItemId; i<=range; i++) {
				if (!reversedSortedArray.includes(i)) {
					return i
				}
			}
			return false
		}

		const firstAvailableIndex = findFirstPossibleCorridorIndexUp(columnLength, vehicle.wagons[wagonIndex].corridors, prevCorridorIndex)

		if (firstAvailableIndex !== false) {
			dispatch(moveCorridor({wagonIndex, prevCorridorIndex, newCorridorIndex: firstAvailableIndex}))
		}
    }

    return (
        <div
        className="bg-gray-600 h-12 flex justify-end sit corridor items-center"
        data-corridor={rowIndex} data-column={columnIndex} data-wagon={wagonIndex}
        onClick={() => handleDeleteCorridor(rowIndex)}
        >
            {columnIndex === 0 && 
            <div>
                {rowIndex > 0 &&
                    <div
                        onClick={() => moveCorridorUp(wagonIndex, rowIndex, rowIndex - 1)}
                        className={`cursor-pointer ${rowIndex === 0 && 'opacity-0 cursor-default'}`}>
                            <ArrowDropUp />
                    </div>
                }
                {rowIndex < vehicle.wagons[wagonIndex].columns[columnIndex].sits.length &&
                    <div
                        onClick={() => moveCorridorDown(wagonIndex, rowIndex, rowIndex + 1)}
                        className="cursor-pointer">
                            <ArrowDropDown />
                    </div>
                }
            </div>
            } 
        </div>
    )
}

export default Corridor