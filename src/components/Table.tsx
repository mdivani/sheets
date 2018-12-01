import * as React from "react";
import DataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import "../css/components/table.css";

interface IProps {
    grid: [];
    onGridChange: any;
}

export default class Table extends React.Component<IProps> {

    public valueRenderer = (cell: any) => {
        return cell.value;
    }

    public onContextMenu = (e: any, cell: any, i: any, j: any) => cell.readOnly ? e.preventDefault() : null;

    public onCellsChanged = (changes: any) => {
        const grid: any = [
            ...this.props.grid
        ];
        changes.forEach(({cell, row, col, value}: any) => {
          grid[row][col] = {...grid[row][col], value}
        });
        this.props.onGridChange(grid);
    }

    public render() {
        const {grid} = this.props;

        return (
            <DataSheet
                className="table"
                overflow="wrap"
                data={grid}
                valueRenderer={this.valueRenderer}
                onContextMenu={this.onContextMenu}
                onCellsChanged={this.onCellsChanged}
          />
        );
    }
}