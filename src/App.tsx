import * as React from 'react';
import Container from "./components/Container";
import Form from "./components/Form";
import Loading from "./components/Loading";
import Table from './components/Table';

class App extends React.Component {

  public state: any = {
    grid: [
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false,  value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}]
    ],
    headers: [
      {value: 'Column1', className: "table__header", width: "12rem", readOnly: true},
      {value: 'Column2', className: "table__header", width: "12rem", readOnly: true},
      {value: 'Column3', className: "table__header", width: "12rem", readOnly: true},
      {value: 'Column4', className: "table__header", width: "12rem", readOnly: true},
      {value: 'Column5', className: "table__header", width: "12rem", readOnly: true},
    ],
    imgUrl: "",
    isLoading: false,
  }

  public onGridChange = (newGrid: []) => {
    // ignore first row which is headers
    const grid = newGrid.filter((item, index) => {
      return index !== 0 ? item : null;
    })
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
    this.setState({isLoading: true});
    return fetch("", {
      method: 'POST',
      mode: 'cors',
      // tslint:disable-next-line:object-literal-sort-keys
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data)
    }).then(() => {
      // display png image from response
      this.setState({isLoading: false}, this.resetGrid);
    }).catch((error) => {
      // handle error
      this.setState({isLoading: false});
    });
  }

  public handleSubmit = () => {
    const submitData: object[] = this.convertStateToPostData();
    this.postData(submitData);
  }

  public resetGrid = () => {
    const grid = [
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}],
      [{readOnly: false, value: ""}, {value: ""}, {value: ""}, {value: ""}, {value: ""}]
    ];

    this.setState({ grid });
  }

  public render() {
    const grid: any = [
      this.state.headers,
      ...this.state.grid
    ];

    return (
        <Container>
          {
            this.state.isLoading ? <Loading /> :
              <Form handleSubmit={this.handleSubmit}>
                <Table
                  grid={grid}
                  onGridChange={this.onGridChange} />   
              </Form>
          }
        </Container>
    );
  }
}

export default App;
