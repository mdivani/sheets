import * as React from "react";
import "../css/components/cell-view.css";

function ValueViewer(props: any) {
    const {value} = props;
    return (
        <div className="cell-view">
            {value}
        </div>
    );
}

export default ValueViewer;