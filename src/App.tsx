import * as React from 'react';
import './App.css';
import Table from './components/Table';

class App extends React.Component {

  public state: any = {
    grid: [
      [
        {value: 'Column1', readOnly: true},
        {value: 'Column2', readOnly: true},
        {value: 'Column3', readOnly: true},
      ],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}]
    ]
  }

  public onGridChange = (grid: []) => {
    this.setState({grid});
  }

  // public onSubmit = (event:any) => {
  //   event.preventDefault();
  //   const { grid } = this.state;
  //   const headers: object = grid[0];

  // }

  public render() {
    return (
      <div className="App">
        <Table
          grid={this.state.grid}
          onGridChange={this.onGridChange} />
      </div>
    );
  }
}

export default App;
