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
import Divider from "@material-ui/core/es/Divider/Divider";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import axios from "axios";
import Dropzone from "react-dropzone";


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
                       disabled={e.readonly}
                       required={e.required}
                       multiline={(e.schema.textarea)}
                       rows={e.schema.rows}
                       type={e.schema.inputType}
                       label={e.schema.title}
                       helperText={e.schema.helper}
                       defaultValue={e.schema.default}
                       placeholder={e.schema.placeholder}
                       //value={e.value}
                       onChange={(event) => e.onChange(event.target.value)}
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
    }
    return (
        <Au>
            <TextField fullWidth
                       disabled={e.readonly}
                       required={e.required}
                       type={e.schema.inputType}
                       label={e.schema.title}
                       helperText={e.schema.helper}
                       defaultValue={e.schema.default}
                       placeholder={e.schema.placeholder}
                       onChange={(event) => e.onChange(event.target.value)}
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

export const  myRadio = e => {
        return (
            <Au>
                <FormControl required={e.schema.require} fullWidth disabled={e.readonly}>
                    <FormLabel>{e.schema.title}</FormLabel>
                    <RadioGroup
                        name={e.schema.id}
                        value={e.value}
                    >
                        {e.schema.items.enum.map((item, i) => (
                            <FormControlLabel
                                value={item}
                                onChange={(event) => e.onChange(event.target.value)}
                                disabled={e.readonly}
                                key={i}
                                control={
                                    <Radio
                                        value={item}/>
                                }
                                label={item}
                            />
                        ))}
                    </RadioGroup>
                    {e.schema.helper !== undefined? <FormHelperText>{e.schema.helper}</FormHelperText> : ""}

                </FormControl>
            </Au>
        )
};

let val = [];
export const myCheckboxes = (e) => {
    return (
        <Au>
            <FormControl required={e.schema.require} fullWidth disabled={e.readonly}>
                <FormLabel>{e.schema.title}</FormLabel>
                {e.schema.items.enum.map((item, i) => (
                    <FormControlLabel
                        key={i} disabled={e.readonly}
                        onChange={
                            (event) => {
                                if(val.includes(event.target.value))
                                    val = val.filter(item => item !== event.target.value);
                                else
                                    val.push(event.target.value);
                                e.onChange(val)
                            }
                        }
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
           <FormControl required={e.required} fullWidth disabled={e.readonly}>
               <InputLabel>{e.schema.title}</InputLabel>
                <Select  style={{width: "100%"}}
                         value={e.value !== undefined ? e.value : "f"}
                        onChange={(event) => {
                            e.onChange(event.target.value);
                        }}>
                    <MenuItem value="f" selected>Please select</MenuItem>
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


const onDrop =(accepted, rejected)=> {
    if (rejected.length) {
        //do something with rejected files
    } else {
        let data = new FormData();
        //for (let i = 0; i < this.state.files.length; i++) {
            let file = accepted[0];
            data.append("file" + 0, file, file.name);
        //}
        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
        };
        axios.post("upload-files", data, config);
    }
};


export const fileUpload = (e) => {
    let acceptTypes = "";
    if(e.schema.accept !== undefined) {
         acceptTypes = e.schema.accept.join(", ");
        //console.log(acceptTypes);
    }
    const maxSize = e.schema.maximum*1024*1024;
    return (
        <Au>
            <InputLabel>{e.schema.title} {e.required ? "*" : ""}</InputLabel>
            {/*<TextField fullWidth*/}
                       {/*disabled={e.readonly}*/}
                       {/*required={e.required}*/}
                       {/*type={"file"}*/}
                       {/*label={e.schema.title}*/}
                       {/*helperText={e.schema.helper}*/}
                       {/*defaultValue={e.schema.default}*/}
                       {/*placeholder={e.schema.placeholder}*/}
                       {/*onChange={(event) => processFile(event.target.files).then(d=>{*/}
                           {/*console.log(d);*/}
                           {/*return e.onChange;*/}
                       {/*})}*/}
                       {/*InputLabelProps={{*/}
                           {/*shrink: true,*/}
                       {/*}}*/}
            {/*/>*/}
            <div className="dropzonev">
            <Dropzone
                accept={acceptTypes}
                style={{position: "relative", width:"100%",height: 56,borderRadius: 4, border: "3px dotted #ccc", textAlign: "center", lineHeight: "50px"}}
                name={"fgh"}
                maxSize={maxSize > 0 ? maxSize : Infinity}
                multiple={false}
                acceptStyle={{border: "3px dotted green"}}
                rejectStyle={{border: "3px dotted red"}}

                onDrop={onDrop}>
                <p>{e.schema.helper !== undefined? <Au>{e.schema.helper}</Au> : "Try dropping here, or click to upload."}
                    </p>
            </Dropzone>
            </div>
            {acceptTypes !== "" ?  <FormHelperText>Acceptable file types: {acceptTypes} </FormHelperText> : ""}
            {maxSize > 0 ? <FormHelperText> ( Maximum file size: {e.schema.maximum}MB )</FormHelperText> : ""}
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