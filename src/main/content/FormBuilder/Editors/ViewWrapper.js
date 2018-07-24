import React, {Component} from 'react';
import Au from "../../../../hoc/Au";
import Form from "react-jsonschema-form";
import {connect} from "react-redux";

class ViewWrapper extends Component{

    render () {

        const CustomFieldTemplate = (e) => {
            const {id, className, label, help, required, description, errors, children} = e;
            return <div >{children}</div>;
        };

        return (
            <Au>
                <Form schema={this.props.formSchema}
                      FieldTemplate={CustomFieldTemplate}
                      uiSchema={this.props.uiSchema}
                >
                    <div>
                    </div>
                </Form>
            </Au>
        );
    }
};

ViewWrapper.propTypes = {};
ViewWrapper.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        formSchema: state.formBuilderRedux.schema,
        uiSchema:  state.formBuilderRedux.uiSchema
    }
};

export default connect(mapStateToProps)(ViewWrapper);
