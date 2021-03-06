import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

import MaterialTable from "material-table";
import { withSnackbar } from "notistack";
import { exists } from "../../../utils/utilities";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { forwardRef } from "react";
import { showTrendSlider } from "../../../actions/reportData";

const styles = theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  dataGrid: {},
  nameLabel: {},
  valueLabel: {
    fontSize: 18
  },
  maxValueLabel: {
    fontSize: 18
  },
  maxTimeLabel: {
    fontSize: 10
  },
  tableGridItem: {
    fontSize: 10,
    padding: 40
  }
});

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class InfeedQualityReportInfeedComponent extends Component {
  getCurrentData = () => {
    let { infeedName, infeedQualityReport } = this.props;

    if (!exists(infeedQualityReport.data)) return null;

    let supplyData = infeedQualityReport.data[infeedName];

    if (!exists(supplyData)) return null;

    let supplyMonthlyData = infeedQualityReport.data[infeedName].monthlyData;

    if (!exists(supplyMonthlyData)) return null;

    let getComponentData = (variableNameInData, unit) => {
      if (!exists(supplyMonthlyData[variableNameInData])) return {};

      return {
        name: variableNameInData,
        average: supplyMonthlyData[variableNameInData].average,
        max: supplyMonthlyData[variableNameInData].max,
        maxTime: supplyMonthlyData[variableNameInData].maxTime,
        min: supplyMonthlyData[variableNameInData].min,
        minTime: supplyMonthlyData[variableNameInData].minTime,
        unit: unit
      };
    };

    return [
      getComponentData("CurrentL1", "A"),
      getComponentData("CurrentL2", "A"),
      getComponentData("CurrentL3", "A")
    ];
  };

  getTHDData = () => {
    let { infeedName, infeedQualityReport } = this.props;

    if (!exists(infeedQualityReport.data)) return null;

    let supplyData = infeedQualityReport.data[infeedName];

    if (!exists(supplyData)) return null;

    let supplyMonthlyData = infeedQualityReport.data[infeedName].monthlyData;

    if (!exists(supplyMonthlyData)) return null;

    let getComponentData = (variableNameInData, unit) => {
      if (!exists(supplyMonthlyData[variableNameInData])) return {};

      return {
        name: variableNameInData,
        average: supplyMonthlyData[variableNameInData].average,
        max: supplyMonthlyData[variableNameInData].max,
        maxTime: supplyMonthlyData[variableNameInData].maxTime,
        min: supplyMonthlyData[variableNameInData].min,
        minTime: supplyMonthlyData[variableNameInData].minTime,
        unit: unit
      };
    };

    return [
      getComponentData("THDCurrentL1", "%"),
      getComponentData("THDCurrentL2", "%"),
      getComponentData("THDCurrentL3", "%")
    ];
  };

  renderMaxMinValue = (maxValue, maxTime, unit, elementName, variableName) => {
    let { classes, t } = this.props;
    if (!exists(maxValue) || !exists(maxTime)) return "";

    return (
      <span>
        <span className={classes.maxValueLabel}>{`${maxValue.toFixed(
          2
        )} ${unit}`}</span>
        <br></br>
        <Button
          className={classes.maxTimeLabel}
          onClick={() => {
            this.props.showTrendSlider(elementName, variableName, maxTime, t);
          }}
        >
          {moment(maxTime).format("YYYY-MM-DD HH:mm")}
        </Button>
      </span>
    );
  };

  renderVariableName = name => {
    let { classes, t } = this.props;
    if (!exists(name)) return "";

    return (
      <Typography className={classes.nameLabel}>
        {t(`reportsSupplyQualityTransformerTableVariableName_${name}`)}
      </Typography>
    );
  };

  renderValue = (value, unit) => {
    let { classes } = this.props;
    if (!exists(value)) return "";

    return (
      <span>
        <span className={classes.valueLabel}>{`${value.toFixed(
          2
        )} ${unit}`}</span>
      </span>
    );
  };

  renderCurrentTable = () => {
    let { t, classes, infeedName } = this.props;

    let tableData = this.getCurrentData();

    if (!exists(tableData)) return null;

    return (
      <MaterialTable
        components={{
          Container: props => props.children
        }}
        icons={tableIcons}
        className={classes.table}
        title={t("reportsInfeedQualityInfeedCurrentTableTitle")}
        columns={[
          {
            title: t(
              "reportsSupplyQualityTransformerTableVariableNameColumnHeader"
            ),
            type: "string",
            field: "name",
            render: rowData => {
              return this.renderVariableName(rowData.name);
            }
          },
          {
            title: t("reportsSupplyQualityTransformerTableAverageColumnHeader"),
            field: "average",
            type: "numeric",
            render: rowData => {
              return this.renderValue(rowData.average, rowData.unit);
            }
          },
          {
            title: t("reportsSupplyQualityTransformerTableMaxValueHeader"),
            field: "max",
            type: "numeric",
            render: rowData => {
              return this.renderMaxMinValue(
                rowData.max,
                rowData.maxTime,
                rowData.unit,
                infeedName,
                rowData.name
              );
            }
          },
          {
            title: t("reportsSupplyQualityTransformerTableMinValueHeader"),
            field: "min",
            type: "numeric",
            render: rowData => {
              return this.renderMaxMinValue(
                rowData.min,
                rowData.minTime,
                rowData.unit,
                infeedName,
                rowData.name
              );
            }
          }
        ]}
        data={tableData}
        options={{
          pageSize: 10,
          showTitle: true,
          search: false,
          filtering: false,
          paging: false,
          pageSizeOptions: [10],
          padding: "dense",
          exportButton: false
        }}
        localization={{
          pagination: {
            labelDisplayedRows: `{from}-{to} ${t(
              "powermonitorPower15TablePaginationFrom"
            )} {count}`,
            labelRowsSelect: t("powermonitorPower15TablePaginationRows"),
            previousAriaLabel: t(
              "powermonitorPower15TablePaginationPreviousPage"
            ),
            previousTooltip: t(
              "powermonitorPower15TablePaginationPreviousPage"
            ),
            nextAriaLabel: t("powermonitorPower15TablePaginationNextPage"),
            nextTooltip: t("powermonitorPower15TablePaginationNextPage"),
            firstTooltip: t("powermonitorPower15TablePaginationFirstPage"),
            lastTooltip: t("powermonitorPower15TablePaginationLastPage")
          },
          toolbar: {
            exportTitle: t("powermonitorPower15TableExportTitle"),
            exportAriaLabel: t("powermonitorPower15TableExportAriaLabel"),
            exportName: t("powermonitorPower15TableExportName")
          },
          body: {
            emptyDataSourceMessage: t("powermonitorPower15TableDataEmpty")
          }
        }}
      />
    );
  };

  renderTHDTable = () => {
    let { t, classes, infeedName } = this.props;

    let tableData = this.getTHDData();

    if (!exists(tableData)) return null;

    return (
      <MaterialTable
        components={{
          Container: props => props.children
        }}
        icons={tableIcons}
        className={classes.table}
        title={t("reportsInfeedQualityInfeedTHDTableTitle")}
        columns={[
          {
            title: t(
              "reportsSupplyQualityTransformerTableVariableNameColumnHeader"
            ),
            type: "string",
            field: "name",
            render: rowData => {
              return this.renderVariableName(rowData.name);
            }
          },
          {
            title: t("reportsSupplyQualityTransformerTableAverageColumnHeader"),
            field: "average",
            type: "numeric",
            render: rowData => {
              return this.renderValue(rowData.average, rowData.unit);
            }
          },
          {
            title: t("reportsSupplyQualityTransformerTableMaxValueHeader"),
            field: "max",
            type: "numeric",
            render: rowData => {
              return this.renderMaxMinValue(
                rowData.max,
                rowData.maxTime,
                rowData.unit,
                infeedName,
                rowData.name
              );
            }
          },
          {
            title: t("reportsSupplyQualityTransformerTableMinValueHeader"),
            field: "min",
            type: "numeric",
            render: rowData => {
              return this.renderMaxMinValue(
                rowData.min,
                rowData.minTime,
                rowData.unit,
                infeedName,
                rowData.name
              );
            }
          }
        ]}
        data={tableData}
        options={{
          pageSize: 7,
          showTitle: true,
          search: false,
          filtering: false,
          paging: false,
          pageSizeOptions: [7],
          padding: "dense",
          exportButton: false
        }}
        localization={{
          pagination: {
            labelDisplayedRows: `{from}-{to} ${t(
              "powermonitorPower15TablePaginationFrom"
            )} {count}`,
            labelRowsSelect: t("powermonitorPower15TablePaginationRows"),
            previousAriaLabel: t(
              "powermonitorPower15TablePaginationPreviousPage"
            ),
            previousTooltip: t(
              "powermonitorPower15TablePaginationPreviousPage"
            ),
            nextAriaLabel: t("powermonitorPower15TablePaginationNextPage"),
            nextTooltip: t("powermonitorPower15TablePaginationNextPage"),
            firstTooltip: t("powermonitorPower15TablePaginationFirstPage"),
            lastTooltip: t("powermonitorPower15TablePaginationLastPage")
          },
          toolbar: {
            exportTitle: t("powermonitorPower15TableExportTitle"),
            exportAriaLabel: t("powermonitorPower15TableExportAriaLabel"),
            exportName: t("powermonitorPower15TableExportName")
          },
          body: {
            emptyDataSourceMessage: t("powermonitorPower15TableDataEmpty")
          }
        }}
      />
    );
  };

  render() {
    let { t, classes, infeedName } = this.props;

    return (
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            {`${t("reportsInfeedQualityInfeedComponentTitle")} ${t(
              `reportsInfeedQualityInfeedName_${infeedName}`
            )}`}
          </Typography>
          <Grid
            className={classes.tableGridComponent}
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              className={classes.tableGridItem}
            >
              {this.renderCurrentTable()}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              className={classes.tableGridItem}
            >
              {this.renderTHDTable()}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    infeedQualityReport: state.infeedQualityReport
  };
}

const mapDispatchToProps = {
  showTrendSlider: showTrendSlider
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(withSnackbar(InfeedQualityReportInfeedComponent))
  )
);
