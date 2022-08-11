import { GET_ACTIVITY, GET_DETAIL_ACTIVITY, DELETE_ACTIVITY, CREATE_ACTIVITY, UPDATE_ACTIVITY } from "../actions/activity";

const initialState = {
    getActivityResult: false, getActivityLoading: false, getActivityError: false, getActivityErrorMessage: false,
    getDetailResult: false, getDetailLoading: false, getDetailError: false, getDetailErrorMessage: false,
    deleteAcitivityResult: false, deleteAcitivityLoading: false, deleteAcitivityError: false, deleteAcitivityMessage: false,
    createActivityResult: false, createActivityLoading: false, createActivityError: false, createActivityMessage: false,
    updateActivityResult: false, updateActivityLoading: false, updateActivityError: false, updateActivityMessage: false, updateActivityClick: false,
}

const activityReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ACTIVITY:
            return { ...state,
                getActivityResult: action.payload.data,
                getActivityLoading: action.payload.loading,
                getActivityError: action.payload.error,
                getActivityErrorMessage:action.payload.errorMessage
            };
        case GET_DETAIL_ACTIVITY:
            return { ...state,
                getDetailResult: action.payload.data,
                getDetailLoading: action.payload.loading,
                getDetailError: action.payload.error,
                getDetailErrorMessage:action.payload.errorMessage
            };
        case DELETE_ACTIVITY:
            return { ...state,
                deleteActivityResult: action.payload.data,
                deleteActivityLoading: action.payload.loading,
                deleteActivityError: action.payload.error,
                deleteActivityErrorMessage:action.payload.errorMessage
            };
        case CREATE_ACTIVITY:
            return { ...state,
                createActivityResult: action.payload.data,
                createActivityLoading: action.payload.loading,
                createActivityError: action.payload.error,
                createActivityErrorMessage:action.payload.errorMessage
            };
        case UPDATE_ACTIVITY:
            return { ...state,
                updateActivityResult: action.payload.data,
                updateActivityClick: action.payload.click,
                updateActivityLoading: action.payload.loading,
                updateActivityError: action.payload.error,
                updateActivityErrorMessage:action.payload.errorMessage
            };
        default: return state;
    }
}
export default activityReducer