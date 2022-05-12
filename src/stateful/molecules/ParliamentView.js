import React, { Component } from "react";
import ReactGA from "react-ga";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import MP from "../../core/MP.js";
import GridView from "../../nonstate/molecules/GridView.js";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";

import StatisticalTrendsSwitch from "../../nonstate/molecules/StatisticalTrendsSwitch.js";
import MPDrawer from "../../nonstate/molecules/MPDrawer.js";
import AvatarMP from "../../nonstate/atoms/AvatarMP.js";
import DimPicker from "../../nonstate/atoms/DimPicker.js";
import VersionWidget from "../../nonstate/atoms/VersionWidget.js";

import { t } from "../../base/I18N.js";
import Dims from "../../core/Dims.js";

const DEFAULT_X_DIM = "Is Age > 40";
const DEFAULT_Y_DIM = "Gender";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class ParliamentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mpIdx: undefined,
      xDim: DEFAULT_X_DIM,
      yDim: DEFAULT_Y_DIM,
      activeMPId: 1244,
      showStatisticalTrends: false,
    };
  }

  onChangeXDim(xDim) {
    ReactGA.event({
      category: "Dims",
      action: `Changed X Dim`,
      label: xDim,
      value: 10,
    });

    this.setState({ xDim });
  }

  onChangeYDim(yDim) {
    ReactGA.event({
      category: "Dims",
      action: `Changed Y Dim`,
      label: yDim,
      value: 10,
    });

    this.setState({ yDim });
  }

  onClickMP(mpID) {
    const { mpIdx } = this.state;
    const mp = mpIdx[mpID];
    ReactGA.event({
      category: "MPs",
      action: "Clicked MP",
      label: mp.logString,
      value: 10,
    });
    this.setState({ activeMPId: mpID });
  }

  onDrawerClose() {
    this.setState({ activeMPId: null });
  }

  onClickStatisticalTrends() {
    const oldState = this.state.showStatisticalTrends;
    ReactGA.event({
      category: "Statistical Trends",
      action: "Clicked Statistical Trends",
      label: oldState.toString(),
      value: 10,
    });

    this.setState({ showStatisticalTrends: !oldState });
  }

  onClickSwapDims(e) {
    const { xDim, yDim } = this.state;
    ReactGA.event({
      category: "Dims",
      action: "Clicked Swap Dims",
      label: `${xDim},${yDim}`,
      value: 10,
    });
    this.setState({
      xDim: yDim,
      yDim: xDim,
    });
  }

  async componentDidMount() {
    const mpIdx = await MP.getMPIdx();
    this.setState({ mpIdx });
  }

  render() {
    const { mpIdx, xDim, yDim, activeMPId, showStatisticalTrends } = this.state;
    if (mpIdx === undefined) {
      return <div>Loading...</div>;
    }
    const activeMP = mpIdx[activeMPId];

    let activeMPStr = "None";
    if (activeMP) {
      activeMPStr = activeMP.logString;
    }

    ReactGA.event({
      category: "ParliamentView State",
      action: "ParliamentView.render()",
      label: `${xDim},${yDim},${activeMPStr}`,
      value: 0,
    });

    ReactGA.event({
      category: "Dims",
      action: `ParliamentView.render()`,
      label: `${xDim},${yDim}`,
      value: 10,
    });

    const cellMap = function (mp) {
      const key = `avatar-${mp.id}`;
      const isActiveMP = mp.id === activeMPId;
      return (
        <AvatarMP
          key={key}
          mp={mp}
          onClickMP={this.onClickMP.bind(this)}
          isActiveMP={isActiveMP}
        />
      );
    }.bind(this);

    const { cells, xAxisLabels, yAxisLabels } = Dims.buildGrid(
      Object.values(mpIdx),
      xDim,
      yDim,
      cellMap
    );

    return (
      <Box sx={STYLE}>
        <Stack direction="row">
          <DimPicker
            label={t("Top to Bottom") + " (Y)"}
            selectedDim={yDim}
            onChange={this.onChangeYDim.bind(this)}
          />

          <IconButton onClick={this.onClickSwapDims.bind(this)}>
            <SwapHorizIcon />
          </IconButton>
          <DimPicker
            label={t("Left to Right") + " (X)"}
            selectedDim={xDim}
            onChange={this.onChangeXDim.bind(this)}
          />
        </Stack>

        <GridView
          cells={cells}
          xAxisLabels={xAxisLabels}
          yAxisLabels={yAxisLabels}
          onClick={this.onClickMP}
          showStatisticalTrends={showStatisticalTrends}
        />

        <StatisticalTrendsSwitch
          showStatisticalTrends={showStatisticalTrends}
          onClickStatisticalTrends={this.onClickStatisticalTrends.bind(this)}
        />

        <Drawer
          anchor="right"
          open={activeMPId !== null}
          onClose={this.onDrawerClose.bind(this)}
        >
          <MPDrawer mp={activeMP} onClose={this.onDrawerClose.bind(this)} />
        </Drawer>
        <VersionWidget />
        <CustomBottomNavigation
          onClickStatisticalTrends={this.onClickStatisticalTrends.bind(this)}
        />
      </Box>
    );
  }
}
