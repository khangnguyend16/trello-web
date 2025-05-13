import axios from "axios";
import { API_ROOT } from "~/utils/constants";

// Catch lỗi tập trung tại 1 nơi bằng cách tận dụng 1 thứ cực kỳ mạnh mẽ trong axios là Interceptors (đánh chặn vào giữa request hoặc response để xử lý logic mà chúng ta muốn)

// Boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  // axios sẽ trả kế quả về qua property của nó là data
  return response.data;
};

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
  // axios sẽ trả kế quả về qua property của nó là data
  return response.data;
};

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData);
  // axios sẽ trả kế quả về qua property của nó là data
  return response.data;
};

// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return response.data;
};

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData);
  // axios sẽ trả kế quả về qua property của nó là data
  return response.data;
};

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
  // axios sẽ trả kế quả về qua property của nó là data
  return response.data;
};

// Cards
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return response.data;
};
