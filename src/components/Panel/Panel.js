import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const inputComponnent = {
  width: "200px",
  marginRight: "20px",
};
const buttonComponnent = {
  marginTop: "10px",
};
const messageComponnent = {
  marginBottom: "20px",
  marginTop: "20px",
};
class Panel extends Component {
  state = {
    name: "",
    mode: "",
    play: false,
    disabled: false,
    button: "Play",
    user: "",
    errorTab: false,
  };

  onNameChange = (event) => {
    const name = event.target.value;
    this.setState({ name });
    this.props.onNameChange(name);
  };

  onModeChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const mode = event.target.value;
    this.setState({ mode });
  };

  onPlayChange = (event) => {
    if (this.state.name !== "" && this.state.mode !== "") {
      this.setState({ disabled: true });
    }
    this.props.onPlayChange(this.state.mode, this.state.name);
    this.setState({ user: "" });
    this.setState({ errorTab: false });
  };

  onStartNewGame = (user) => {
    this.setState({ disabled: false });
    this.setState({ button: "PLAY AGAIN" });
    this.setState({ user });
  };

  openErrorTab = () => {
    this.setState({ errorTab: true });
  };
  render() {
    const { name } = this.state;
    const { modes } = this.props;

    return (
      <div>
        <FormControl style={inputComponnent}>
          <InputLabel htmlFor="mode">Pick game mode:</InputLabel>
          <Select
            value={this.state.mode}
            onChange={this.onModeChange}
            inputProps={{
              name: "mode",
              id: "mode",
            }}
          >
            {modes.map((mode, key) => (
              <MenuItem key={key} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={inputComponnent}>
          <InputLabel htmlFor="name">Enter your name: </InputLabel>
          <Input
            id="name"
            name="name"
            autoFocus
            value={name}
            onChange={this.onNameChange}
          />
        </FormControl>
        <FormControl style={buttonComponnent}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onPlayChange}
            disabled={this.state.disabled}
          >
            {this.state.button}
          </Button>
        </FormControl>

        {this.state.user && this.state.user !== "Computer" && (
          <Alert style={messageComponnent} severity="success">
            User {this.state.user} won!
          </Alert>
        )}
        {this.state.user && this.state.user === "Computer" && (
          <Alert style={messageComponnent} severity="error">
            Computer won!
          </Alert>
        )}
        {this.state.errorTab && (
          <Alert style={messageComponnent} severity="error">
            Fill in all data, please.
          </Alert>
        )}
      </div>
    );
  }
}

export default Panel;
