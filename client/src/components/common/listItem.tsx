import React from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function MyListItem(props:any) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.preventDefault()
    }


    const handleClose = () => {
        setAnchorEl(null);
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
                            <MenuItem onClick={props.handleMenuItem}><small aria-disabled={true}>Edit</small></MenuItem>
                            <MenuItem onClick={props.handleMenuItem}><small onClick={handleClose}>Delete</small></MenuItem>
                            <MenuItem onClick={props.handleMenuItem}><small onClick={handleClose}>Share</small></MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="col-2 align-items-center">
                    <small>{date}</small>
                </div>
            </div>
        </div>
    )
}
