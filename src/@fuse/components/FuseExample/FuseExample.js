import React, {PureComponent} from 'react';
import {AppBar, Card, Icon, Tab, Tabs, withStyles} from '@material-ui/core';
import {FuseHighlight} from '@fuse';
import PropTypes from 'prop-types';

const propTypes = {
    component      : PropTypes.func,
    raw            : PropTypes.string,
    currentTabIndex: PropTypes.number
};

const defaultProps = {
    currentTabIndex: 0
};

const styles = theme => ({
    root: {}
});

class FuseExample extends PureComponent {
    state = {
        value: this.props.currentTabIndex
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render()
    {
        const {className, component: Component, raw} = this.props;
        const {value} = this.state;
        return (
            <Card className={className}>
                <AppBar position="static" color="default" elevation={0}>
                    <Tabs
                        classes={
                            {
                                root         : 'border-b-1',
                                flexContainer: 'justify-end'
                            }}
                        value={value}
                        onChange={this.handleChange}
                    >
                        {Component && (
                            <Tab classes={{root: 'min-w-64'}} icon={<Icon>remove_red_eye</Icon>}/>
                        )}
                        {raw && (
                            <Tab classes={{root: 'min-w-64'}} icon={<Icon>code</Icon>}/>
                        )}
                    </Tabs>
                </AppBar>
                <div>
                    {value === 0 && Component && (
                        <div className="p-24">
                            <Component/>
                        </div>
                    )}
                    {value === 1 && raw && (
                        <div>
                            <FuseHighlight component="pre" className="language-javascript">
                                {raw}
                            </FuseHighlight>
                        </div>
                    )}
                </div>
            </Card>
        )
    }
}

FuseExample.propTypes = propTypes;
FuseExample.defaultProps = defaultProps;

export default withStyles(styles)(FuseExample);
