import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// Khởi tạo giá trị của 1 Slice trong redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false,
};

// // Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux => dùng middleware createAsyncThunk đi kèm với extraReducers
// export const fetchCardDetailsAPI = createAsyncThunk("activeCard/fetchCardDetailsAPI", async (cardId) => {
//   const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cards/${cardId}`);
//   // axios sẽ trả kế quả về qua property của nó là data
//   return response.data;
// });

// Khởi tạo 1 cái Slice trong kho lưu trữ - Redux Store
export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true;
    },

    // Clear data và đóng modal ActiveCard
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
      state.isShowModalActiveCard = false;
    },

    updateCurrentActiveCard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây nó dc gán ra 1 biến có nghĩa hơn
      const fullCard = action.payload;

      // Xử lý dữ liệu nếu cần thiết...

      // Update lại dữ liệu của cái currentActiveCard
      state.currentActiveCard = fullCard;
    },
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchCardDetailsAPI.fulfilled, (state, action) => {
  //       // action.payload ở đây chính là response.data
  //       let card = action.payload;

  //       // Xử lý dữ liệu
  //       // Sxep thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con
  //       card.columns = mapOrder(card.columns, card.columnOrderIds, "_id");

  //       card.columns.forEach((column) => {
  //         // Khi f5 trang web thì cần xử lý vấn đề kéo thả vào 1 column rỗng
  //         if (isEmpty(column.cards)) {
  //           column.cards = [generatePlaceholderCard(column)];
  //           column.cardOrderIds = [generatePlaceholderCard(column)._id];
  //         } else {
  //           // Sxep thứ tự các card luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con
  //           column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
  //         }
  //       });

  //       // Update lại dữ liệu của cái currentActiveCard
  //       state.currentActiveCard = card;
  //     });
  //   },
});

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { clearAndHideCurrentActiveCard, updateCurrentActiveCard, showModalActiveCard } = activeCardSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};

export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard;
};

export const activeCardReducer = activeCardSlice.reducer;
// export const activeCardReducer = activeCardSlice.reducer
