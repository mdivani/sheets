import * as React from "react";
import DataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

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
        const grid = this.props.grid.map((row: any) => [...row]);
        changes.forEach(({cell, row, col, value}: any) => {
          grid[row][col] = {...grid[row][col], value}
        })
        this.props.onGridChange(grid);
    }

    public render() {
        return (
            <DataSheet
                overflow="wrap"
                data={this.props.grid}
                valueRenderer={this.valueRenderer}
                onContextMenu={this.onContextMenu}
                onCellsChanged={this.onCellsChanged}
          />
        )
    }
}