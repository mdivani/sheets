import * as React from "react";
import DataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

interface IProps {
    grid: [];
    headers: [];
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
          grid[row - 1][col] = {...grid[row - 1][col], value}
        })
        this.props.onGridChange(grid);
    }

    public render() {
        const grid = [
            this.props.headers,
            ...this.props.grid
        ];

        return (
            <DataSheet
                overflow="wrap"
                data={grid}
                valueRenderer={this.valueRenderer}
                onContextMenu={this.onContextMenu}
                onCellsChanged={this.onCellsChanged}
          />
        )
    }
}