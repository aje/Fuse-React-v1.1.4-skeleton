import {withFormsy} from 'formsy-react';
import React, {Component} from 'react';
import {FormControl, FormHelperText, FormLabel, RadioGroup} from '@material-ui/core';
import _ from 'lodash';

class RadioGroupFormsy extends Component {

    changeValue = (event, value) => {
        this.props.setValue(value);
    };

    render()
    {
        const importedProps = _.pick(this.props, [
            'children',
            'name',
            'onBlur',
            'onChange',
            'onKeyDown'
        ]);

        // An error message is returned only if the component is invalid
        const errorMessage = this.props.getErrorMessage();
        const value = this.props.getValue();

        return (
            <FormControl error={Boolean(errorMessage)} className={this.props.className}>
                <FormControl component="fieldset" required={this.props.required} error={Boolean(errorMessage)}>
                    {this.props.label && (
                        <FormLabel component="legend">{this.props.label}</FormLabel>
                    )}
                    <RadioGroup
                        {...importedProps}
                        value={value}
                        onChange={this.changeValue}
                    />
                    {Boolean(errorMessage) && (
                        <FormHelperText>{errorMessage}</FormHelperText>
                    )}
                </FormControl>
            </FormControl>
        );
    }
}

export default withFormsy(RadioGroupFormsy);