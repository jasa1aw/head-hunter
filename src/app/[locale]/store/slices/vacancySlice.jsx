import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { END_POINT, SEARCH_END_POINT } from '@/config/end-point';


export const vacancySlice = createSlice({
    name: 'vacancy',
    initialState: {
    vacancies: [],
    vacancy: {},
    specializations: [],
    cities: [],
    experiences: [],
    skills: [],
    empTypes: [],
    },
    reducers: {
        setMyVacancies: (state, action) =>{
            state.vacancies = action.payload.vacancies
        },
        setVacancy: (state, action) => {
            state.vacancy = action.payload.vacancy
        },
        handleDeleteVacancy: (state, action) => {
            let vacancies = [...state.vacancies]
            vacancies = vacancies.filter(item => item.id !== action.payload)
            state.vacancies = vacancies
        },
        setSpecializations: (state, action) =>{
            state.specializations = action.payload
        }, 
        setCities: (state, action) =>{
            state.cities = action.payload
        },
        setExperiences: (state, action) =>{
            state.experiences = action.payload
        },
        setSkills: (state, action) => {
            state.skills = action.payload
        },
        setEmpTypes : (state, action) => {
            state.empTypes = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setMyVacancies, setVacancy, handleDeleteVacancy, setSpecializations, setCities, setExperiences, setSkills, setEmpTypes} = vacancySlice.actions

export const getMyVacancies = () => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/vacancy`);
        dispatch(setMyVacancies({vacancies: res.data}))
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }    
}

export const getSpecializations = () => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/specializations`);
        dispatch(setSpecializations(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }
}

export const getCities = () => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/region/cities`);
        dispatch(setCities(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }
}

export const getExperiences = () => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/experiences`);
        dispatch(setExperiences(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }
}

export const getSkills = () => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/skills`);
        dispatch(setSkills(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }
}

export const getEmpTypes = () => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/employment-types`);
        dispatch(setEmpTypes(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }
}

export const getMyVacancyById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/vacancy/${id}`);
        console.log(res.data);
        dispatch(setVacancy({vacancy: res.data}))
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }    
}

export const createVacancy = (sendData, router) => async(dispatch) => {
    try {
        const res = await axios.post(`${END_POINT}/api/vacancy`, sendData);
        router.push('/vacancy')
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }   
} 
export const editVacancy = (sendData, router) => async(dispatch) => {
    try {
        const res = await axios.put(`${END_POINT}/api/vacancy`, sendData);
        router.push('/vacancy')
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }   
} 

export const deleteVacancy = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`);
        dispatch(handleDeleteVacancy(id))
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }   
}

export const updateVacancy = (sendData, router) => async(dispatch) => {
    try {
        const res = await axios.put(`${END_POINT}/api/vacancy`, sendData);
        router.push('/vacancy')
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }   
} 


export const getSearchedVacancies = (params, router) => async (dispatch) => {
    try {
        console.log(params);
        const res = await axios.post(`${SEARCH_END_POINT}/api/vacancies/searchVacanciesByParams`, params );
        dispatch(setMyVacancies({ vacancies: res.data.original }));
        const queryString = new URLSearchParams(params).toString()
        console.log(queryString)
        router.push(`/search/vacancy?${queryString}`);
    } catch (e) {
        console.log(e);
        alert("Что-то пошло не так, сообщите об ошибке технической поддержке сайта!");
    }
};









export default vacancySlice.reducer