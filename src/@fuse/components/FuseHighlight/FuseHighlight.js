import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core';
import * as Prism from 'prismjs';
import './prism-languages';
import PropTypes from 'prop-types';

const propTypes = {
    component: PropTypes.node
};

const defaultProps = {
    component: `code`
};

const styles = theme => ({
    root: {}
});

class FuseHighlight extends PureComponent {

    constructor(props)
    {
        super(props);
        this.trimCode();
    }

    componentDidMount()
    {
        this.highlight()
    }

    trimCode()
    {
        // Split the source into lines
        const sourceLines = this.props.children.split('\n');

        // Remove the first and the last line of the source
        // code if they are blank lines. This way, the html
        // can be formatted properly while using fuse-highlight
        // component
        if ( !sourceLines[0].trim() )
        {
            sourceLines.shift();
        }

        if ( !sourceLines[sourceLines.length - 1].trim() )
        {
            sourceLines.pop();
        }

        // Find the first non-whitespace char index in
        // the first line of the source code
        const indexOfFirstChar = sourceLines[0].search(/\S|$/);

        // Generate the trimmed source
        let source = '';

        // Iterate through all the lines
        sourceLines.forEach((line, index) => {

            // Trim the beginning white space depending on the index
            // and concat the source code
            source = source + line.substr(indexOfFirstChar, line.length);

            // If it's not the last line...
            if ( index !== sourceLines.length - 1 )
            {
                // Add a line break at the end
                source = source + '\n';
            }
        });
        this.source = source;
    }

    componentDidUpdate()
    {
        this.highlight()
    }

    highlight()
    {
        Prism.highlightElement(this.domNode, this.props.async)
    }

    handleRefMount = domNode => {
        this.domNode = domNode
    };

    render()
    {
        const {className, component: Wrapper} = this.props;

        return (
            <Wrapper ref={this.handleRefMount} className={className}>
                {this.source}
            </Wrapper>
        )
    }
}

FuseHighlight.propTypes = propTypes;
FuseHighlight.defaultProps = defaultProps;

export default withStyles(styles)(FuseHighlight);
