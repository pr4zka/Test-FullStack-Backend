import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

const toastifySlice = createSlice({
  name: 'toastify',
  initialState: {
    type: '',
    message: '',
    show: true,
  },
  reducers: {
    showToast: (state, action) => {
      const { type, message } = action.payload;
      state.type = type;
      state.message = message;
      state.show = true;
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});

export const { showToast, hideToast } = toastifySlice.actions;

export const showNotification = (type, message) => (dispatch) => {
  dispatch(showToast({ type, message }));
  toast[type](message, {autoClose: 3000});
};


export default toastifySlice.reducer;
