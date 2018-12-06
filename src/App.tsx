import * as React from 'react';
import Container from "./components/Container";
import DatePicker from "./components/DatePicker";
import Figure from './components/Figure';
import Form from "./components/Form";
import Loading from "./components/Loading";
import Table from './components/Table';
import TypeDropdown from "./components/TypeDropdown";
import ICell from "./models/ICell";
import Row from './models/Row';

interface IState {
  grid: ICell[][];
  headers: any[];
  imgUrl: string;
  isLoading: boolean;
  error: string;
}

class App extends React.Component {

  public state: IState = {
    grid: [
      [
        {readOnly: false, value: "", dataEditor: TypeDropdown },
        {value: ""},
        {value: ""},
        {value: "", dataEditor: DatePicker}, 
        {value: "",  dataEditor: DatePicker}, 
        {value: ""}
      ],
      [
        {value: "", dataEditor: TypeDropdown },
        {value: ""},
        {value: ""},
        {value: "", dataEditor: DatePicker}, 
        {value: "",  dataEditor: DatePicker}, 
        {value: ""}
      ],
      [
        {value: "", dataEditor: TypeDropdown },
        {value: ""},
        {value: ""},
        {value: "", dataEditor: DatePicker}, 
        {value: "",  dataEditor: DatePicker}, 
        {value: ""}
     ],
      [
        {value: "", dataEditor: TypeDropdown },
        {value: ""},
        {value: ""},
        {value: "", dataEditor: DatePicker}, 
        {value: "",  dataEditor: DatePicker}, 
        {value: ""}
      ],
    ],
    headers: [
      {value: 'Type', className: "table__header", width: "12rem", readOnly: true},
      {value: 'Name', className: "table__header", width: "12rem", readOnly: true},
      {value: 'Project', className: "table__header", width: "12rem", readOnly: true},
      {value: 'StartDate', className: "table__header", width: "12rem", readOnly: true},
      {value: 'EndDate', className: "table__header", width: "12rem", readOnly: true},
      {value: 'Depends On', className: "table__header", width: "12rem", readOnly: true},
    ],
    imgUrl: "",
    isLoading: false,
    error: "",
  }

  public onGridChange = (newGrid: []) => {
    // ignore first row which is headers
    const grid = newGrid.filter((item, index) => {
      return index !== 0 ? item : null;
    })
    this.setState({grid, error: ""});
  }

  public addRow = () => {
    const newRow = this.createNewRow();
    const grid = this.state.grid;
    grid.push(newRow);
    this.setState({grid});
  }

  public createNewRow = () => {
    return this.state.headers.map((cell: any, index: number) => {
      if (cell.value === "Type") {
        return {
          dataEditor: TypeDropdown,
          value: ""
        }
      } 
      else if( cell.value === "StartDate" || cell.value === "EndDate") {
        return {
            dataEditor: DatePicker,
            value: ""
        }
      }
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
    return this.state.grid.reduce((filtered, row: ICell[]) => {

      let data = {};
      row.forEach((cell: any, index) => {
        if (index > 4) {
          data = {
            ...data,
            [headers[index].value]: cell.value
          }          
        }
      });

      const currentRow = new Row({
        type: row[0].value,
        // tslint:disable-next-line:object-literal-sort-keys
        name: row[1].value,
        project: row[2].value,
        startDate: row[3].value,
        endDate: row[4].value,
        dependsOn: row[5].value,
        extraCols: data
      });

      if (currentRow.isComplete()) {
        filtered.push(currentRow.getFormattedRow());
      }

      return filtered;
    }, []);
  }

  public postData = (data: object) => {
    this.setState({isLoading: true});
    return fetch("https://x2a1dhh6ig.execute-api.eu-west-1.amazonaws.com/Prod/ganttv3", {
      method: 'POST',
      mode: 'cors',
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
    // tslint:disable-next-line:no-console
    console.log(submitData);
    if (submitData.length > 0) {
      this.postData(submitData);
    } else {
      const error = "Please fill neccessary cells";
      this.setState({error});
    }
  }

  public renderPage = () => {
    if (!this.state.imgUrl) {
      const grid: any = [
        this.state.headers,
        ...this.state.grid
      ];

      return this.state.isLoading ? <Loading /> :
      <Form addNewRow={this.addRow} addNewColumn={this.addColumn} handleSubmit={this.handleSubmit}>
        <p className="error">{this.state.error}</p>
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
