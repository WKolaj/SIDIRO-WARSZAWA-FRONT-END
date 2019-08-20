import { GET_EVENTS_REQUESTED,
    GET_EVENTS_DONE, GET_EVENTS_FAILED } from '../actions/eventManagementApi';

const initialState = {
    eventsFetchError: false,
    eventsFetchPending: false,
    events: []
};

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_REQUESTED:
            return {
                ...state,
                eventsFetchPending: true,
                eventsFetchError: false
            }
        case GET_EVENTS_FAILED:
            return {
                ...state,
                eventsFetchPending: false,
                eventsFetchError: true
            }
        case GET_EVENTS_DONE: 
            return {
                ...state,
                eventsFetchPending: false,
                eventsFetchError: false,
                events: action.data
            }
        default:
            return state;
    }
}