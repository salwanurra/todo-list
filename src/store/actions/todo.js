import axios from "axios";

export const GETLIST_TODO_ITEM = "GETLIST_TODO_ITEM"
export const DETAIL_TODO_ITEM = "DETAIL_TODO_ITEM"
export const DELETE_TODO_ITEM = "DELETE_TODO_ITEM"
export const CREATE_TODO_ITEM = "CREATE_TODO_ITEM"
export const UPDATE_TODO_ITEM = "UPDATE_TODO_ITEM"

export const getListToDo = ({id}) => {
    return async(dispatch) => {
        try {
            // loading
            dispatch({
                type: GETLIST_TODO_ITEM,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resListToDo = await axios.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`)

            dispatch({
                type: GETLIST_TODO_ITEM,
                payload: {
                    loading: false,
                    data: resListToDo.data.data,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: GETLIST_TODO_ITEM,
                payload: {
                    loading: false,
                    data: false,
                    error: true,
                    errorMessage: error
                }
            })
        }
    };
};

export const detailToDo = (id) => {
    return async(dispatch) => {
        try {
            // loading
            dispatch({
                type: DETAIL_TODO_ITEM,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resDetailToDo = await axios.get(`https://todo.api.devcode.gethired.id/todo-items/${id}`)

            dispatch({
                type: DETAIL_TODO_ITEM,
                payload: {
                    loading: false,
                    data: resDetailToDo,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: DETAIL_TODO_ITEM,
                payload: {
                    loading: false,
                    data: false,
                    error: true,
                    errorMessage: error
                }
            })
        }
    };
};

export const createToDo = (title, priority, is_active, id) => {
    return async(dispatch) => {
        try {
            // loading
            const createItem = {
                title: title,
                priority: priority,
                is_active: true,
                activity_group_id: id
            }
            dispatch({
                type: CREATE_TODO_ITEM,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resCreateActivity = await axios.post(`https://todo.api.devcode.gethired.id/todo-items`, createItem)
            dispatch({
                type: CREATE_TODO_ITEM,
                payload: {
                    loading: false,
                    data: resCreateActivity,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: CREATE_TODO_ITEM,
                payload: {
                    loading: false,
                    data: false,
                    error: true,
                    errorMessage: error
                }
            })
        }
    };
};

export const deleteToDo = (id) => {
    return async(dispatch) => {
        try {
            // loading
            dispatch({
                type: DELETE_TODO_ITEM,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resDeleteToDo = await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
            dispatch({
                type: DELETE_TODO_ITEM,
                payload: {
                    loading: false,
                    data: resDeleteToDo.data,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: DELETE_TODO_ITEM,
                payload: {
                    loading: false,
                    data: false,
                    error: true,
                    errorMessage: error.response.data
                }
            })
        }
    };
};

export const updateToDo = ({id, data}) => {
    return async(dispatch) => {
        try {

            dispatch({
                type: UPDATE_TODO_ITEM,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resUpdateToDo = await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, data)
            dispatch({
                type: UPDATE_TODO_ITEM,
                payload: {
                    loading: false,
                    data: resUpdateToDo,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: UPDATE_TODO_ITEM,
                payload: {
                    loading: false,
                    data: false,
                    error: true,
                    errorMessage: error
                }
            })
        }
    };
};