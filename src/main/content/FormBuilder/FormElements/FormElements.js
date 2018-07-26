import Au from "../../../../hoc/Au";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/es/Radio/Radio";
import Typography from "@material-ui/core/es/Typography/Typography";
import React from "react";
import TextField from "@material-ui/core/es/TextField/TextField";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";
import FormLabel from "@material-ui/core/es/FormLabel/FormLabel";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Icon from "@material-ui/core/es/Icon/Icon";
import FieldWrapper from "../Editors/FieldWrapper";
import Divider from "@material-ui/core/es/Divider/Divider";


export const myText = (e) => {
    let icon = false;
    switch (e.schema.inputType) {
        case "email":
            icon = "email";
            break;
        case "number":
            icon = "filter_1";
            break;
        case "tell":
            icon = "phone";
            break;
        case "password":
            icon = "vpn_key";
            break;
    }
    return (
        <Au>
            <TextField fullWidth
                       disabled={e.readonly || e.schema.editType !== undefined}
                       required={e.required}
                       multiline={(e.schema.textarea)}
                       rows={e.schema.rows}
                       type={e.schema.inputType}
                       label={e.schema.title}
                       helperText={e.schema.helper}
                       defaultValue={e.schema.default}
                       placeholder={e.schema.placeholder}
                       InputProps={icon ? {
                           startAdornment: (
                               <InputAdornment position="start">
                                   <Icon>{icon}</Icon>
                               </InputAdornment>
                           ),
                       }: null }
            />
        </Au>
    )
};

export const myDate = (e) => {
    let icon = false;
    switch (e.schema.inputType) {
        case "date":
            icon = "calendar_today";
            break;
        case "time":
            icon = "access_time";
            break;
        case "datetime-local":
            icon = "date_range";
            break;
            break;
    }
    return (
        <Au>
            <TextField fullWidth
                       disabled={e.readonly || e.schema.editType !== undefined}
                       required={e.required}
                       type={e.schema.inputType}
                       label={e.schema.title}
                       helperText={e.schema.helper}
                       defaultValue={e.schema.default}
                       placeholder={e.schema.placeholder}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       InputProps={icon ? {
                           startAdornment: (
                               <InputAdornment position="start">
                                   <Icon>{icon}</Icon>
                               </InputAdornment>
                           ),
                       }: null }
            />
        </Au>
    )
};

export const myRadio = (e) => {
    return (
        <Au>
            <FormControl required={e.schema.require} fullWidth disabled={e.readonly || e.schema.editType !== undefined}>
                <FormLabel>{e.schema.title}</FormLabel>
                    {e.schema.items.enum.map((item, i) => (
                        <FormControlLabel
                            disabled={e.readonly || e.schema.editType !== undefined}
                            key={i}
                            control={
                                <Radio
                                    value={item}
                                />
                            }
                            label={item}
                        />
                    ))}
                {e.schema.helper !== undefined? <FormHelperText>{e.schema.helper}</FormHelperText> : ""}
            </FormControl>
        </Au>
    )
};

export const myCheckboxes = (e) => {
    return (
        <Au>
            <FormControl required={e.schema.require} fullWidth disabled={e.readonly || e.schema.editType !== undefined}>
                <FormLabel>{e.schema.title}</FormLabel>
                {e.schema.items.enum.map((item, i) => (
                    <FormControlLabel
                        key={i} disabled={e.readonly || e.schema.editType !== undefined}
                        control={
                            <Checkbox
                              value={item}
                            />
                        }
                        label={item}
                    />
                ))}
                {e.schema.helper !== undefined? <FormHelperText>{e.schema.helper}</FormHelperText> : ""}
            </FormControl>
        </Au>
    )
};

export const mySelect = (e) => {
    return (
       <Au>
           <FormControl required={e.required} fullWidth disabled={e.readonly || e.schema.editType !== undefined}>
               <InputLabel>{e.schema.title}</InputLabel>
                <Select value="f" style={{width: "100%"}}>
                    <MenuItem value="f">Please select</MenuItem>
                    {(e.schema.items !== undefined) ? e.schema.items.enum.map((item, i) => (
                        <MenuItem value={item} key={i}>{item}</MenuItem>
                    )) : null}
                </Select>
               {e.schema.helper !== undefined? <FormHelperText>{e.schema.helper}</FormHelperText> : ""}
           </FormControl>
       </Au>
    )
};

export const staticText = (e) => {
    return (
            <Typography variant={e.schema.inputType}>{e.schema.title}</Typography>
        )
};

export const staticBreak = (e) => {
    return (
        <Divider/>
        )
};

export const staticImg = (e) => {
    return (
        <Au>
            <Typography>{e.schema.title}</Typography>
            <img src={e.schema.src}/>
        </Au>
        )
};

export const fileUpload = (e) => {
    return (
        <Au>
            <TextField fullWidth
                       disabled={e.readonly || e.schema.editType !== undefined}
                       required={e.required}
                       type={"file"}
                       label={e.schema.title}
                       helperText={e.schema.helper}
                       defaultValue={e.schema.default}
                       placeholder={e.schema.placeholder}
                       InputLabelProps={{
                           shrink: true,
                       }}
            />
        </Au>
        )
};
//
// export const myCheckbox = (e) =>{
//     return (
//         <FormControlLabel
//             control={
//                 <Checkbox
//                     //checked={e.required}
//                     //onChange={() => e.onChange(!e.value)}
//                     value={e.title}
//                 />
//             }
//             label={e.schema.title}
//         />
//     );
// };