import * as React from 'react';
import Container from "./components/Container";
import Form from "./components/Form";
import Table from './components/Table';

class App extends React.Component {

  public state: any = {
    grid: [
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}]
    ],
    headers: [
      {value: 'Column1', readOnly: true},
      {value: 'Column2', readOnly: true},
      {value: 'Column3', readOnly: true},
      {value: 'Column4', readOnly: true},
      {value: 'Column5', readOnly: true},
    ]
  }

  public onGridChange = (grid: []) => {
    this.setState({grid});
  }

  public addRow = () => {
    const newRow = [{readOnly: false, value: ""}, {value: ""}, {value: ""}];
    const grid = this.state.grid;
    grid.push(newRow);
    this.setState({grid});
  }

  public convertStateToPostData = ():object[] => {
    const { headers } = this.state;
    return this.state.grid.map((row: []) => {
      let data = {};
      row.forEach((item: any, index) => {
        data = {
          ...data,
          [headers[index].value]: item.value
        }
      });
      return data;
    });
  }

  public postData = (data: object) => {
    fetch("", data).then(() => {
      // display png image from response
    }).catch((error) => {
      // handle error
    });
  }

  public handleSubmit = () => {
    const submitData: object[] = this.convertStateToPostData();
    this.postData(submitData);
  }

  public render() {
    return (
        <Container>
          <Form handleSubmit={this.handleSubmit}>
            <Table
              headers={this.state.headers}
              grid={this.state.grid}
              onGridChange={this.onGridChange} />   
          </Form>
        </Container>
    );
  }
}

export default App;
