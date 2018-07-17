import React, {Component} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const propTypes = {
    onScrollY    : PropTypes.func,
    onScrollX    : PropTypes.func,
    onScrollUp   : PropTypes.func,
    onScrollDown : PropTypes.func,
    onScrollLeft : PropTypes.func,
    onScrollRight: PropTypes.func,
    onYReachStart: PropTypes.func,
    onYReachEnd  : PropTypes.func,
    onXReachStart: PropTypes.func,
    onXReachEnd  : PropTypes.func
};

const defaultProps = {
    className    : '',
    enable       : true,
    option       : {
        wheelPropagation: true
    },
    containerRef : () => {
    },
    onScrollY    : undefined,
    onScrollX    : undefined,
    onScrollUp   : undefined,
    onScrollDown : undefined,
    onScrollLeft : undefined,
    onScrollRight: undefined,
    onYReachStart: undefined,
    onYReachEnd  : undefined,
    onXReachStart: undefined,
    onXReachEnd  : undefined
};

const handlerNameByEvent = {
    'ps-scroll-y'     : 'onScrollY',
    'ps-scroll-x'     : 'onScrollX',
    'ps-scroll-up'    : 'onScrollUp',
    'ps-scroll-down'  : 'onScrollDown',
    'ps-scroll-left'  : 'onScrollLeft',
    'ps-scroll-right' : 'onScrollRight',
    'ps-y-reach-start': 'onYReachStart',
    'ps-y-reach-end'  : 'onYReachEnd',
    'ps-x-reach-start': 'onXReachStart',
    'ps-x-reach-end'  : 'onXReachEnd'
};

Object.freeze(handlerNameByEvent);

const styles = theme => ({
    root: {}
});

class FuseScrollbars extends Component {
    constructor(props)
    {
        super(props);
        this._handlerByEvent = new Map();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.customScrollbars )
        {
            setTimeout(() => {
                this.createPs();
            });
        }
        else
        {
            setTimeout(() => {
                this.destroyPs();
            });
        }

        this.updatePs();
    }

    componentDidMount()
    {
        this.createPs();
    }

    componentWillUnmount()
    {
        this.destroyPs();
    }

    updatePs = () => {
        if ( !this._ps )
        {
            return;
        }
        this._ps.update();
    };

    destroyPs = () => {
        if ( !this._ps )
        {
            return;
        }
        // unhook up evens
        Object.keys(this._handlerByEvent).forEach((value, key) => {
            this._container.removeEventListener(key, value, false);
        });
        this._handlerByEvent.clear();
        this._ps.destroy();
        this._ps = null;
    };

    createPs = () => {
        if ( isMobile || !this._container || this._ps )
        {
            return;
        }

        this._ps = new PerfectScrollbar(this._container, this.props.option);

        // hook up events
        Object.keys(handlerNameByEvent).forEach((key) => {
            const callback = this.props[handlerNameByEvent[key]];
            if ( callback )
            {
                const handler = () => callback(this._container);
                this._handlerByEvent.set(key, handler);
                this._container.addEventListener(key, handler, false);
            }
        });
    };

    handleRef = (ref) => {
        this._container = ref;
        this.props.containerRef(ref);
    };

    render()
    {
        const {children, className, customScrollbars, enable} = this.props;

        return (
            customScrollbars && enable && !isMobile ?
                (
                    <div
                        className={className}
                        style={{
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        ref={this.handleRef}
                    >
                        {children}
                    </div>
                )
                :
                (
                    <div className={this.props.className}>
                        {this.props.children}
                    </div>
                )
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fuse})
{
    return {
        customScrollbars: fuse.settings.current.customScrollbars
    }
}

FuseScrollbars.propTypes = propTypes;
FuseScrollbars.defaultProps = defaultProps;

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseScrollbars)));
