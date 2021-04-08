import React, {useState} from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Spinner from "react-bootstrap/Spinner";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import "./navbar.css";
import {signOut} from "../../state/user/actions";
import {openSnackbar} from "../../state/ui/actions";
import {
    turnCoreOff, turnCoreOn,
    turnPrefixSuffixOn, turnPrefixSuffixOff,
    turnLabelsOn, turnLabelsOff
} from "../../state/appSettings/actions";

export function NavbarComponent(props) {
    const history=useHistory()

    const {
        auth, loading, signOut, openSnackbar,
        inManagementMode, useCoreOnly, useNodeLabels, usePrefixSuffix,
        turnCoreOn, turnCoreOff,
        turnLabelsOn, turnLabelsOff,
        turnPrefixSuffixOn, turnPrefixSuffixOff
    } = props;

    const [codingMode, setCodingMode] = useState(useCoreOnly ? '1' : '2');
    const codingModes = [
        { name: 'IG Core', value: '1' },
        { name: 'Open', value: '2' }
    ];
    const handleChangeCodingMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodingMode(e.currentTarget.value)
        if (e.currentTarget.value === '1') {
            turnCoreOn();
        } else if (e.currentTarget.value === '2') {
            turnCoreOff();
        }
    }

    const [labelMode, setLabelMode] = useState(useNodeLabels ? '1' : '2');
    const labelModes = [
        { name: 'On', value: '1' },
        { name: 'Off', value: '2' }
    ];
    const handleChangeLabelMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelMode(e.currentTarget.value)
        if (e.currentTarget.value === '1') {
            turnLabelsOn();
        } else if (e.currentTarget.value === '2') {
            turnLabelsOff();
        }
    }

    const [prefixMode, setPrefixMode] = useState(usePrefixSuffix ? '1' : '2');
    const prefixModes = [
        { name: 'On', value: '1' },
        { name: 'Off', value: '2' }
    ];
    const handleChangePrefixMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrefixMode(e.currentTarget.value)
        if (e.currentTarget.value === '1') {
            turnPrefixSuffixOn();
        } else if (e.currentTarget.value === '2') {
            turnPrefixSuffixOff();
        }
    }

    const handleSignout=()=>{
        signOut(
            () => {
                history.push("/")
                openSnackbar()
            },
            () => {
                openSnackbar()
            }
        );
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link to="/">
                    <h2>
                        <span className="dark-igc-gray-bg badge text-light">IG Coder</span>
                    </h2>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    {inManagementMode ?
                        <div>
                        {!auth.isEmpty ?
                            <Nav className="mr-auto" id="navbar-nav">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="#">My profile</Link>
                                <Link className="nav-link" to="/projects/myprojects">My projects </Link>
                                <Nav.Link onClick={handleSignout}>
                                    Sign out
                                    {loading && <Spinner animation="border"size="sm" className="ml-2" role="status"/>}
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav className="mr-auto">
                                <Link className="text-dark" to="/login">Sign in</Link>
                            </Nav>
                        }
                        </div>
                    :
                    <Nav className="mr-auto">
                        <NavDropdown title="Preferences" id="nav-dropdown">
                            <NavDropdown.ItemText>
                                <span className="mr-3">
                                    Coding mode:
                                </span>
                                <ButtonGroup toggle>
                                    {codingModes.map((mode, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant="light"
                                            name="radio"
                                            value={mode.value}
                                            checked={codingMode === mode.value}
                                            onChange={handleChangeCodingMode}
                                            role="menuitemradio"
                                        >
                                            {mode.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </NavDropdown.ItemText>
                            <NavDropdown.ItemText>
                                <span style={{"marginRight": "37px"}}>
                                    Show node labels:
                                </span>
                                <ButtonGroup toggle>
                                    {labelModes.map((mode, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant="light"
                                            name="radio"
                                            value={mode.value}
                                            checked={labelMode === mode.value}
                                            onChange={handleChangeLabelMode}
                                            role="menuitemradio"
                                        >
                                            {mode.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </NavDropdown.ItemText>
                            <NavDropdown.ItemText>
                                <span style={{"marginRight": "48px"}}>
                                    Use prefix/suffix:
                                </span>
                                <ButtonGroup toggle>
                                    {prefixModes.map((mode, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant="light"
                                            name="radio"
                                            value={mode.value}
                                            checked={prefixMode === mode.value}
                                            onChange={handleChangePrefixMode}
                                            role="menuitemradio"
                                        >
                                            {mode.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </NavDropdown.ItemText>
                        </NavDropdown>
                    </Nav>
                    }
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth,
    loading: state.user.loading,
    inManagementMode: state.appSettings.mode.management,
    useCoreOnly: state.appSettings.preferences.useCoreOnly,
    useNodeLabels: state.appSettings.preferences.useNodeLabels,
    usePrefixSuffix: state.appSettings.preferences.usePrefixSuffix
});

const mapDispatchToProps = (dispatch: any) => ({
    signOut: (onSuccess, onError) => dispatch(signOut(onSuccess, onError)),
    openSnackbar: () => dispatch(openSnackbar()),
    turnCoreOn: () => dispatch(turnCoreOn()),
    turnCoreOff: () => dispatch(turnCoreOff()),
    turnLabelsOn: () => dispatch(turnLabelsOn()),
    turnLabelsOff: () => dispatch(turnLabelsOff()),
    turnPrefixSuffixOn: () => dispatch(turnPrefixSuffixOn()),
    turnPrefixSuffixOff: () => dispatch(turnPrefixSuffixOff())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarComponent);
