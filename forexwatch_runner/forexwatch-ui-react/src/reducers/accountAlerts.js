import { ACCOUNT_ALERTS_LISTED } from './actionTypes';

export default function accountAlerts(state = {}, action) {

    switch(action.type) {

        case ACCOUNT_ALERTS_LISTED:

            return action.data;

        default:

            return state;

    }   

}