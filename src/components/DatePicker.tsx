import * as moment from "moment";
import * as React from "react";
import "../css/components/datepicker.css";

enum Months {
    jan = 0,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
}

interface IProps {
    onChange: any;
    disable: boolean;
}

interface IState {
    month: Months;
    days: number;
    currentYear: number;
    selectedDay: number;
    selectedYear: number;
}

export default class BirthDateForm extends React.Component<IProps, IState> {

    public state: IState = {
        month: Months.jan,
        // tslint:disable-next-line:object-literal-sort-keys
        days: 31,
        currentYear: new Date().getFullYear(),
        selectedDay: 1,
        selectedYear: new Date().getFullYear(),
    };

    public componentDidMount() {
        const currentYear = (new Date()).getFullYear();
        this.setState({currentYear});
    }

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        const { month, selectedYear, selectedDay } = this.state;
        if (prevState.month !== month || prevState.selectedYear !== selectedYear) {
            const days = new Date(selectedYear, month, 0).getDate();
            this.setState({days});
        }

        if (prevState.month !== month ||
            prevState.selectedYear !== selectedYear ||
            prevState.selectedDay !== selectedDay) {
                const date = moment({
                    day: selectedDay,
                    year: selectedYear,
                    // tslint:disable-next-line:object-literal-sort-keys
                    month
                }).format("DD/MM/YYYY");
                this.props.onChange(date);
            }
    }

    public onSelectedMonthChange = (event: any) => {
        const month: Months = event.target.value;
        this.setState({month});
    }

    public onSelectedDayChange = (event: any) => {
        const selectedDay: number = event.target.value;
        this.setState({selectedDay});
    }

    public onSelectedYearChange = (event: any) => {
        const selectedYear: number = event.target.value;
        this.setState({selectedYear});
    }

    public render() {
        const {month, selectedDay, selectedYear, days, currentYear} = this.state;
        return (
            <div className="datepicker">
                <select
                    className="datepicker__select margin-l-s"
                    disabled={this.props.disable}
                    onChange={this.onSelectedDayChange}
                    value={selectedDay}>
                    {
                        this.createDaysArr(days).map((day) => {
                            return <option key={day} value={day}>{day}</option>;
                        })
                    }
                </select>
                <select
                    className="datepicker__select"
                    disabled={this.props.disable}
                    onChange={this.onSelectedMonthChange}
                    value={month}>
                    <option value={Months.jan}>Jan</option>
                    <option value={Months.feb}>Feb</option>
                    <option value={Months.mar}>Mar</option>
                    <option value={Months.apr}>Apr</option>
                    <option value={Months.may}>May</option>
                    <option value={Months.jun}>Jun</option>
                    <option value={Months.jul}>Jul</option>
                    <option value={Months.aug}>Aug</option>
                    <option value={Months.sep}>Sep</option>
                    <option value={Months.oct}>Oct</option>
                    <option value={Months.nov}>Nov</option>
                    <option value={Months.dec}>Dec</option>
                </select>
                <select
                    className="datepicker__select margin-l-s"
                    disabled={this.props.disable}
                    onChange={this.onSelectedYearChange}
                    value={selectedYear}>
                    {
                        this.createYearsArr(currentYear).map((year) => {
                            return <option key={year} value={year}>{year}</option>;
                        })
                    }
                </select>
                {this.props.children}
            </div>
        );
    }

    private createDaysArr = (numDays: number) => {
        const daysArr: number[] = [];
        for (let day = 1; day <= numDays; day++) {
            daysArr.push(day);
        }
        return daysArr;
    }

    private createYearsArr = (currentYear: number) => {
        const yearsArr = [];
        const endYear = currentYear + 50;
        for (let year = currentYear; year <= endYear; year++) {
            yearsArr.push(year);
        }
        return yearsArr;
    }
}