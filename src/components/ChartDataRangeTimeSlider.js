import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { sliderSetTimerange, getData, chartLiveUpdate, sliderSetStepValue } from '../actions/iottimeseriesData';
import { getDeviceNameForApiCall } from '../utils/getDeviceNameForApiCall';
import { connect } from 'react-redux';

const styles = theme => ({
    margin: {
        height: theme.spacing(3),
    },
});

class ChartDataRangeTimeSlider extends React.Component {

    marks = [];
    minSliderValue = 0;
    maxSliderValue = 59;

    valuetext = (value) => {
        return `${value}`;
    }

    componentDidMount() {
        this.generateMarks()
    }

    generateMarks = () => {
        let marks = []
        let currentTab = this.props.tabIndex;
        let _15minWindowSliderTabs = ['currentTab', 'voltageLLTab', 'voltageLNTab'];
        if (_15minWindowSliderTabs.indexOf(currentTab) !== -1) {
            for (let i = 0; i <= 59; i++) {
                marks.push({ value: i, label: i%4===0?i:'' })
            }
            this.maxSliderValue = 59
        }
        return marks
    }

    setCurrentTime = (updateCurrentTime = false) => {
        let sliderValue = 0;
        let currentTimeInHHmmFormat = moment(this.props.timeRange).format('HH:mm');
        let minutes = parseInt(currentTimeInHHmmFormat.substring(3, currentTimeInHHmmFormat.length))
        // if (minutes > 15 && minutes <= 30) {
        //     sliderValue = minutes - 15
        // }
        // else if (minutes > 30 && minutes <= 45) {
        //     sliderValue = minutes - 30
        // }
        // else if (minutes > 45) {
        //     sliderValue = minutes - 45
        // }
        // else {
        //     sliderValue = minutes
        // }
        sliderValue = minutes;
        return sliderValue
    }

    setTimeRange = (value, turnOnLiveUpdate = false) => {
        //turn off liveupdate on change slider
        if (turnOnLiveUpdate === false) {
            this.props.chartLiveUpdate(false);
        }
        let multiplier = value;
        let addMinutes = multiplier * 1;
        let timeRange = this.props.timeRange;
        let startOfHour = moment(timeRange).startOf("hour");
        let add = 0;
        // if (moment(timeRange).minutes() > 15 && moment(timeRange).minutes() <= 30) {
        //     add = addMinutes + 15
        // }
        // else if (moment(timeRange).minutes() > 30 && moment(timeRange).minutes() <= 45) {
        //     add = addMinutes + 30
        // }
        // else if (moment(timeRange).minutes() > 45) {
        //     add = addMinutes + 45
        // }
        // else {
        //     add = addMinutes
        // }
        let addedMinutes = startOfHour.add(addMinutes, "minutes").toISOString()
        this.props.sliderSetTimerange(addedMinutes);
        this.props.sliderSetStepValue(addMinutes);
        let device = getDeviceNameForApiCall(this.props.tabIndex, this.props.deviceNameForApiCall)
        if (this.props.liveUpdate === false) {
            this.props.getData(device, this.props.tabIndex, addedMinutes, true);
        }
        else {
            this.props.getData(device, this.props.tabIndex, moment().toISOString(), false);
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.liveUpdate === false && this.props.liveUpdate === true)) {
            this.setTimeRange(this.setCurrentTime(true), true)
        }
    }

    render() {
        return (
            <Slider
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider"
                step={1}
                marks={this.generateMarks()}
                valueLabelDisplay="auto"
                max={this.maxSliderValue}
                min={this.minSliderValue}
                valueLabelFormat={(x) => ``}
                onChangeCommitted={(x, value) => this.setTimeRange(value)}
                value={this.setCurrentTime()}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        timeRange: state.chartReducer.timeRangeSlider,
        sliderStepValue: state.chartReducer.timeRangeStepValue,
        tabIndex: state.dialogReducer.tabIndex,
        liveUpdate: state.chartReducer.liveDataUpdate,
        deviceNameForApiCall: state.dialogReducer.deviceTitle
    };
}

const mapDispatchToProps = {
    sliderSetTimerange,
    getData,
    chartLiveUpdate,
    sliderSetStepValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChartDataRangeTimeSlider))