import { useState } from "react";
import TextField from "@mui/material/TextField";

function ToggleFocusInput({ value, onChangedValue, inputFontSize = "16px", ...props }) {
  const [inputValue, setInputValue] = useState(value);

  // Blur là khi chúng ta không còn Focus vào phần tử nữa thì sẽ trigger hành động ở đây.
  const triggerBlur = () => {
    // Support Trim cái dữ liệu State inputValue cho đẹp sau khi blur ra ngoài
    setInputValue(inputValue.trim());

    // Nếu giá trị không có gì thay đổi hoặc Nếu user xóa hết nội dung thì set lại giá trị gốc ban đầu theo value từ props và return luôn không làm gì thêm
    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value);
      return;
    }

    // Nếu giá trị ko có j thay đổi thì cũng return luôn không làm gì
    if (inputValue === value) {
      return;
    }

    // Khi giá trị có thay đổi ok thì gọi lên func ở Props cha để xử lý
    onChangedValue(inputValue);
  };

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      onBlur={triggerBlur}
      {...props}
      sx={{
        "& label": {},
        "& input": { fontSize: inputFontSize, fontWeight: "bold" },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          "& fieldset": { borderColor: "transparent" },
        },
        "& .MuiOutlinedInput-root:hover": {
          borderColor: "transparent",
          "& fieldset": { borderColor: "transparent" },
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#33485D" : "white"),
          "& fieldset": { borderColor: "primary.main" },
        },
        "& .MuiOutlinedInput-input": {
          px: "6px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
    />
  );
}

export default ToggleFocusInput;
