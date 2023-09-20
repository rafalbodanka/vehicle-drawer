import { useState, useEffect } from "react";
import Vehicle from "./Vehicle";
import { selectVehicle } from "../redux/vehicle";
import { useAppSelector } from "../redux/hooks";
import Navbar from "./Navbar";

const Project = ({}) => {
	const vehicle = useAppSelector(selectVehicle)
	const [isProjectVisible, setIsProjectVisible] = useState(false)
	useEffect(() => {
		const delay = setTimeout(() => {
		setIsProjectVisible(true);
		clearTimeout(delay);
		}, 600);
	}, []);

	return (
		<>
			{isProjectVisible &&
				<div className="flex items-center text-almostWhite flex-row-reverse min-w-0">
					<Navbar vehicle={vehicle}/>
					<Vehicle vehicle={vehicle}/>
				</div>
			}
		</>
	)
}

export default Project