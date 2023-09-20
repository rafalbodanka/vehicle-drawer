import StartProject from "./components/StartProject";
import Project from "./components/Project";
import { useAppSelector } from "./redux/hooks";
import { selectProject } from "./redux/project";
import useWindowWidth from "./hooks/useWindowWidth";

const App = () => {
  const isVehicleSet = useAppSelector(selectProject).isVehicleSet
  useWindowWidth()

  return (
    <div className="min-w-screen min-h-screen flex justify-center overflow-hidden items-center">
      {isVehicleSet ?
        <Project />
        :
        <StartProject/>
      }
    </div>
  );
}

export default App;
