import * as React from "react";
import "../css/components/button.css";

interface IProps {
    value: string;
    handleClick?: any;
    extraClass?: string;
    type?: string;
}

function Button ({ value, type, handleClick, extraClass = "" }: IProps) {

    return (
        <button 
            type={type}
            className={`btn ${extraClass}`}
            onClick={handleClick}>
            {value}
        </button>
    );
}

export default Button;