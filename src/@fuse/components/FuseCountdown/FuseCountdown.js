import React, {Component} from 'react';
import {Typography, withStyles} from '@material-ui/core';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
    endDate   : PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onComplete: PropTypes.func
};

const defaultProps = {
    endDate: moment().add(15, 'days')
};

const styles = theme => ({
    root: {}
});

class FuseCountdown extends Component {
    state = {
        endDate  : moment.isMoment(this.props.endDate) ? this.props.endDate : moment(this.props.endDate),
        countdown: {
            days   : '',
            hours  : '',
            minutes: '',
            seconds: ''
        }
    };

    componentDidMount()
    {
        this.tick();
        this.interval = setInterval(() => {
            this.tick()
        }, 1000);
    }

    componentWillUnmount()
    {
        window.clearInterval(this.interval);
    }

    tick()
    {
        const {endDate} = this.state;

        const currDate = moment();
        const diff = endDate.diff(currDate, 'seconds');
        if ( diff < 0 )
        {
            this.complete();
            return;
        }
        const timeLeft = moment.duration(diff, 'seconds');
        this.setState({
            countdown: {
                days   : timeLeft.asDays().toFixed(0),
                hours  : timeLeft.hours(),
                minutes: timeLeft.minutes(),
                seconds: timeLeft.seconds()
            }
        });
    }

    complete()
    {
        window.clearInterval(this.interval);
        if ( this.props.onComplete )
        {
            this.props.onComplete();
        }
    }

    render()
    {
        const {classes} = this.props;
        const {countdown} = this.state;

        return (
            <div className={classNames(classes.root, "flex items-center", this.props.className)}>
                <div className="flex flex-col items-center justify-center px-12">
                    <Typography variant="display1" color="inherit" className="mb-4">
                        {countdown.days}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        days
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center px-12">
                    <Typography variant="display1" color="inherit" className="mb-4">
                        {countdown.hours}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        hours
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center px-12">
                    <Typography variant="display1" color="inherit" className="mb-4">
                        {countdown.minutes}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        minutes
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center px-12">
                    <Typography variant="display1" color="inherit" className="mb-4">
                        {countdown.seconds}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        seconds
                    </Typography>
                </div>
            </div>
        );
    }
}

FuseCountdown.propTypes = propTypes;
FuseCountdown.defaultProps = defaultProps;

export default withStyles(styles)(FuseCountdown);
