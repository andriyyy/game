import React from "react";
import LeadersList from "./LeadersList";
import ListItem from "@material-ui/core/ListItem";
import { Typography } from "@material-ui/core";

const flexContainer = {
  flexDirection: "column",
};

const typography = {
  width: "100%",
  paddingLeft: "32px",
};

function Leaders(props) {
  const { winners } = props;

  return (
    <ListItem style={flexContainer}>
      <Typography style={typography} component="h2" variant="h5">
        Leader Board
      </Typography>
      <LeadersList winners={winners} />
    </ListItem>
  );
}

export default Leaders;
