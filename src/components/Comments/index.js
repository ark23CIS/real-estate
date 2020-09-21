import React from "react";
import { CardHeader, TextField, Avatar, Icon } from "@material-ui/core";

function index({ comments }) {
  return (
    <div>
      <CardHeader
        title={
          <TextField
            multiline
            value={null}
            onChange={null}
            placeholder="Leave a comment"
            margin="normal"
          />
        }
      />
      {comments.map((item, i) => {
        return (
          <CardHeader avatar={<Avatar src={``} />} title={null} key={`${i}`} />
        );
      })}
    </div>
  );
}

export default index;
