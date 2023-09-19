import LayersClearIcon from '@mui/icons-material/LayersClear';
import { useAppSelector } from '../redux/hooks';
import { selectDeleting, toggleDeletingColumn, toggleDeletingRow } from '../redux/deleting';
import DeletingRow from './DeletingRow';
import DeletingColumn from './DeletingColumn';

const Deleting = () => {
  const {deletingColumn, deletingRow} = useAppSelector(selectDeleting)

  return (
    <div className='flex gap-8 text-xs sm:text-sm md:text-md lg:text-lg'>
        <button
        className={`relative py-2 px-4 shadow-lg max-h-16 ${deletingRow ? 'bg-purple-900' : 'bg-purple-800'} rounded-lg`}
        >
            <LayersClearIcon fontSize='inherit' />
            <DeletingRow />
        </button>
        <button
          className={`relative py-2 px-4 shadow-lg max-h-16 ${deletingColumn ? 'bg-purple-900' : 'bg-purple-800'} rounded-lg`}
          >
            <LayersClearIcon fontSize='inherit'/>
            <DeletingColumn />
        </button>
    </div>
)
}

export default Deleting