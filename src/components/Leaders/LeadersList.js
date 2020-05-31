import React from "react";
import Leader from "./Leader";
import List from "@material-ui/core/List";

const list = {
  width: "100%",
};

function LeaderList(props) {
  const { winners } = props;
  return (
    <List dense style={list}>
      {winners.map((winner, key) => (
        <Leader key={key} winner={winner} />
      ))}
    </List>
  );
}

export default LeaderList;
