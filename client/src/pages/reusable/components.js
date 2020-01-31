import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { Divider } from "@material-ui/core";

export function DataDisplay(props) {
    return (
        <Grid item container>
            <Grid item sm={2} xs={12}>
                <Typography variant="subtitle1" className="center">{props.title}</Typography>
            </Grid>
            <Grid item sm={8} xs={12}>
                <Typography variant="h6" component={props.component} className="center font-medium">{props.label}</Typography>
            </Grid>
        </Grid>
    )
}

export function EditBox(props) {
    return (
        <Grid item xs={props.xs} sm={props.sm}>
            <TextField
                className={props.className}
                disabled={props.disabled}
                fullWidth={props.fullWidth}
                id={props.id}
                label={props.label}
                multiline={props.multiline}
                name={props.name}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                variant="outlined"
            />
        </Grid>
    )
}

export function HLine() {
    return (
        <Grid item xs={12}><Divider></Divider></Grid>
    )
}