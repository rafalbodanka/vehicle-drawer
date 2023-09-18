import { useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ChooseVehicle from "./ChooseVehicle";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectProject } from "../redux/project";
import { setIsStarterModalOpen, setIsChooseVehicleModalOpen } from "../redux/project";
import SavedProjects from "./SavedProjects";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const StartProject = ({}) => {
  const isStarterModalOpen = useAppSelector(selectProject).isStarterModalOpen
  const dispatch = useAppDispatch()

  const modalRef = useRef(null);

  const startProject = () => {
    dispatch(setIsStarterModalOpen(false))
  }

  useEffect(() => {
    if (!isStarterModalOpen) {
      const delay = setTimeout(() => {
        dispatch(setIsChooseVehicleModalOpen(true));
        clearTimeout(delay);
      }, 800);
    }
  }, [isStarterModalOpen]);

  return (
    <>
      <CSSTransition 
      in={isStarterModalOpen}
      timeout={600}
      unmountOnExit
      classNames="modal"
      nodeRef={modalRef}
      >
        <div
        ref={modalRef}
        className={'flex w-full h-full justify-center items-center'}
        >
          <div
          className="h-48 w-48 text-almostWhite flex justify-center items-center border-almostWhite border-[3px] rounded-lg cursor-pointer hover-lift"
          onClick={startProject}
          >
            <div>
              <p className="font-bold">
                Start new project
              </p>
              <div className="flex justify-center mt-4">
                <span className="flex justify-center"><AddCircleIcon fontSize="large"/></span>
              </div>
            </div>
          </div>
          <SavedProjects />
        </div>
      </CSSTransition>
      <ChooseVehicle />
    </>
  )
}

export default StartProject