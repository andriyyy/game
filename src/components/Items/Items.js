import React, { Component } from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import styled from "styled-components";
import { serverFetchData, addWinner } from "../../actions/settings";
import Panel from "../Panel";
import Leaders from "../Leaders";
import ItemList from "../Items/ItemList";

import {
  getSettings,
  getSettingsIsLoading,
  getSettingsError,
  getWinners,
  getWinnersIsLoading,
  getWinnersError,
  getModes,
} from "../../selectors/Selectors";

const StyledPaper = styled(Paper)`
  margin: 50px;
  padding: 50px;
`;
const StyledCircularProgress = styled(CircularProgress)`
  margin-left: 50%;
`;
const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
};

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "easyMode",
      name: "",
      play: false,
      range: [],
      fields: [],
      delay: 0,
      randomId: false,
      pushedId: false,
      computerScore: 0,
      userScore: 0,
      currentField: 0,
      finish: false,
    };
    this.PanelElement = React.createRef();
  }
  componentDidMount() {
    this.props.serverFetchData();
    this.updateRangeFields();
  }

  updateRangeFields(max = 25) {
    const range = R.range(0, max);
    this.setState({ range: range });
    const fields = [];
    range.map((item, key) => {
      return fields.push({ id: key, class: "white" });
    });
    this.setState({ fields: R.indexBy(R.prop("id"), fields) });
  }

  onNameChange = (term) => {
    this.setState({ term });
  };

  onModeChange = (mode) => {
    this.setState({ mode });
  };

  onPlayChange = async (mode, name) => {
    await this.setState({ finish: false });
    if (!mode || !name) {
      this.PanelElement.current.openErrorTab();
      return;
    }
    await this.setState({ mode });
    await this.setState({ name });
    await this.setState({ delay: this.props.settings[mode].delay });

    await this.setState({ randomId: false });
    await this.setState({ pushedId: false });
    await this.setState({ computerScore: 0 });
    await this.setState({ userScore: 0 });

    const currentField = this.props.settings[mode].field;
    await this.setState({ currentField: currentField });
    this.updateRangeFields(currentField * currentField);
    this.startRandomGenerateId();
  };

  startRandomGenerateId = async () => {
    if (this.state.finish === true) {
      return;
    }

    if (this.state.randomId !== this.state.pushedId) {
      this.setState((state) => {
        const computerScore = state.computerScore + 1;
        return {
          computerScore,
        };
      });

      await this.setState((state) => {
        const fields = state.fields;
        fields[this.state.randomId] = { id: this.state.randomId, class: "red" };
        return {
          fields,
        };
      });
    }

    if (
      this.state.computerScore >
      (this.state.currentField * this.state.currentField) / 2
    ) {
      this.setState({ finish: true });
      this.callApiFinishGame("Computer");

      return;
    }

    const randomId = this.state.range[
      Math.floor(Math.random() * this.state.range.length)
    ];
    await this.setState({ randomId });
    await this.setState((state) => {
      const range = R.without([randomId], state.range);
      return {
        range,
      };
    });
    this.setState((state) => {
      const fields = state.fields;
      fields[randomId] = { id: randomId, class: "blue" };
      return {
        fields,
      };
    });

    setTimeout(() => {
      if (this.state.range.length >= 0) {
        this.startRandomGenerateId();
      }
    }, this.state.delay);
  };

  onFieldChange = (pushedId) => {
    if (pushedId === this.state.randomId) {
      if (
        this.state.userScore >
        (this.state.currentField * this.state.currentField - 2) / 2
      ) {
        this.setState({ finish: true });
        this.callApiFinishGame(this.state.name);
      }
      this.setState((state) => {
        const userScore = state.userScore + 1;
        return {
          userScore,
        };
      });

      this.setState({ pushedId });
      this.setState((state) => {
        const fields = state.fields;
        fields[this.state.randomId] = {
          id: this.state.randomId,
          class: "green",
        };
        return {
          fields,
        };
      });
    }
  };

  callApiFinishGame = (user) => {
    this.PanelElement.current.onStartNewGame(user);
    this.props.addWinner(user);
  };

  render() {
    const { winners, modes } = this.props;
    if (
      this.props.isSettingsLoading === true ||
      this.props.isWinnersLoading === true
    ) {
      return <StyledCircularProgress />;
    }

    if (this.props.settingsError === true || this.props.winnersError) {
      return <p>Can not load data</p>;
    }

    return (
      <div>
        <StyledPaper>
          <Panel
            onNameChange={this.onNameChange}
            onPlayChange={this.onPlayChange}
            modes={modes}
            ref={this.PanelElement}
          />
          <List style={flexContainer}>
            {this.state.fields && (
              <ItemList
                mode={this.state.mode}
                fields={this.state.fields}
                delay={this.state.delay}
                onFieldChange={this.onFieldChange}
                startReganerate={this.startReganerate}
              />
            )}
            {winners && <Leaders winners={winners} />}
          </List>
        </StyledPaper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: getSettings(state),
  isSettingsLoading: getSettingsIsLoading(state),
  settingsError: getSettingsError(state),
  winners: getWinners(state),
  isWinnersLoading: getWinnersIsLoading(state),
  winnersError: getWinnersError(state),
  modes: getModes(state),
});

const mapDispatchToProps = (dispatch) => ({
  serverFetchData: () => dispatch(serverFetchData()),
  addWinner: (user) => dispatch(addWinner(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
