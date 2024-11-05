import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
// Fetch All Alumni
export const fetchAlumni = createAsyncThunk('alumni/fetchAlumni', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${apiUrl}/getAlumni`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Filter Alumni Members
export const filterAlumni = createAsyncThunk('alumni/filterAlumni', async (filters, thunkAPI) => {
    try {
        const response = await axios.get(`${apiUrl}/filterAlumni`, {
            params: filters, // Use params to send filters as query parameters
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Fetch Alumni Details by ID
export const fetchAlumniDetail = createAsyncThunk('alumni/fetchAlumniDetail', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${apiUrl}/alumni/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Create a New Alumni Member (Admin Only)
export const createAlumni = createAsyncThunk('alumni/createAlumni', async (newAlumniData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
        const response = await axios.post(`${apiUrl}/createAlumni`, newAlumniData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Update an Existing Alumni Member (Admin Only)
export const updateAlumni = createAsyncThunk('alumni/updateAlumni', async ({ id, data }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
        const response = await axios.patch(`${apiUrl}/updateAlumni/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Delete an Alumni Member (Admin Only)
export const deleteAlumni = createAsyncThunk('alumni/deleteAlumni', async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
        await axios.delete(`${apiUrl}/deleteAlumni/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Slice Definition
const alumniSlice = createSlice({
    name: 'alumni',
    initialState: {
        alumniList: [],
        alumniDetail: null,
        filterCriteria: {},
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setFilterCriteria(state, action) {
            state.filterCriteria = action.payload;
        },
        clearSuccessMessage(state) {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlumni.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlumni.fulfilled, (state, action) => {
                state.loading = false;
                state.alumniList = action.payload.data;
            })
            .addCase(fetchAlumni.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(filterAlumni.fulfilled, (state, action) => {
                state.alumniList = action.payload.data;
            })
            .addCase(fetchAlumniDetail.fulfilled, (state, action) => {
                state.alumniDetail = action.payload.data;
            })
            .addCase(createAlumni.fulfilled, (state, action) => {
                state.alumniList.push(action.payload.data);
                state.successMessage = "Alumni member created successfully";
            })
            .addCase(updateAlumni.fulfilled, (state, action) => {
                const index = state.alumniList.findIndex(a => a._id === action.payload.data._id);
                if (index !== -1) {
                    state.alumniList[index] = action.payload.data;
                }
                state.alumniDetail = action.payload.data;
                state.successMessage = "Alumni member updated successfully";
            })
            .addCase(deleteAlumni.fulfilled, (state, action) => {
                state.alumniList = state.alumniList.filter(a => a._id !== action.payload);
                state.successMessage = "Alumni member deleted successfully";
            });
    },
});

export const { setFilterCriteria, clearSuccessMessage } = alumniSlice.actions;
export default alumniSlice.reducer;
