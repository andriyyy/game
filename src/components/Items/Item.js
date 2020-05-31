import React from "react";
import "./index.css";

const item = {
  width: "30px",
  height: "30px",
  borderRight: "1px solid grey",
  borderBottom: "1px solid grey",
  float: "left",
  cursor: "pointer",
};

function Item(props) {
  const { field } = props;

  const onFieldChange = (event) => {
    const id = event.target.id;
    props.onFieldChange(+id);
  };

  return (
    <div
      className={field.class}
      id={field.id}
      onClick={onFieldChange}
      style={item}
    ></div>
  );
}

export default Item;
