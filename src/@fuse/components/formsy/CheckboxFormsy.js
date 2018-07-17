import {withFormsy} from 'formsy-react';
import React, {Component} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import _ from 'lodash';

class CheckboxFormsy extends Component {

    changeValue = (event) => {
        this.props.setValue(event.target.checked)
    };

    render()
    {
        const importedProps = _.pick(this.props, [
            'checkedIcon',
            'classes',
            'color',
            'disabled',
            'disableRipple',
            'icon',
            'id',
            'indeterminate',
            'indeterminateIcon',
            'inputProps',
            'inputRef',
            'onChange'
        ]);

        // An error message is returned only if the component is invalid
        const errorMessage = this.props.getErrorMessage();
        const value = this.props.getValue();
        return (
            <FormControl error={Boolean(errorMessage)} className={this.props.className}>
                <FormControlLabel
                    control={
                        <Checkbox
                            {...importedProps}
                            type='checkbox'
                            checked={value}
                            onChange={this.changeValue}
                        />
                    }
                    label={this.props.label}
                />
                {Boolean(errorMessage) && (
                    <FormHelperText>{errorMessage}</FormHelperText>
                )}
            </FormControl>
        );
    }
}

export default withFormsy(CheckboxFormsy);