import { useEffect } from "react"
import useGetSavedProjects from "../hooks/useGetSavedProjects"
import { useAppDispatch } from "../redux/hooks"
import { setSavedProjects } from "../redux/savedProjects"
import { SavedProjectType } from "../utils/Types"
import { setVehicle } from "../redux/vehicle"
import { setIsStarterModalOpen, setIsVehicleSet, setTitle } from "../redux/project"
import { formatDistanceToNow } from "date-fns"
import train from "../img/train.png"
import bus from "../img/bus.png"
import plane from "../img/plane.png"

const SavedProjects = () => {
    const vehicleImages = {
      Train: train,
      Bus: bus,
      Plane: plane,
      };

    const savedProjects: SavedProjectType[] = useGetSavedProjects()
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(setSavedProjects(savedProjects))
    }, [savedProjects])

    const loadProject = (savedProject: SavedProjectType) => {
      dispatch(setVehicle(savedProject.vehicle))
      dispatch(setTitle(savedProject.title))
      dispatch(setIsVehicleSet(true))
      dispatch(setIsStarterModalOpen(false))
    }

    return (
        <div className="flex flex-row-reverse">
            {savedProjects && savedProjects.map((savedProject, index) => {
                return (
                    <div
                    key={index}
                    className="h-48 w-48 text-almostWhite flex justify-center items-center border-almostWhite border-[3px] rounded-lg cursor-pointer ml-8 hover-lift"
                    onClick={() => loadProject(savedProject)}
                    >
                      <div>
                        <p className="font-bold flex justify-center mx-2">
                          {savedProject.title}
                        </p>
                        <div className="flex justify-center mt-4">
                          <span className="bw-12 h-12 flex justify-center text-4xl">
                            <img
                            alt={savedProject.vehicle.type}
                            src={vehicleImages[savedProject.vehicle.type as keyof typeof vehicleImages]}
                            />
                          </span>
                        </div>
                        <span className="bw-12 flex justify-center items-end text-xs mt-4">
                          Saved {formatDistanceToNow(new Date(savedProject.savedAt), {addSuffix: true})}
                        </span>
                      </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SavedProjects