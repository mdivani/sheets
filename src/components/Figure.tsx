import * as React from "react";

interface IProps {
    imgUrl: string;
}

class Figure extends React.Component<IProps> {

    public render() {
        const {imgUrl} = this.props;

        return (
            <figure className="figure">
                <img className="figure__img" src={imgUrl} alt="image not found" />
            </figure>
        );
    }
}

export default Figure;