import React from "react";
import {List,ListItem,ListItemAvatar,Avatar,ListItemText,ListItemSecondaryAction,IconButton} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';

export default function PersonList(props:any) {
    const namelist=['Ru Yang','Tom','Jerry','Tor']
    return(
        <div>
            <List>
                {namelist.map((name)=>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {name[0].toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}

            </List>
        </div>
    )
}
