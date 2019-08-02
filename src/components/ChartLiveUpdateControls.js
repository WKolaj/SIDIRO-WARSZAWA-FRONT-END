import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { chartLiveUpdate } from '../actions/iottimeseriesData';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    chartControls: {
      
    }
  });

class ChartLiveUpdateControls extends React.Component {

    handleChange = name => event => {
        this.props.chartLiveUpdate(event.target.checked)
    };

    render() {
        const { classes, params } = this.props;
        return (
            <div className={classes.chartControls}>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={params.liveDataUpdate} onChange={this.handleChange()} value="liveDataUpdate" />}
                            label="Odświeżanie na żywo"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        params: state.chartReducer,
    };
}

const mapDispatchToProps = {
    chartLiveUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChartLiveUpdateControls))