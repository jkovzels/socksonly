import './styles/main';

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ComingSoonView } from './components/ComingSoonView';

console.log("Socks on, up and running");

ReactDOM.render(
    <ComingSoonView/>,
    document.getElementById("root")
);