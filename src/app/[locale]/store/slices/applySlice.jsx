import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { END_POINT } from '@/config/end-point';;


export const applySlice = createSlice({
    name: 'apply',
    initialState: {
        applies: [],
        apply: {}
        },
    reducers: {
        setApplies: (state, action) => {
            state.applies = action.payload
        },
        appendApply: (state, action) => {
            state.applies = [...state.applies, action.payload]
        },
        removeApply: (state, action) => {
            let applies = [...state.applies]
            applies = applies.filter(item => item.id !== action.payload)
            state.applies = applies
        },
        setApplyStatus: (state, action) => {
            let applies = [...state.applies]
            applies = applies.map(item => {
                if(item.id === action.payload.applyId) {
                    item.status = action.payload.status;
                }
                return item;
            })
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setApplies, setApply, removeApply, setApplyStatus, setError} = applySlice.actions

export const getEmployeeApplies = () => (dispatch) => {
    axios.get(`${END_POINT}/api/applies/employee`).then(res => {
        dispatch(setApplies(res.data))
    }).catch(e => {
        console.log(e)
        dispatch(setError(e.response.data))
    })
}

export const getVacancyApplies = (id) => (dispatch) => {
    axios.get(`${END_POINT}/api/applies/vacancy/${id}`).then(res => {
        dispatch(setApplies(res.data))
    }).catch(e => {
        console.log(e)
        dispatch(setError(e.response.data))
    })
}

export const createApply = (data) => (dispatch) => {
    axios.post(`${END_POINT}/api/applies`, data).then(res => {
        dispatch(appendApply(res.data))
    }).catch(e => {
        console.log(e)
        dispatch(setError(e.response.data))
    })
}

export const deleteApply = (id) => (dispatch) => {
    axios.delete(`${END_POINT}/api/applies/${id}`).then(res => {
        dispatch(removeApply(id))
    }).catch(e => {
        dispatch(setError(e.response.data))
    })
}

export const acceptApply = (applyId) => (dispatch) => {
    axios.put(`${END_POINT}/api/applies/accept/employee`, {applyId}).then(res => {
        dispatch(setApplyStatus({applyId, status: "INVITATION"}))
    }).catch(e => {
        console.log(e)
        dispatch(setError(e.response.data))
    })
} 

export const declineApply = (applyId) => (dispatch) => {
    axios.put(`${END_POINT}/api/applies/decline/employee`, {applyId}).then(res => {
        dispatch(setApplyStatus({applyId, status: "DECLINED"}))
    }).catch(e => {
        console.log(e)
        dispatch(setError(e.response.data))
    })
} 

export default applySlice.reducer