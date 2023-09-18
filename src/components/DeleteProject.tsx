import { ThemeProvider } from "@emotion/react"
import { Box, Button, ListItemButton, ListItemIcon, ListItemText, Modal, Typography, createTheme } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectProject, setIsStarterModalOpen, setIsVehicleSet } from "../redux/project";
import { selectSavedProjects, setSavedProjects } from "../redux/savedProjects";

const DeleteProject = () => {

	const theme = createTheme({
		palette: {
			primary: {
				main: "#F9F7F5"
			},
		},
	});

    const boxStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 425,
        bgcolor: '#121212',
        color: '#F9F7F5',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const currentProject = useAppSelector(selectProject)
    const projects = useAppSelector(selectSavedProjects)
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleDeleteProject = () => {
        console.log(currentProject)
        const newProjects = projects.filter(project => {
            if (project.title !== currentProject.title)
            return project
        })
        dispatch(setSavedProjects(newProjects))
        localStorage.setItem("savedProjects", JSON.stringify(newProjects))
        dispatch(setIsVehicleSet(false))
        dispatch(setIsStarterModalOpen(true))
    }


    return (
        <ThemeProvider theme={theme}>
            <ListItemButton onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText primary="Delete project" />
            </ListItemButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                        Do you want to delete project "{currentProject.title}"?
                    </Typography>
                    <div className="mt-4 flex justify-center gap-8">
                        <Button onClick={handleDeleteProject}>
                            Yes
                        </Button>
                        <Button onClick={handleClose}>
                            No
                        </Button>
                    </div>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}

export default DeleteProject