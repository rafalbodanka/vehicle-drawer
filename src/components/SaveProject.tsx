import { useState, useEffect, useRef } from "react"
import SaveIcon from '@mui/icons-material/Save';
import { selectVehicle } from '../redux/vehicle';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Box, Modal, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { selectSavedProjects, setSavedProjects } from "../redux/savedProjects";
import { selectProject, setTitle } from "../redux/project";
import { selectViewport } from "../redux/viewport";
import ListItemText from "@mui/material/ListItemText"

const SaveProject = () => {

    const viewportWidth = useAppSelector(selectViewport).width

    const vehicle = useAppSelector(selectVehicle)
    const project = useAppSelector(selectProject)

    const [projectTitle, setProjectTitle] = useState(project.title)
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const handleClose = () => 
    {
        setOpen(false);
        setIsModalMessageVisible(false)
    }
    const [modalMessage, setModalMessage] = useState("")
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false)

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
    
    const handleOpenSaveProjectModal = () => {
        setOpen(true);
        setProjectTitle("")
    }

    const savedProjects = useAppSelector(selectSavedProjects)

    const handleSaveProjectClick = () => {
        dispatch(setTitle(projectTitle))
        handleSaveProject()
    }

    const handleSaveProject = () => {
        // overriding old project with the same name
        const clearedProjects = savedProjects.filter(project => {
            if (project.title !== projectTitle)
            return project
        })

        // saving new project
        const newProject = {
            title: projectTitle ? projectTitle : "Untitled",
            saved: true,
            vehicle: vehicle,
            savedAt: new Date(),
        }
        const newSavedProjects = [...clearedProjects, newProject]
        localStorage.setItem('savedProjects', JSON.stringify(newSavedProjects))
        dispatch(setSavedProjects([...clearedProjects, newProject]))
        handleClose()
    }

    return (
        <ThemeProvider theme={theme}>
            {viewportWidth >= 768 ? 
                <div className='flex cursor-pointer' onClick={handleOpenSaveProjectModal}>
                    <button
                        className="py-3 px-4 bg-purple-800 rounded-lg active:bg-purple-900"
                        >
                        <SaveIcon fontSize="inherit"/>
                        <span className='ml-2'>Save</span>
                    </button>
                </div>
                :
                <>
                    <ListItemText>
                        <span className="ml-1">Save</span>
                    </ListItemText>
                    <div className="absolute h-full w-full -translate-x-4 z-10" onClick={handleOpenSaveProjectModal}></div>
                </>
                }
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={boxStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Save your project
                        </Typography>
                        <TextField
                            defaultValue={project.title}
                            inputProps={{ maxLength: 100 }}
                            name="noAutoFill"
                            sx={{
                            input: { color: '#F9F7F5' },
                            label: { color: '#F9F7F5'},
                            mt: 2,
                            '.MuiFilledInput-root': {
                            backgroundColor: '#333333',
                            },
                            }}
                            color="primary" id="outlined-basic" label="Project title" variant="filled"
                            onChange={(event) => {
                            setIsModalMessageVisible(false)
                            setProjectTitle(event.target.value)
                            }
                            }
                            />
                        {isModalMessageVisible &&
                        <Typography id="modal-modal-error" sx={{ mt: 2, fontSize: '16px', color: "red", fontWeight: "bold"}}>
                            {modalMessage}
                        </Typography>
                        }
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '16px', }}>
                            You can come back to your saved projects later.
                        </Typography>
                        <div className="flex justify-center mt-8">
                            <button
                                disabled={projectTitle.length < 1}
                                className="py-2 px-4 shadow-lg bg-purple-800 rounded-lg active:bg-purple-900 disabled:bg-gray-600"
                                onClick={handleSaveProjectClick}
                                >
                                <SaveIcon />
                                <span className='ml-2'>Save</span>
                            </button>
                        </div>
                    </Box>
                </Modal>
            </ThemeProvider>
    )
}

export default SaveProject