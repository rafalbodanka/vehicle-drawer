import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectDeleting, toggleDeletingColumn } from '../redux/deleting';
import { selectVehicle } from '../redux/vehicle';
import { useEffect } from 'react';
import ListItemText from "@mui/material/ListItemText"

const DeletingColumn = () => {
    const {deletingColumn} = useAppSelector(selectDeleting)
    const vehicle = useAppSelector(selectVehicle)
    const dispatch = useAppDispatch()

    const handleToggleDeletingColumn = () => {
        dispatch(toggleDeletingColumn(!deletingColumn))
    }

  // deleting columns hover
  useEffect(() => {
    // Function to handle clicks outside the popover	
    const handleMouseOver = (event: MouseEventInit ) => {
        const mouseEvent = event as MouseEvent
        const dataColumnAttribute = (mouseEvent.target as Element)?.getAttribute('data-column');
        const dataWagonAttribute = (mouseEvent.target as Element)?.getAttribute('data-wagon');
        const elementsInColumn = document.querySelectorAll(`.sit[data-column="${dataColumnAttribute}"][data-wagon="${dataWagonAttribute}"]`);
        elementsInColumn.forEach(element => {
          element.classList.add('deleteHover');
        });
    };

    const handleMouseLeave = (event: MouseEventInit) => {
        const mouseEvent = event as MouseEvent
        const dataColumnAttribute = (mouseEvent.target as Element)?.getAttribute('data-column');
        const dataWagonAttribute = (mouseEvent.target as Element)?.getAttribute('data-wagon');
        const elementsInColumn = document.querySelectorAll(`.sit[data-column="${dataColumnAttribute}"][data-wagon="${dataWagonAttribute}"]`);
        elementsInColumn.forEach(element => {
          element.classList.remove('deleteHover');
        });
      };

    const elements = document.querySelectorAll('.sit')
    if (deletingColumn) {
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
  }, [deletingColumn, vehicle]);

return (
    <>
        <ListItemText>
            <span className='ml-1 md:ml-2'>Delete column</span>
        </ListItemText>
        <div className="absolute h-full w-full -translate-x-4 z-10" onClick={handleToggleDeletingColumn}></div>
    </>
)
}

export default DeletingColumn