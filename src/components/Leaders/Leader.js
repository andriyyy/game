import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const flexContainer = {
  display: "flex",
  justifyContent: "space-between",
  width: "400px",
};
const column = {
  width: "50%",
};
function Leader(props) {
  const { winner } = props;
  return (
    <ListItem button style={flexContainer}>
      <ListItemText style={column} primary={`${winner.winner}`} />
      <ListItemText style={column} primary={`${winner.date}`} />
    </ListItem>
  );
}

export default Leader;
