import { addWagon } from "../redux/vehicle";
import { VehicleType } from "../utils/Types";
import Wagon from "./Wagon";
import { useAppDispatch } from "../redux/hooks";

type VehicleProps = {
	vehicle: VehicleType;
}

const Vehicle = ({ vehicle }: VehicleProps) => {
	const dispatch = useAppDispatch()
	const handleAddWagon = () => {
		dispatch(addWagon(0))
	}

	return (
		<div className="flex flex-row-reverse items-center">
			<div className="flex items-center flex-shrink-0">
				<img src={`./img/${vehicle.type}-front.png`} className="pl-8"></img>
			</div>
			{vehicle.wagons.map((wagon, wagonIndex) => (
				<Wagon key={wagonIndex} wagon={wagon} wagonIndex={wagonIndex} />
			))}
			<div className="flex justify-center items-center">
				<div 
				className="text-2xl bg-green-400 rounded-full h-8 w-8 text-center font-bold cursor-pointer"
				onClick={handleAddWagon}
				>+</div>
			</div>
			<div className="flex items-center flex-shrink-0">
				<img src={`./img/${vehicle.type}-back.png`} className="pr-8"></img>
			</div>
		</div>
	);
}

export default Vehicle