import { DELETE_TODO_ITEM, CREATE_TODO_ITEM, UPDATE_TODO_ITEM, GETLIST_TODO_ITEM, DETAIL_TODO_ITEM } from "../actions/todo";

const initialState = {
    getListToDoResult: false, getListToDoLoading: false, getListToDoError: false, getListToDoErrorMessage: false,
    detailToDoResult: false, detailToDoLoading: false, detailToDoError: false, detailToDoErrorMessage: false,
    deleteToDoResult: false, deleteToDoLoading: false, deleteToDoError: false, deleteToDoMessage: false,
    createToDoResult: false, createToDoLoading: false, createToDoError: false, createToDoMessage: false,
    updateToDoResult: false, updateToDoLoading: false, updateToDoError: false, updateToDoMessage: false
}

const toDoReducer = (state = initialState, action) => {
    switch(action.type){
        case GETLIST_TODO_ITEM:
            return { ...state,
                getListToDoResult: action.payload.data,
                getListToDoLoading: action.payload.loading,
                getListToDoError: action.payload.error,
                getListToDoErrorMessage:action.payload.errorMessage
            };
        case DETAIL_TODO_ITEM:
            return { ...state,
                detailToDoResult: action.payload.data,
                detailToDoLoading: action.payload.loading,
                detailToDoError: action.payload.error,
                detailToDoErrorMessage:action.payload.errorMessage
            };
        case DELETE_TODO_ITEM:
            return { ...state,
                deleteToDoResult: action.payload.data,
                deleteToDoLoading: action.payload.loading,
                deleteToDoError: action.payload.error,
                deleteToDoErrorMessage:action.payload.errorMessage
            };
        case CREATE_TODO_ITEM:
            return { ...state,
                createToDoResult: action.payload.data,
                createToDoLoading: action.payload.loading,
                createToDoError: action.payload.error,
                createToDoErrorMessage:action.payload.errorMessage
            };
        case UPDATE_TODO_ITEM:
            return { ...state,
                updateToDoResult: action.payload.data,
                updateToDoLoading: action.payload.loading,
                updateToDoError: action.payload.error,
                updateToDoErrorMessage:action.payload.errorMessage
            };
        default: return state;
    }
}
export default toDoReducer