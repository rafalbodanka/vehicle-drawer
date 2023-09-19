import { addWagon } from "../redux/vehicle";
import { VehicleType } from "../utils/Types";
import Wagon from "./Wagon";
import { useAppDispatch } from "../redux/hooks";
import train from "../img/train.png"
import trainFront from "../img/train-front.png"
import trainBack from "../img/train-back.png"
import bus from "../img/bus.png"
import busFront from "../img/bus-front.png"
import busBack from "../img/bus-back.png"
import plane from "../img/plane.png"
import planeFront from "../img/plane-front.png"
import planeBack from "../img/plane-back.png"

type VehicleProps = {
	vehicle: VehicleType;
}

const Vehicle = ({ vehicle }: VehicleProps) => {
    const vehicleImages = {
      Train: train,
      Bus: bus,
      Plane: plane,
    };
	const vehicleFrontImages = {
		Train: trainFront,
		Bus: busFront,
		Plane: planeFront,	
	}
	
	const vehicleBackImages = {
		Train: trainBack,
		Bus: busBack,
		Plane: planeBack,
	}

	const dispatch = useAppDispatch()
	const handleAddWagon = () => {
		dispatch(addWagon(0))
	}

	return (
		<div className="flex flex-row-reverse items-center">
			<div className="flex items-center flex-shrink-0">
				<img
				alt={vehicle.type}
                src={vehicleFrontImages[vehicle.type as keyof typeof vehicleImages]}
				className="pl-8"></img>
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
				<img
				alt={vehicle.type}
                src={vehicleBackImages[vehicle.type as keyof typeof vehicleImages]}
				className="pr-8"></img>
			</div>
		</div>
	);
}

export default Vehicle