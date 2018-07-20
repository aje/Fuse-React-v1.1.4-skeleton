import Au from "../../../../hoc/Au";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/es/Radio/Radio";
import Typography from "@material-ui/core/es/Typography/Typography";
import React from "react";
import TextField from "@material-ui/core/es/TextField/TextField";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";

export const myCheckboxes = (e) => {
    return (
        <Au>
            <Typography variant={"subheading"}>{e.schema.title}</Typography>
            {e.schema.items.enum.map(item => (
                <FormControlLabel key={item}
                                  control={
                                      <Checkbox
                                          value={item}
                                      />
                                  }
                                  label={item}
                />
            ))}
        </Au>
    )
};

export const myText = (e) => {
    return (
        <Au>
            <TextField fullWidth
                       multiline={(e.schema["editType"] === "longTextSchema")}
                       rows="4"
                       label={e.schema.title}
            />
        </Au>
    )
};

export const myDate = (e) => {
    return (
        <Au>
            <TextField fullWidth
                       type="date"
                       defaultValue="2017-05-24"
                       label={e.schema.title}
            />
        </Au>
    )
};

export const myRadio = (e) => {
    return (
        <Au>
            <Typography variant={"subheading"}>{e.schema.title}</Typography>
            {e.schema.items.enum.map(item => (
                <FormControlLabel
                    key={item}
                    control={
                        <Radio
                            value={item}
                        />
                    }
                    label={item}
                />
            ))}
        </Au>
    )
};


export const mySelect = (e) => {
    return (
       <Au>
            <Typography variant={"subheading"}>{e.schema.title}</Typography>
            <Typography >{e.schema.description}</Typography>
            <Select value="f" style={{width: "100%"}}>
                <MenuItem value="f">Please select</MenuItem>
            </Select>
       </Au>
    )
};

export const myCheckbox = (e) =>{
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={e.value}
                    onChange={() => e.onChange(!e.value)}
                    value={e.title}
                />
            }
            label={e.schema.title}
        />
    );
};