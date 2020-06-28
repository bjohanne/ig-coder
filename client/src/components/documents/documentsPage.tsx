import React from "react";
import {useState} from "react";
import './documentsPage.css'
import LeftTab from "../common/leftTab";
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, AppBar, Toolbar, IconButton,
    Typography, Tabs, Tab, Breadcrumbs, Link
} from '@material-ui/core';
import ListItem from "../common/listItem";

function DocumentsPage(props: any) {
    const [openNewProject, setOpenNewProject] = useState(false);
    const [visibility, setVisibility] = useState(0);

    let title
    var fakedata = [
        {
            title: "Le preferait retombait direction si ce battirent",
            des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                "Très parce que car dire parce que pour vin fromage et aussi car.",
            type: "project",
            author: "Jenna Fields",
            date: 3
        },
        {
            title: "Preparer en as habitent interdit premiere galopent",
            des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                "Très parce que car dire parce que pour vin fromage et aussi car.",
            type: "project",
            author: "Esme Daniels",
            date: 4
        },
        {
            title: "Agissait roc susciter par triomphe eau",
            des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                "Très parce que car dire parce que pour vin fromage et aussi car.",
            type: "project",
            author: "Hasan Carver",
            date: 1
        },
    ]
    const tab = props.match.params.tab
    const projectId = props.match.params.projectid
    console.log(tab)
    console.log(projectId)
    switch (tab) {
        case 'all':
            title = 'All Documents';
            fakedata = [
                {
                    title: "Le preferait retombait direction si ce battirent",
                    des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                        "Très parce que car dire parce que pour vin fromage et aussi car.",
                    type: "project",
                    author: "Jenna Fields",
                    date: 3
                },
                {
                    title: "Preparer en as habitent interdit premiere galopent",
                    des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                        "Très parce que car dire parce que pour vin fromage et aussi car.",
                    type: "project",
                    author: "Esme Daniels",
                    date: 4
                },
                {
                    title: "Agissait roc susciter par triomphe eau",
                    des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                        "Très parce que car dire parce que pour vin fromage et aussi car.",
                    type: "project",
                    author: "Hasan Carver",
                    date: 1
                },
            ]
            break
        case 'recent':
            title = 'Recent Documents';
            fakedata = [
                {
                    title: "Tuvasta voi karilla vai anastaa",
                    des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                        "Très parce que car dire parce que pour vin fromage et aussi car.",
                    type: "project",
                    author: "Luke Mccann",
                    date: 3
                },
                {
                    title: "Se kajutta kalassa sisassa he",
                    des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                        "Très parce que car dire parce que pour vin fromage et aussi car.",
                    type: "document",
                    author: "William Marsh",
                    date: 4
                },
                {
                    title: "He paivalla et te ja tupaanne saavansa",
                    des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                        "Très parce que car dire parce que pour vin fromage et aussi car.",
                    type: "document",
                    author: "Raphael Tran",
                    date: 1
                },
            ]
            break
        default:
            break;
    }

    const handleNewProject = (event) => {
        setOpenNewProject(true)
    }
    const handleClose = () => {
        setOpenNewProject(false);
    }

    const handleVisibility = (event) => {
        setVisibility(event.target.value)
    }


    return (
        <div className={'root'}>
            <div className={'Container'}>
                <div className={"row-auto"}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/" className={"link"}>
                            Home
                        </Link>
                        <Link
                            color="inherit"
                            href="/projects/myprojects"
                            className={"link"}
                        >
                            My projects
                        </Link>
                        <Typography color="textPrimary" className={"link"}>
                            {projectId}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="row">
                    <div className="col-auto mr-auto">
                        <h3>{projectId}</h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={handleNewProject}
                                data-target="#exampleModalCenter">New Document
                        </button>
                        <Dialog open={openNewProject} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">New Document</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Document name"
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
                                        <option value={0} disabled={true}>---Select visibility for the project---
                                        </option>
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
                    <div className="col-3 " id={"lefttab"}>
                        <div className="list-group">
                            <a href="./all" className="list-group-item list-group-item-action"
                               style={tab === 'all' ? {backgroundColor: '#EBEDEF'} : {backgroundColor: 'None'}}>
                                <LeftTab title={"My documents"} des={'All my documents'}>
                                    <svg className="bi bi-person" width="2em" height="2em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    </svg>
                                </LeftTab>
                            </a>
                            <a href="./recent" className="list-group-item list-group-item-action"
                               style={tab === 'recent' ? {backgroundColor: '#EBEDEF'} : {backgroundColor: 'None'}}>
                                <LeftTab title={"Recent documents"} des={'Browse documents recently opened'}>
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
                        </div>

                    </div>
                    <div className="col-auto" id={"verticalline"}>
                        <div className={'vertical-line'}></div>
                    </div>
                    <div className="col">
                        <div className="row align-items-center">
                            <div className="col-auto mr-auto">
                                <h4>{title}</h4>
                            </div>
                            <div className="col-auto">
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
                                {
                                    fakedata.map(data => {
                                        return (
                                            <a href="#1" key={data.title}
                                               className="list-group-item list-group-item-action">
                                                <ListItem
                                                    title={data.title}
                                                    type={data.type}
                                                    author={data.author}
                                                    modified date={"Modified " + data.date + " days ago"}
                                                />
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentsPage;
