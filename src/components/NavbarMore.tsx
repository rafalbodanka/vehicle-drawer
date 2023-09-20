import { useState } from "react"
import Popover from "@mui/material/Popover"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemButton from "@mui/material/ListItemButton"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SaveProject from "./SaveProject"
import SaveIcon from '@mui/icons-material/Save';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import DeletingColumn from "./DeletingColumn"
import DeletingRow from "./DeletingRow"
import { useAppSelector } from "../redux/hooks"
import { selectDeleting } from "../redux/deleting"

const NavbarMore = () => {

    const {deletingColumn, deletingRow} = useAppSelector(selectDeleting)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'column-edit-popover' : undefined;

    return (
        <div className="flex items-center justify-end mr-8">
        <button className="flex items-center" onClick={handleClick}>
            <MoreHorizIcon fontSize="large"/>
        </button>
        <Popover                
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SaveIcon />
                        </ListItemIcon>
                        <SaveProject />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding className={`${deletingColumn && "bg-gray-300"}`}>
                    <ListItemButton>
                            <ListItemIcon>
                                <LayersClearIcon />
                            </ListItemIcon>
                                <DeletingColumn />
                        </ListItemButton>
                </ListItem>
                <ListItem disablePadding className={`${deletingRow && "bg-gray-300"}`}>
                    <ListItemButton>
                            <ListItemIcon>
                                <LayersClearIcon />
                            </ListItemIcon>
                                <DeletingRow />
                        </ListItemButton>
                </ListItem>
            </List>
        </Popover>
    </div>
    )
}

export default NavbarMore