import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AppBar, Dialog, IconButton, Toolbar, Typography,Divider,FormControlLabel,Checkbox} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import './listItem.css'
import PersonList from "./personList";

export default function MyListItem(props:any) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [shareOpen, setShareOpen] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.preventDefault()
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
                setShareOpen(true)
                break;
        }
    }


    const handleClose = () => {
        setAnchorEl(null);
        setShareOpen(false)
    };

    const title=props.title
    const type=props.type
    const author=props.author
    const date=props.date

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className={"row align-items-center"}>
                        {/*<div className="col-1">*/}
                        {/*    {props.children}*/}
                        {/*</div>*/}
                        <div className="col">
                            <div className={"row"}>
                                <h5 className="mb-1">{title}</h5>
                            </div>
                            <div className={"row"}>
                                <small>{type}</small>
                            </div>
                            <div className={"row"}>
                                <small>{author}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            ...
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleMenuItem}><small onClick={handleClose}>Edit</small></MenuItem>
                            <MenuItem onClick={handleMenuItem}><small onClick={handleClose}>Delete</small></MenuItem>
                            <MenuItem onClick={handleMenuItem}><small onClick={handleClose}>Share</small></MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="col-2 align-items-center">
                    <small>{date}</small>
                </div>
            </div>

            {/*Share Dialog*/}
            <Dialog fullScreen open={shareOpen} onClose={handleClose} id={"share-dialog"} >
                <AppBar className={"app-bar"}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <div className={'container'}>
                            <div className={'row'}>
                                <Typography variant="h6" className={"app-bar-title"}>
                                    share settings
                                </Typography>
                            </div>
                            <div className={'row'}>
                                <small>share this {type.toLowerCase()} to another user</small>
                            </div>
                        </div>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col'}>
                            <small className={'shared-with'}>Shared with</small>
                            <PersonList></PersonList>
                        </div>
                        <Divider orientation={'vertical'}/>
                        <div className={'col'}>
                            <small>Tom Daley</small>
                            <Divider/>
                            <h6>Granted permissions</h6>
                            <div className={'row'}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={false}

                                            name="checkedF"
                                            color="primary"
                                        />
                                    }
                                    label="View document"
                                />
                            </div>
                            <div className={'row'}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={false}

                                            name="checkedF"
                                            color="primary"
                                        />
                                    }
                                    label="Edit document"
                                />
                            </div>
                            <div className={'row'}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={false}

                                            name="checkedF"
                                            color="primary"
                                        />
                                    }
                                    label="Delete project"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </Dialog>
        </div>
    )
}
