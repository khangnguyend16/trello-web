import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// Khởi tạo giá trị của 1 Slice trong redux
const initialState = {
  currentNotifications: null,
};

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux => dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchInvitationsAPI = createAsyncThunk("notifications/fetchInvitationsAPI", async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`);
  return response.data;
});

export const updateBoardInvitationAPI = createAsyncThunk("notifications/updateBoardInvitationAPI", async ({ status, invitationId }) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status });
  return response.data;
});

// Khởi tạo 1 cái Slice trong kho lưu trữ - Redux Store
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null;
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload;
    },
    addNotification: (state, action) => {
      const incomingNotification = action.payload;
      state.currentNotifications.unshift(incomingNotification);
    },
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data
      let incomingInvitations = action.payload;
      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : [];
    });
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload;

      const getInvitation = state.currentNotifications.find((notification) => notification._id === incomingInvitation._id);
      getInvitation.boardInvitation = incomingInvitation.boardInvitation;
    });
  },
});

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { clearCurrentNotifications, updateCurrentNotifications, addNotification } = notificationsSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications;
};

export const notificationsReducer = notificationsSlice.reducer;
