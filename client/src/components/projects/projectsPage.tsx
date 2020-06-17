import React from "react";
import './projectsPage.css'
import LeftTab from "../common/leftTab";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button,TextField} from '@material-ui/core';
import ListItem from "../common/listItem";
function ProjectsPage(props: any) {
    const [openNewProject, setOpenNewProject] = React.useState(false);
    const [visibility, setVisibility]=React.useState(0);


    const handleNewProject =(event)=>{
        setOpenNewProject(true)
    }
    const handleClose=()=>{
        setOpenNewProject(false);
    }

    const handleVisibility=(event)=>{
        setVisibility(event.target.value)
    }

    const handleMenuItem=(event)=>{
        console.log(event.target)
        switch (event.target.innerHTML) {
            case 'Edit':
                // @TODO add edit functionality
                console.log('edit')
                break;
            case 'Delete':
                // @TODO add Delete functionality
                console.log('Delete')
                break;
            case 'Share':
                // @TODO add Share functionality
                console.log('Share')
                break;
        }
    }

    return(
        <div className={'root'}>
            <div className={'Container'}>
                <div className="row">
                    <div className="col-auto mr-auto">
                        <h3>My Projects</h3>
                    </div>
                    <div className="col-auto" >
                        <button type="button" className="btn btn-success" onClick={handleNewProject} data-target="#exampleModalCenter">New Project</button>
                        <Dialog open={openNewProject} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">New Project</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Project name"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                />
                                <div className="form-group" id={"select-visibility"}>
                                    <select
                                        className="form-control"
                                        placeholder={'select visibility for document'}
                                        onChange={handleVisibility}
                                        value={visibility}
                                    >
                                        <option value={0} disabled={true}>---Select visibility for the project---</option>
                                        <option value={1}>Private</option>
                                        <option value={2}>Internal</option>
                                        <option value={3}>Public</option>
                                    </select>
                                </div>
                                <TextField
                                    margin="dense"
                                    id="des"
                                    label="Description"
                                    type="email"
                                    fullWidth
                                    multiline={true}
                                    rows={4}
                                    variant="outlined"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 "id={"lefttab"}>
                        <div className="list-group" >
                            <a href="#" className="list-group-item list-group-item-action">
                                <LeftTab title={"My projects"} des={'All my projects'}>
                                    <svg className="bi bi-person" width="2em" height="2em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    </svg>
                                </LeftTab>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                <LeftTab title={"Shared with me"} des={'Projects and documents shared with you'}>
                                    <svg className="bi bi-folder-symlink" width="2em" height="2em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z"/>
                                        <path fillRule="evenodd"
                                              d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"/>
                                        <path
                                            d="M8.616 10.24l3.182-1.969a.443.443 0 0 0 0-.742l-3.182-1.97c-.27-.166-.616.036-.616.372V6.7c-.857 0-3.429 0-4 4.8 1.429-2.7 4-2.4 4-2.4v.769c0 .336.346.538.616.371z"/>
                                    </svg>
                                </LeftTab>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                <LeftTab title={"Public projects"} des={'Browse all public projects'}>
                                    <svg className="bi bi-collection" width="2em" height="2em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
                                    </svg>
                                </LeftTab>
                            </a>
                        </div>

                    </div>
                    <div className="col-auto" id={"verticalline"}>
                        <div className={'vertical-line'}></div>
                    </div>
                    <div className="col">
                        <div className="row align-items-center">
                            <div className="col-auto mr-auto">
                                <h4>Available Projects</h4>
                            </div>
                            <div className="col-auto" >
                                <div className="search">
                                    <input type="text" className="form-control" placeholder="Search" name="ig-q"/>
                                    <span className="dark-igc-gray-text oi oi-magnifying-glass"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={'horizontal-line'}></div>
                        </div>



                        <div className="row-auto">
                            <div className="list-group" id={'file-list'}>
                                <a href="#1" className="list-group-item list-group-item-action">
                                    <ListItem
                                        title={"project xxx-development 2020"}
                                        type={"fsfsfjklasjfk ajkfjie jkjkfpa"}
                                        author={"Daniel Simith"}
                                        modified date={"Modified 4 days ago"}
                                        handleMenuItem={handleMenuItem}
                                    />
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    <ListItem
                                        title={"project xxx-development 2020"}
                                        type={"fsfsfjklasjfk ajkfjie jkjkfpa"}
                                        author={"Daniel Simith"}
                                        modified date={"Modified 4 days ago"}
                                        handleMenuItem={handleMenuItem}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProjectsPage;
