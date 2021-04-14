import React, {useState} from "react";
import {connect} from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {
    turnCoreOff, turnCoreOn,
    turnPrefixSuffixOn, turnPrefixSuffixOff,
    turnLabelsOn, turnLabelsOff
} from "../../state/appSettings/actions";

const Preferences = (props) => {
    const {
        useCoreOnly, useNodeLabels, usePrefixSuffix,
        turnCoreOn, turnCoreOff,
        turnLabelsOn, turnLabelsOff,
        turnPrefixSuffixOn, turnPrefixSuffixOff
    } = props;

    const [codingMode, setCodingMode] = useState(useCoreOnly ? '1' : '2');
    const codingModes = [
        { name: 'Core', value: '1' },
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

    return (
        <NavDropdown title="Preferences" id="nav-dropdown">
            <NavDropdown.ItemText title="Core mode restricts coding to a simpler version">
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
            <NavDropdown.ItemText title="Toggle whether to show text labels around nodes">
                <span style={{"marginRight": "19px"}}>
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
            <NavDropdown.ItemText title="Toggle the Prefix and Suffix slots for text content">
                <span style={{"marginRight": "30px"}}>
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
    );
}

const mapStateToProps = (state: any) => ({
    useCoreOnly: state.appSettings.preferences.useCoreOnly,
    useNodeLabels: state.appSettings.preferences.useNodeLabels,
    usePrefixSuffix: state.appSettings.preferences.usePrefixSuffix
});

const mapDispatchToProps = (dispatch: any) => ({
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
)(Preferences);
