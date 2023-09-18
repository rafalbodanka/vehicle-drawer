import LayersClearIcon from '@mui/icons-material/LayersClear';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectDeleting, toggleDeletingColumn, toggleDeletingRow } from '../redux/deleting';
import { selectVehicle } from '../redux/vehicle';
import { useEffect } from 'react';

const Deleting = () => {
    const {deletingColumn, deletingRow} = useAppSelector(selectDeleting)
    const vehicle = useAppSelector(selectVehicle)
    const dispatch = useAppDispatch()

    const handleToggleDeletingColumn = () => {
        dispatch(toggleDeletingColumn(!deletingColumn))
    }

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
    <div className='flex gap-8'>
        <button
        className={`py-2 px-4 shadow-lg  ${deletingRow ? 'bg-purple-900' : 'bg-purple-800'} rounded-lg`}
        onClick={handleToggleDeletingRow}
        >
            <LayersClearIcon />
            <span className='ml-2'>Delete row</span>
        </button>
        <button
        className={`py-2 px-4 shadow-lg  ${deletingColumn ? 'bg-purple-900' : 'bg-purple-800'} rounded-lg`}
        onClick={handleToggleDeletingColumn}>
            <LayersClearIcon />
            <span className='ml-2'>Delete column</span>
        </button>
    </div>
)
}

export default Deleting