import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";
import { mapOrder } from "~/utils/sorts";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

// Khởi tạo giá trị của 1 Slice trong redux
const initialState = {
  currentActiveBoard: null,
};

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux => dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk("activeBoard/fetchBoardDetailsAPI", async (boardId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`);
  // axios sẽ trả kế quả về qua property của nó là data
  return response.data;
});

// Khởi tạo 1 cái Slice trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  // Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây nó dc gán ra 1 biến có nghĩa hơn
      const board = action.payload;

      // Xử lý dữ liệu nếu cần thiết...

      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board;
    },
    updateCardInBoard: (state, action) => {
      // Update nested data
      const incomingCard = action.payload;

      // Tìm dần từ board -> column -> card
      const column = state.currentActiveBoard.columns.find((i) => i._id === incomingCard.columnId);
      if (column) {
        const card = column.cards.find((i) => i._id === incomingCard._id);
        if (card) {
          // card.title = incomingCard.title;
          Object.keys(incomingCard).forEach((key) => {
            card[key] = incomingCard[key];
          });
        }
      }
    },
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data
      let board = action.payload;

      // Thành viên trong board sẽ gộp lại của 2 mảng owners và members
      board.FE_allUsers = board.owners.concat(board.members);

      // Xử lý dữ liệu
      // Sxep thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

      board.columns.forEach((column) => {
        // Khi f5 trang web thì cần xử lý vấn đề kéo thả vào 1 column rỗng
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          // Sxep thứ tự các card luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });

      // Update lại dữ liệu của cái currentActiveBoard
      state.currentActiveBoard = board;
    });
  },
});

// Action creators are generated for each case reducer function
// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export default activeBoardSlice.reducer;
// export const activeBoardReducer = activeBoardSlice.reducer
