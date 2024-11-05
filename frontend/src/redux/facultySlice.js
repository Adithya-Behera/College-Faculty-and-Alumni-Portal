import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
// Fetch All Faculty Members
export const fetchFaculty = createAsyncThunk('faculty/fetchFaculty', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${apiUrl}/getFaculty`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Filter Faculty Members
export const filterFaculty = createAsyncThunk('faculty/filterFaculty', async (filters, thunkAPI) => {
    try {
        //console.log("in thunks filter->", filters);
        const response = await axios.get(`${apiUrl}/filterFaculty`, {
            params: filters, // Use params to send filters as query parameters
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
// Fetch Faculty Details by ID
export const fetchFacultyDetail = createAsyncThunk('faculty/fetchFacultyDetail', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${apiUrl}/faculty/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Create a New Faculty Member (Admin Only)
export const createFaculty = createAsyncThunk('faculty/createFaculty', async (newFacultyData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    //console.log("crete->", newFacultyData);
    try {
        const response = await axios.post(`${apiUrl}/createFaculty`, newFacultyData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Update an Existing Faculty Member (Admin Only)
export const updateFaculty = createAsyncThunk('faculty/updateFaculty', async ({ id, data }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
        const response = await axios.patch(`${apiUrl}/updateFaculty/${id}`, data, {
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

// Delete a Faculty Member (Admin Only)
export const deleteFaculty = createAsyncThunk('faculty/deleteFaculty', async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    
    try {
        await axios.delete(`${apiUrl}/deleteFaculty/${id}`, {
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
const facultySlice = createSlice({
    name: 'faculty',
    initialState: {
        facultyList: [],
        facultyDetail: null,
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
            .addCase(fetchFaculty.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFaculty.fulfilled, (state, action) => {
                state.loading = false;
                state.facultyList = action.payload.data;
            })
            .addCase(fetchFaculty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(filterFaculty.fulfilled, (state, action) => {
                state.facultyList = action.payload.data;
            })
            .addCase(fetchFacultyDetail.fulfilled, (state, action) => {
                state.facultyDetail = action.payload.data;
            })
            .addCase(createFaculty.fulfilled, (state, action) => {
                state.facultyList.push(action.payload.data);
                state.successMessage = "Faculty member created successfully";
            })
            .addCase(updateFaculty.fulfilled, (state, action) => {
                const index = state.facultyList.findIndex(f => f._id === action.payload.data._id);
                if (index !== -1) {
                    state.facultyList[index] = action.payload.data;
                }
                state.facultyDetail = action.payload.data;
                state.successMessage = "Faculty member updated successfully";
            })
            .addCase(deleteFaculty.fulfilled, (state, action) => {
                state.facultyList = state.facultyList.filter(f => f._id !== action.payload);
                state.successMessage = "Faculty member deleted successfully";
            });
    },
});

export const { setFilterCriteria, clearSuccessMessage } = facultySlice.actions;
export default facultySlice.reducer;
