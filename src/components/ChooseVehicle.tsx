import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setVehicleType } from "../redux/vehicle";
import { setIsChooseVehicleModalOpen, setIsVehicleSet, setTitle } from "../redux/project";
import { selectProject } from "../redux/project";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import train from "../img/train.png"
import bus from "../img/bus.png"
import plane from "../img/plane.png"

const ChooseVehicle = () => {
  const vehicleTypes = ['Train', 'Bus', 'Plane']
  const modalRef = useRef(null);

  const vehicleImages = {
    Train: train,
    Bus: bus,
    Plane: plane,
  };

  const isChooseVehicleModalOpen = useAppSelector(selectProject).isChooseVehicleModalOpen

  const dispatch = useAppDispatch()

  const handleChooseVehicle = (vehicle: string) => {
      dispatch(setIsChooseVehicleModalOpen(false))
      dispatch(setVehicleType(vehicle))
      dispatch(setIsChooseVehicleModalOpen(false))
      dispatch(setIsVehicleSet(true))
      dispatch(setTitle(""))
    }

  return (
    <CSSTransition 
    in={isChooseVehicleModalOpen}
    timeout={600}
    classNames="modal"
    unmountOnExit
    nodeRef={modalRef}
    >
      <div
      className={'flex justify-center mt-8 md:mt-0 md:items-center w-full h-full'}
      ref={modalRef}>
        <div>
          <p className="text-center mb-8 text-3xl text-almostWhite font-bold">
            Pick vehicle type:
          </p>
          <div
          className={"flex gap-8 flex-col md:flex-row justify-center items-center"}
          >
            {vehicleTypes.map(vehicle => {
              return (
                <div
                key={vehicle}
                className="h-48 w-48 text-almostWhite flex justify-center items-center border-almostWhite border-[3px] rounded-lg cursor-pointer hover-lift"
                onClick={() => handleChooseVehicle(vehicle)}
                >
                  <div>
                    <img
                    alt={vehicle}
                    src={vehicleImages[vehicle as keyof typeof vehicleImages]}
                    className="max-w-12 max-h-12"
                    ></img>
                    <p className="font-bold text-center text-lg">
                      <span>{vehicle}</span>
                    </p>
                    <div className="flex justify-center mt-4">
                      <span className="flex justify-center"><AddCircleIcon fontSize="large" /></span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default ChooseVehicle;