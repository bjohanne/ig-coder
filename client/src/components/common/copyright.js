import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default function CopyrightComponent(){
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="./">
                IG Coder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
