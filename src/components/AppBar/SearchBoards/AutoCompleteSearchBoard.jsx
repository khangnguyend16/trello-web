import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchBoardsAPI } from "~/apis";
import { useDebounceFn } from "~/customHooks/useDebounceFn";

function AutoCompleteSearchBoard() {
  const navigate = useNavigate();

  // State xử lý hiển thị kết quả fetch về từ API
  const [open, setOpen] = useState(false);
  // State lưu trữ danh sách board fetch về được
  const [boards, setBoards] = useState(null);
  // Sẽ hiện loading khi bắt đầu gọi api fetch boards
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Khi đóng cái phần list kết quả lại thì đồng thời clear cho boards về null
    if (!open) {
      setBoards(null);
    }
  }, [open]);

  // Xử lý việc nhận data nhập vào từ input sau đó gọi API để lấy kết quả về (cần cho vào useDebounceFn như bên dưới)
  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value;
    if (!searchValue) return;
    console.log(searchValue);

    // Dùng createSearchParams của react-router-dom để tạo một cái searchPath chuẩn với q[title] để gọi lên API
    const searchPath = `?${createSearchParams({ "q[title]": searchValue })}`;
    console.log(searchPath);

    // Gọi API...
    setLoading(true);
    fetchBoardsAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Bọc hàm handleInputSearchChange vào trong useDebounceFn và cho delay 1s sau khi dừng gõ phím mới chạy function (tránh spam gọi API)
  const debounceSearchBoard = useDebounceFn(handleInputSearchChange, 1000);

  // Khi select chọn một cái board cụ thể thì sẽ điều hướng tới board đó luôn
  const handleSelectedBoard = (event, selectedBoard) => {
    // Phải kiểm tra nếu tồn tại một cái board cụ thể được select thì mới gọi điều hướng - navigate
    console.log(selectedBoard);
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`);
    }
  };

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      // Cái text này hiện ra khi boards là null hoặc sau khi đã fetch boards nhưng rỗng - không có kết quả
      noOptionsText={!boards ? "Type to search board..." : "No board found!"}
      // handle việc đóng mở phần kết quả tìm kiếm
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(board) => board.title}
      options={boards || []}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      // onInputChange sẽ chạy khi gõ nội dung vào thẻ input, làm debounce để tránh việc bị spam gọi API
      onInputChange={debounceSearchBoard}
      // onChange của cả cái Autocomplete sẽ chạy khi select một cái kết quả (ở đây là board)
      onChange={handleSelectedBoard}
      // Render ra cái thẻ input để nhập nội dung tìm kiếm
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress sx={{ color: "white" }} size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& label": { color: "white" },
            "& input": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            ".MuiSvgIcon-root": { color: "white" },
          }}
        />
      )}
    />
  );
}

export default AutoCompleteSearchBoard;
