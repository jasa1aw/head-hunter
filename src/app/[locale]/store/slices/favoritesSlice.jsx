import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { END_POINT } from '@/config/end-point';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,    // For storing error messages
    },
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload.favorites;
        },
        addFavorite: (state, action) => {
            // Prevent adding duplicate favorites
            const exists = state.favorites.some(fav => fav.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setFavorites, addFavorite, removeFavorite, setStatus, setError } = favoritesSlice.actions;

// Async thunks for API calls
export const getFavorites = () => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const res = await axios.get(`${END_POINT}/api/favorites`);
        dispatch(setFavorites({ favorites: res.data }));
        dispatch(setStatus('succeeded'));
    } catch (e) {
        dispatch(setError('Failed to fetch favorites.'));
        dispatch(setStatus('failed'));
        alert("Что то пошло не так, сообщите об ошибке тех. спецам");
        console.log(e);
    }
};

export const addFavoriteItem = (favoriteData) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const res = await axios.post(`${END_POINT}/api/favorites`, favoriteData);
        dispatch(addFavorite({ id: res.data.id, ...favoriteData }));
        dispatch(setStatus('succeeded'));
    } catch (e) {
        dispatch(setError('Failed to add favorite.'));
        dispatch(setStatus('failed'));
        alert("Что то пошло не так, сообщите об ошибке тех. спецам");
        console.log(e);
    }
};

export const removeFavoriteItem = (id) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        await axios.delete(`${END_POINT}/api/favorites/${id}`);
        dispatch(removeFavorite(id));
        dispatch(setStatus('succeeded'));
    } catch (e) {
        dispatch(setError('Failed to remove favorite.'));
        dispatch(setStatus('failed'));
        alert("Что то пошло не так, сообщите об ошибке тех. спецам");
        console.log(e);
    }
};

export default favoritesSlice.reducer;
