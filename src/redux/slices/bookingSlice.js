import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking_id: 0,
  currentStep: 1,
  venue: null,
  bookingDate: {
    booking_start: null,
    booking_end: null,
    booking_time: null,
  },
  event_type: null,
  package: null,
  service: null,
  guest_info: null,
  contact_info: null,
  total_price: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setVenue: (state, action) => {
      state.venue = action.payload;
    },
    setPackage: (state, action) => {
      state.package = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setGuestInfo: (state, action) => {
      state.guest_info = action.payload;
    },
    setContactInfo: (state, action) => {
      state.contact_info = action.payload;
    },
    setBookingDate: (state, action) => {
      state.bookingDate = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.total_price = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    resetBooking: () => initialState,
  },
});

export const {
  setVenue,
  setPackage,
  setService,
  setGuestInfo,
  setContactInfo,
  setBookingDate,
  setTotalPrice,
  nextStep,
  prevStep,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
