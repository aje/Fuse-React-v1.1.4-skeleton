import {withFormsy} from 'formsy-react';
import React, {Component} from 'react';
import {FormControl, FormHelperText, Input, InputLabel, Select} from '@material-ui/core';
import _ from 'lodash';

class SelectFormsy extends Component {

    changeValue = (event) => {
        this.props.setValue(event.target.value);
    };

    render()
    {
        const importedProps = _.pick(this.props, [
            'autoWidth',
            'children',
            'classes',
            'displayEmpty',
            'input',
            'inputProps',
            'MenuProps',
            'multiple',
            'native',
            'onChange',
            'onClose',
            'onOpen',
            'open',
            'renderValue',
            'SelectDisplayProps',
            'value'
        ]);

        // An error message is returned only if the component is invalid
        const errorMessage = this.props.getErrorMessage();
        const value = this.props.getValue();

        return (
            <FormControl error={Boolean(errorMessage)} className={this.props.className}>
                {this.props.label && (
                    <InputLabel htmlFor={this.props.name}>{this.props.label}</InputLabel>
                )}
                <Select
                    {...importedProps}
                    value={value}
                    onChange={this.changeValue}
                    input={<Input id={this.props.name}/>}
                />
                {Boolean(errorMessage) && (
                    <FormHelperText>{errorMessage}</FormHelperText>
                )}
            </FormControl>
        );
    }
}

export default withFormsy(SelectFormsy);