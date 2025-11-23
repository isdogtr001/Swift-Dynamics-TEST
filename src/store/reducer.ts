import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Value {
  key: string;
  title: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  nationality: string;
  gender: string;
  phoneCode: string;
  mobileNo: string;
  passportNo: string;
  expectSalaly: string;
  name: string;
  id: string;
}

export type MainData = Value[];

const loadFromLocalStorage = (): Value[] => {
  try {
    const saved = localStorage.getItem('values');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load from localStorage', e);
  }
  return []; // default ถ้าไม่มีค่า
};

const initialState: MainData = loadFromLocalStorage();

const dataManager = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    delete: (state, action: PayloadAction<{ key: string }>) => {
      const newState = state.filter((item) => item.key !== action.payload.key);
      console.log(action.payload.key);
      console.log('newState', newState);

      try {
        localStorage.setItem('values', JSON.stringify(newState));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }

      return newState;
    },
    edit: (state, action: PayloadAction<Value>) => {
      const index = state.findIndex((item) => item.key === action.payload.key);
      if (index !== -1) {
        state[index] = action.payload;
      }

      try {
        localStorage.setItem('values', JSON.stringify(state)); // ✅ save หลัง edit
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    },
    setValue: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
      try {
        localStorage.setItem('values', JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    },
  },
});

export const { delete: deleteItem, edit, setValue } = dataManager.actions;
export default dataManager.reducer;
