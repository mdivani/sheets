import * as React from "react";
import "../css/components/container.css";

interface IProps {
    children: React.ReactNode;
}

function Container({children}: IProps) {
    return (
        <div className="container">
            {children}
        </div>
    );
}

export default Container;