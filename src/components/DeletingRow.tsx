import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectDeleting, toggleDeletingRow } from '../redux/deleting';
import { selectVehicle } from '../redux/vehicle';
import { useEffect } from 'react';
import ListItemText from "@mui/material/ListItemText"

const DeletingRow = () => {
    const {deletingColumn, deletingRow} = useAppSelector(selectDeleting)
    const vehicle = useAppSelector(selectVehicle)
    const dispatch = useAppDispatch()

    const handleToggleDeletingRow = () => {
        dispatch(toggleDeletingRow(!deletingRow))
    }

  // deleting rows hover
  useEffect(() => {
    const handleMouseOver = (event: MouseEventInit ) => {
        const mouseEvent = event as MouseEvent
        const dataRowAttribute = (mouseEvent.target as Element)?.getAttribute('data-row');
        const dataCorridorAttribute = (mouseEvent.target as Element)?.getAttribute('data-corridor');
        const dataWagonAttribute = (mouseEvent.target as Element)?.getAttribute('data-wagon');
        const elementsInRow = document.querySelectorAll(`.sit[data-row="${dataRowAttribute}"][data-wagon="${dataWagonAttribute}"]`);
        elementsInRow.forEach(element => {
          element.classList.add('deleteHover');
        });

        const corridorsInRow = document.querySelectorAll(`.sit[data-corridor="${dataCorridorAttribute}"][data-wagon="${dataWagonAttribute}"].corridor`);
        corridorsInRow.forEach(corridor => {
          corridor.classList.add('deleteHover');
        });
    };

    const handleMouseLeave = (event: MouseEventInit) => {
        const mouseEvent = event as MouseEvent
        const dataRowAttribute = (mouseEvent.target as Element)?.getAttribute('data-row');
        const dataCorridorAttribute = (mouseEvent.target as Element)?.getAttribute('data-corridor');
        const dataWagonAttribute = (mouseEvent.target as Element)?.getAttribute('data-wagon');
        const elementsInRow = document.querySelectorAll(`.sit[data-row="${dataRowAttribute}"][data-wagon="${dataWagonAttribute}"]`);
        elementsInRow.forEach(element => {
          element.classList.remove('deleteHover');
        });

        const corridorsInRow = document.querySelectorAll(`.sit[data-corridor="${dataCorridorAttribute}"][data-wagon="${dataWagonAttribute}"]`);
        corridorsInRow.forEach(corridor => {
          corridor.classList.remove('deleteHover');
        });
      };

    const elements = document.querySelectorAll('.sit')
    if (deletingRow) {
      elements.forEach(element => {
          element.addEventListener('mouseenter', handleMouseOver)
          element.addEventListener('mouseleave', handleMouseLeave);
      })
      
    }
    return () => {
        elements.forEach((element) => {
            element.removeEventListener("mouseenter", handleMouseOver);
            element.removeEventListener("mouseleave", handleMouseLeave);
          });
        };
  }, [deletingRow, vehicle]);

return (
    <>
        <ListItemText>
            <span className='ml-1 md:ml-2'>Delete row</span>
        </ListItemText>
        <div className="absolute h-full w-full -translate-x-4 z-10" onClick={handleToggleDeletingRow}></div>
    </>
)
}

export default DeletingRow