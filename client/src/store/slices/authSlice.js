import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const login = createAsyncThunk('auth/login',
  async (credentials, { rejectWithValue }) => {
    try { return await authService.login(credentials); }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);

export const register = createAsyncThunk('auth/register',
  async (userData, { rejectWithValue }) => {
    try { return await authService.register(userData); }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('unikart_user')) || null,
    token: localStorage.getItem('unikart_token') || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    setUser:    (state, action) => { state.user = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending,    (state) => { state.isLoading = true; state.error = null; })
      .addCase(login.fulfilled,  (state, action) => {
        state.isLoading = false;
        state.user  = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('unikart_user',  JSON.stringify(action.payload.user));
        localStorage.setItem('unikart_token', action.payload.token);
      })
      .addCase(login.rejected,   (state, action) => {
        state.isLoading = false; state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null; state.token = null;
        localStorage.removeItem('unikart_user');
        localStorage.removeItem('unikart_token');
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;