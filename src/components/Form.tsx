import * as React from "react";
import Button from "./Button";

interface IProps {
    handleSubmit: any;
    children: React.ReactNode;
}

export default class Form extends React.Component<IProps> {

    public onSubmit = (event: any) => {
        event.preventDefault();
        this.props.handleSubmit();
    }

    public render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.props.children}
                <Button value="Send" extraClass="btn--primary" />
            </form>
        );
    }
}