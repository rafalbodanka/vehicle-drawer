import { useEffect } from "react"
import StartProject from "./components/StartProject";
import Project from "./components/Project";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectProject } from "./redux/project";
import { setViewportWidth } from "./redux/viewport";
import useWindowWidth from "./hooks/useWindowWidth";

const App = () => {
  const isVehicleSet = useAppSelector(selectProject).isVehicleSet
  useWindowWidth()

  return (
    <div className="w-screen h-screen">
      {isVehicleSet ?
        <Project />
        :
        <StartProject/>
      }
    </div>
  );
}

export default App;
