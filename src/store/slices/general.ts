import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GeneralSliceState {
  showSpinningLoader: boolean;
}

const initialState: GeneralSliceState = {
  showSpinningLoader: false,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.showSpinningLoader = action?.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(REHYDRATE, (state: GeneralSliceState) => {
    //   console.log('REHYDRATED', state.showSpinningLoader);
    //   state.showSpinningLoader = false;
    // });
  },
});

export const { toggleLoader } = generalSlice.actions;
