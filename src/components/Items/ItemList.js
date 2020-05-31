import React from "react";
import Item from "./Item";
import ListItem from "@material-ui/core/ListItem";

const cub = {
  alignItems: "start",
  paddingTop: "40px",
};

const easyMode = {
  width: "155px",
  height: "155px",
  borderTop: "1px solid grey",
  borderLeft: "1px solid grey",
};
const normalMode = {
  width: "310px",
  height: "310px",
  borderTop: "1px solid grey",
  borderLeft: "1px solid grey",
};
const hardMode = {
  width: "465px",
  height: "465px",
  borderTop: "1px solid grey",
  borderLeft: "1px solid grey",
};

function ItemList(props) {
  const { fields, mode } = props;
  var style = easyMode;
  if (mode === "normalMode") {
    style = normalMode;
  }
  if (mode === "hardMode") {
    style = hardMode;
  }

  return (
    <ListItem style={cub}>
      <div style={style}>
        {Object.entries(fields).map(([key, value]) => {
          return <Item key={key} field={value} {...props} />;
        })}
      </div>
    </ListItem>
  );
}

export default ItemList;
