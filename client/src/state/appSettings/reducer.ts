import update from 'immutability-helper';
import {
    TURN_MANAGEMENT_ON, TURN_MANAGEMENT_OFF,
    TURN_CORE_ON, TURN_CORE_OFF,
    TURN_LABELS_ON, TURN_LABELS_OFF,
    TURN_PREFIXSUFFIX_ON, TURN_PREFIXSUFFIX_OFF
} from "./actions";
import { IMode, IPreferences } from "../../core/config/interfaces";

interface appState {
    mode: IMode,
    preferences: IPreferences
}

const initialState: appState = {
    mode: {                 // System modes
        management: false,          // If true, management layer is active, including login/register, project management
    },

    preferences: {          // User preferences
        useCoreOnly: false,     // If true, editor functionality is restricted to IG Core
        useNodeLabels: true,    // Whether to show labels on nodes
        usePrefixSuffix: true   // Whether to use prefix & suffix in text content
    }
};

const appSettings = (state: appState = initialState, action: any) => {
    switch (action.type) {
        case TURN_MANAGEMENT_ON:
            return update(state, {
                mode: {
                    management: {$set: true}
                }
            });
        case TURN_MANAGEMENT_OFF:
            return update(state, {
                mode: {
                    management: {$set: false}
                }
            });
        case TURN_CORE_ON:
            return update(state, {
                preferences: {
                    useCoreOnly: {$set: true}
                }
            });
        case TURN_CORE_OFF:
            return update(state, {
                preferences: {
                    useCoreOnly: {$set: false}
                }
            });
        case TURN_LABELS_ON:
            return update(state, {
                preferences: {
                    useNodeLabels: {$set: true}
                }
            });
        case TURN_LABELS_OFF:
            return update(state, {
                preferences: {
                    useNodeLabels: {$set: false}
                }
            });
        case TURN_PREFIXSUFFIX_ON:
            return update(state, {
                preferences: {
                    usePrefixSuffix: {$set: true}
                }
            });
        case TURN_PREFIXSUFFIX_OFF:
            return update(state, {
                preferences: {
                    usePrefixSuffix: {$set: false}
                }
            });
        default:
            return state;
    }
};

export default appSettings;
