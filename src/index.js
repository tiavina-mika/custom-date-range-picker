import React from "react";
import ReactDOM from "react-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from '@material-ui/core/CssBaseline';

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <App />
    </MuiPickersUtilsProvider>, 
rootElement);
