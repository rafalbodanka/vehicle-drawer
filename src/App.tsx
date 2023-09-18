import StartProject from "./components/StartProject";
import Project from "./components/Project";
import { useAppSelector } from "./redux/hooks";
import { selectProject } from "./redux/project";

const App = () => {
  const isVehicleSet = useAppSelector(selectProject).isVehicleSet

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
