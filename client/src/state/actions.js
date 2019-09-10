import { TEST_ACTION, TEST_ACTION_RESPONSE } from "./actiontypes";

export const testAction = () => ({
    type: TEST_ACTION
});

export const testActionResponse = (data) => ({
    type: TEST_ACTION_RESPONSE,
    payload: data
});