import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Account from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {OutlinedInput} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import CopyrightComponent from "../common/copyright";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '86vh'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        padding: theme.spacing(0, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function LoginComponent(props) {
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Account/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            error={props.data.isFail}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="username"
                            value={props.data.username}
                            onChange={props.handleChange}
                            autoComplete="email"
                            autoFocus
                        />
                        <FormControl variant="outlined" fullWidth required error={props.data.isFail}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name={'pass'}
                                type={props.data.showPassword ? 'text' : 'password'}
                                value={props.data.pass}
                                onChange={props.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={props.handleClickShowPassword}
                                            onMouseDown={props.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {props.data.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={80}
                            />
                            <FormHelperText id="component-error-text" style={{display:props.data.isFail?'block':'none'}} error={props.data.isFail}>{props.data.failText}</FormHelperText>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container justify={'flex-end'}>
                            <Grid item>
                                <Link href="./register" variant="body2">
                                    {"Don't have an account? Sign up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <CopyrightComponent />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
