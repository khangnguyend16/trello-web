import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";

const MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : "#1976d2"),
        "&::-webkit-scrollbar-track": { m: 2 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label={board?.title} clickable />
        </Tooltip>
        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "#a4b0be" },
            },
          }}
        >
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://img.freepik.com/premium-vector/round-icon-young-man-avatar-face-flat-style_768258-2077.jpg" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar
              alt="Khang"
              src="https://static.vecteezy.com/system/resources/previews/004/477/337/non_2x/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg"
            />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY3qp4vyt8ko3KsV7B5nMDnOpVMjufZQxBMw&s" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar
              alt="Khang"
              src="https://static.vecteezy.com/system/resources/previews/001/783/581/non_2x/round-avatar-with-young-man-free-vector.jpg"
            />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWOFXk4y0sZ1sdcBEEHKGdmAFXuSpafSP1Q&s" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pc0jhWSk63wc7aDE0uoUTdEWC1xcDVAd2Q&s" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://img.freepik.com/premium-vector/round-icon-young-man-avatar-face-flat-style_768258-2077.jpg" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar
              alt="Khang"
              src="https://static.vecteezy.com/system/resources/previews/004/477/337/non_2x/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg"
            />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY3qp4vyt8ko3KsV7B5nMDnOpVMjufZQxBMw&s" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar
              alt="Khang"
              src="https://static.vecteezy.com/system/resources/previews/001/783/581/non_2x/round-avatar-with-young-man-free-vector.jpg"
            />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWOFXk4y0sZ1sdcBEEHKGdmAFXuSpafSP1Q&s" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg" />
          </Tooltip>
          <Tooltip title="Khang">
            <Avatar alt="Khang" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pc0jhWSk63wc7aDE0uoUTdEWC1xcDVAd2Q&s" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
