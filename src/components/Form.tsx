import * as React from "react";
import Button from "./Button";

interface IProps {
    addNewRow?: any;
    addNewColumn?: any;
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
                <Button value="add row" type="button" handleClick={this.props.addNewRow} extraClass="btn--secondary" />
                <Button value="add column" type="button" handleClick={this.props.addNewColumn} extraClass="btn--secondary btn--margin-s" />
                {this.props.children}
                <Button value="Send" extraClass="btn--primary" />
            </form>
        );
    }
}