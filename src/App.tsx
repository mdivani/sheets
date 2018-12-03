import * as React from 'react';
import Container from "./components/Container";
import Figure from './components/Figure';
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
      {value: 'Column1', className: "table__header", width: "12rem", readOnly: false},
      {value: 'Column2', className: "table__header", width: "12rem", readOnly: false},
      {value: 'Column3', className: "table__header", width: "12rem", readOnly: false},
      {value: 'Column4', className: "table__header", width: "12rem", readOnly: false},
      {value: 'Column5', className: "table__header", width: "12rem", readOnly: false},
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
    const newRow = this.createNewRow();
    const grid = this.state.grid;
    grid.push(newRow);
    this.setState({grid});
  }

  public createNewRow = () => {
    return this.state.headers.map(() => {
      return {value: ""};
    });
  }

  public addColumn = () => {
    const { grid, headers } = this.state;
    headers.push({
      className: "table__header", 
      readOnly: false,
      value: `column${headers.length + 1}`, 
      width: "12rem", 
    });
    grid.forEach((item: object[]) => {
      item.push({value: ""});
    });
    this.setState({grid, headers});
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
    return fetch("https://x2a1dhh6ig.execute-api.eu-west-1.amazonaws.com/Prod/dummy", {
      method: 'POST',
      // mode: 'cors',
      // tslint:disable-next-line:object-literal-sort-keys
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data)
    })
    .then((response) => {
      // display png image from response
      if (response.status === 200) {
        // set imgUrl to url from response
        return response.json();
      } else {
        this.setState({isLoading: false});
        return null;
      }
    })
    .then((body: any) => {
      if (body) {
        const imgUrl = body.getUrl;
        this.setState({isLoading: false, imgUrl});
      } else {
        this.setState({isLoading: false});
      }
    })
    .catch((error) => {
      // handle error
      // tslint:disable-next-line:no-console
      console.log(error);
      this.setState({isLoading: false});
    });
  }

  public handleSubmit = () => {
    const submitData: object[] = this.convertStateToPostData();
    this.postData(submitData);
  }

  // public resetGrid = () => {
  //   const grid = this.state.grid.map((row: []) => {
  //     row.forEach((item: any) => {
  //       item.value = "";
  //     });
  //     return row;
  //   });

  //   this.setState({ grid });
  // }

  public renderPage = () => {
    if (!this.state.imgUrl) {
      const grid: any = [
        this.state.headers,
        ...this.state.grid
      ];

      return this.state.isLoading ? <Loading /> :
      <Form addNewRow={this.addRow} addNewColumn={this.addColumn} handleSubmit={this.handleSubmit}>
        <Table
          grid={grid}
          onGridChange={this.onGridChange} />   
      </Form>
    } else {
      return <Figure imgUrl={this.state.imgUrl} />
    }
  }

  public render() {

    return (
        <Container>
          { this.renderPage()}
        </Container>
    );
  }
}

export default App;
