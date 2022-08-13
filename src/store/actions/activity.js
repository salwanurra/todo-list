import axios from "axios";

export const GET_ACTIVITY = "GET_ACTIVITY"
export const GET_DETAIL_ACTIVITY = "GET_DETAIL_ACTIVITY"
export const DELETE_ACTIVITY = "DELETE_ACTIVITY"
export const CREATE_ACTIVITY = "CREATE_ACTIVITY"
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY"

export const getAllActivity = () => {
    return async(dispatch) => {
        try {
            // loading
            dispatch({
                type: GET_ACTIVITY,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resGetActivity = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups?email=salwanurs09%40gmail.com`)

            dispatch({
                type: GET_ACTIVITY,
                payload: {
                    loading: false,
                    data: resGetActivity.data.data,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: GET_ACTIVITY,
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

export const getDetailActivity = ({id}) => {
    return async(dispatch) => {
        try {
            // loading
            dispatch({
                type: GET_DETAIL_ACTIVITY,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resGetActivity = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)

            dispatch({
                type: GET_DETAIL_ACTIVITY,
                payload: {
                    loading: false,
                    data: resGetActivity.data,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: GET_DETAIL_ACTIVITY,
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

export const deleteActivity = (id) => {
    return async(dispatch) => {
        try {
            // loading
            dispatch({
                type: DELETE_ACTIVITY,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resDeleteActivity = await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)

            dispatch({
                type: DELETE_ACTIVITY,
                payload: {
                    loading: false,
                    data: resDeleteActivity.data,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: DELETE_ACTIVITY,
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

export const createActivity = () => {
    return async(dispatch) => {
        try {
            // loading
            const createActivity = {
                title: "New Activity",
                email: "salwanurs09@gmail.com",
            }
            dispatch({
                type: CREATE_ACTIVITY,
                payload: {
                    loading: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resCreateActivity = await axios.post(`https://todo.api.devcode.gethired.id/activity-groups/`, createActivity)
            dispatch({
                type: CREATE_ACTIVITY,
                payload: {
                    loading: false,
                    data: resCreateActivity,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: CREATE_ACTIVITY,
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


export const updateActivity = ({id, title}) => {
    return async(dispatch) => {
        try {
            // loading
            dispatch({
                type: UPDATE_ACTIVITY,
                payload: {
                    loading: true,
                    click: true,
                    data: false,
                    error: false,
                    errorMessage: false
                }
            })
            const resUpdateActivity = await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, {
                title: title
            })
            dispatch({
                type: UPDATE_ACTIVITY,
                payload: {
                    loading: false,
                    click: false,
                    data: resUpdateActivity,
                    error: false,
                    errorMessage: false
                }
            })
        } catch (error){
            dispatch({
                type: UPDATE_ACTIVITY,
                payload: {
                    loading: false,
                    click: false,
                    data: false,
                    error: true,
                    errorMessage: error
                }
            })
        }
    };
};