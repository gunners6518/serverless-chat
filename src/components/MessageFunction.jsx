import { deleteMessage } from "react-chat-engine";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import Button from "@material-ui/core/Button";

export const MessageFunction = (props) => {
  //クリックメニューを作る
  const [anchorEl, setAnchorEl] = useState(null);
  const { creds, activeChat, message } = props.props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("aaa");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //メッセージ編集
  const handleEdit = () => {};

  //メッセージ削除
  const handleDelete = (e) => {
    deleteMessage(props.props, activeChat, message.id);
  };

  return (
    <div
      style={{
        width: "16px",
        height: "16px",
        margin: "0 45px 5px auto",
      }}
    >
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <EllipsisOutlined />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
