import * as React from "react";
import "../css/components/loader.css";
import loader from "../loader.gif";

function Loading() {

    return (
        <img className="loader" src={loader} alt="loading..." />
    );
}

export default Loading;