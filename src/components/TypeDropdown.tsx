import * as React from "react";
import "../css/components/dropdown.css";
import {Types} from "../models/Row";

export default class TypeDropdown extends React.Component<any> {

    public onSelectChange = (event: any) => {
        const value = event.target.value;
        this.props.onChange(Types[value]);
    }

    public render() {

        return (
            <select className="dropdown" onChange={this.onSelectChange} defaultValue={Types[Types.blank]}>
                <option value={Types.blank} >&nbsp;</option>
                <option value={Types.project} >{Types[Types.project]}</option>
                <option value={Types.milestone} >{Types[Types.milestone]}</option>
                {this.props.children}
            </select>
        );
    }
}