import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import { withSnackbar } from "notistack";

import { Bar } from "react-chartjs-2";
import { exists } from "../../../utils/utilities";

const styles = theme => ({
  chart: {
    width: "100%",
    minHeigth: 500
  }
});

let groupColors = {
  "1F1": "#ff6384dd",
  "1F2": "#36a2ebdd",
  "1F3": "#4dc240dd",
  "1F4": "#f7df43dd",
  "1F5": "#8656ffdd",
  "1F6": "#ff2b2bdd",
  "1F7": "#f59300dd",
  "2F1": "#c363ffdd",
  "2F2": "#6863ffdd",
  "2F3": "#63ff7add",
  "2F4": "#ba6b5ddd",
  "2F5": "#3b0207dd",
  "2F6": "#382e2fdd",
  "3F1": "#389488dd",
  "3F2": "#88e3d7dd",
  "1FP1": "#48a321dd",
  "1FP2": "#edfa39dd",
  "2FP1": "#010e36dd",
  "2FP2": "#2a2f40dd",
  transformers: "#290138dd",
  rest: "#ff5900dd"
};

class Power15MinElementPowerChartComponent extends Component {
  generateOptionsForTrend() {
    let { power15MinReport, t } = this.props;

    let startDate = new Date(
      power15MinReport.year,
      power15MinReport.month,
      power15MinReport.trendDay
    );

    let stopDate = moment(startDate)
      .add(1, "day")
      .toDate();

    return {
      maintainAspectRatio: true,
      aspectRatio: 4,
      title: {
        display: false
      },
      legend: {
        display: true,
        position: "left"
      },
      animation: { duration: 0 },
      scales: {
        yAxes: [
          {
            stacked: true
          }
        ],
        xAxes: [
          {
            categoryPercentage: 0.9,
            barPercentage: 0.9,
            type: "time",
            time: {
              min: startDate,
              max: stopDate,
              displayFormats: {
                millisecond: "HH:mm",
                second: "HH:mm",
                minute: "HH:mm",
                hour: "HH:mm",
                day: "HH:mm",
                week: "HH:mm",
                month: "HH:mm",
                quarter: "HH:mm",
                year: "HH:mm"
              }
            },
            stacked: true
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: this.renderTooltipLabel
        }
      }
    };
  }

  renderTooltipLabel = (tooltipItem, data) => {
    if (!exists(tooltipItem.datasetIndex)) return "";
    if (!exists(tooltipItem.index)) return "";
    if (!exists(data.datasets[tooltipItem.datasetIndex])) return "";
    if (
      !exists(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])
    )
      return "";

    let dataset = data.datasets[tooltipItem.datasetIndex];
    let value = dataset.data[tooltipItem.index].y;

    return `${value.toFixed(2)} kW`;
  };

  generateAllActivePowerPoints = (groupName, power15MinReportData) => {
    let startDate = new Date(
      power15MinReportData.year,
      power15MinReportData.month,
      power15MinReportData.trendDay
    );

    let stopDate = moment(startDate)
      .add(1, "day")
      .toDate();

    let pointsToReturn = [];
    for (let i = 0; i < power15MinReportData.data[groupName].data.length; i++) {
      let point = power15MinReportData.data[groupName].data[i];
      if (point.date >= startDate && point.date <= stopDate)
        pointsToReturn.push({ x: point.date, y: point.value });
    }

    return pointsToReturn;
  };

  generateDataSetForGroup = (groupName, power15MinReport) => {
    let { t } = this.props;
    return {
      type: "bar",
      label: t(`reports15MinPowerReportElement_${groupName}`),
      borderWidth: 1,
      borderColor: groupColors[groupName],
      data: this.generateAllActivePowerPoints(groupName, power15MinReport),
      backgroundColor: groupColors[groupName]
    };
  };

  generateDataForTrend(power15MinReport) {
    let { t } = this.props;

    let allDatasets = [];

    let allGroups = Object.keys(power15MinReport.data);

    for (let group of allGroups) {
      if (
        group !== "TR1" &&
        group !== "TR2" &&
        group !== "GEN" &&
        group !== "total"
      ) {
        let dataset = this.generateDataSetForGroup(group, power15MinReport);
        allDatasets.push(dataset);
      }
    }

    let sortedDatasets = allDatasets.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });

    return {
      datasets: sortedDatasets
    };
  }

  render() {
    let { t, classes, power15MinReport } = this.props;

    let trendOptions = this.generateOptionsForTrend();
    let trendData = this.generateDataForTrend(power15MinReport);
    return (
      <Bar
        className={classes.chart}
        options={trendOptions}
        data={trendData}
        height={null}
        width={null}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    power15MinReport: state.power15MinReport
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(Power15MinElementPowerChartComponent))
  )
);
