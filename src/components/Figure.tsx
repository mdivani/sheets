import * as React from "react";

interface IProps {
    imgUrl: string;
}

function Figure({imgUrl}: IProps) {

    return (
        <figure className="figure">
            <img className="figure__img" src={imgUrl} alt="image not found" />
        </figure>
    );
}

export default Figure;