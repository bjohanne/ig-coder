//@flow
import { 
    TEST_ACTION, 
    TEST_ACTION_RESPONSE
} from "./actiontypes";
import { Store } from "redux";
import axios from "axios";



export const middleware = (store: Store) => (next: any) => (action: any) => {    
    if (action.type === TEST_ACTION) {
        axios.get("http://127.0.0.1:5000/test/").then((response) => {
            store.dispatch({ type: TEST_ACTION_RESPONSE, payload: response.data });
        });
    }
    next(action);
};

