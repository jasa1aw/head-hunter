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
        setError: (state, action) => {
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {setApplies, setApply, removeApply, setError} = applySlice.actions

export const getEmployeeApplies = (data) => (dispatch) => {
    axios.get(`${END_POINT}/api/applies/employee`, data).then(res => {
        dispatch(setApplies(res.data))
    }).catch(e => {
        dispatch(setError(e.response.data))
    })
}

export const createApply = (data) => (dispatch) => {
    axios.post(`${END_POINT}/api/applies`, data).then(res => {
        dispatch(setApply(res.data))
    }).catch(e => {
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

export default applySlice.reducer