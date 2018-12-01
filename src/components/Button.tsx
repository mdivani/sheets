import * as React from "react";
import "../css/components/button.css";

interface IProps {
    value: string;
    handleClick?: any;
    extraClass?: string;
}

function Button ({ value, handleClick, extraClass = "" }: IProps) {

    return (
        <button 
            className={`btn ${extraClass}`}
            onClick={handleClick}>
            {value}
        </button>
    );
}

export default Button;