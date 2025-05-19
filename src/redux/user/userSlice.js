import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// Khởi tạo giá trị của 1 Slice trong redux
const initialState = {
  currentUser: null,
};

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux => dùng middleware createAsyncThunk đi kèm với extraReducers
export const loginUserAPI = createAsyncThunk("user/loginUserAPI", async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data);
  // axios sẽ trả kế quả về qua property của nó là data
  return response.data;
});

// Khởi tạo 1 cái Slice trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: "user",
  initialState,
  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data
      const user = action.payload;
      state.currentUser = user;
    });
  },
});

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// export const {} = userSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export default userSlice.reducer;
