import * as moment from "moment";

const DEFAULT_CONFIG = {
    dateFormat: "DD/MM/YYYY",
}

export interface IRow {
    type: string;
    project: string;
    startDate: string;
    endDate: string;
    dependsOn?: string;
    extraCols?: any;
}

export enum Types {
    blank,
    project,
    milestone
}

export default class Row implements IRow {
    public type: string;
    public project: string;
    public startDate: string;
    public endDate: string;
    public dependsOn?: string;
    public extraCols?: any;

    constructor(params: IRow = {
        type: "",
        // tslint:disable-next-line:object-literal-sort-keys
        project: "",
        startDate: "",
        endDate: ""
    }) {
        this.type = params.type || "";
        this.project = params.project || "";
        this.startDate = params.startDate || "";
        this.endDate = params.endDate || "";
        this.dependsOn = params.dependsOn;
        this.extraCols = params.extraCols;
    }

    public isComplete = () => {
        return this.checkType() && this.checkStartDate() && this.checkEndDate() && !!this.project;
    }

    public getFormattedRow = () => {
        if (this.isComplete()) {
            return {
            type: this.type,
            // tslint:disable-next-line:object-literal-sort-keys
            project: this.project,
            startDate: this.startDate,
            endDate: this.endDate,
            dependsOn: this.dependsOn,
            ...this.extraCols
            } 
        }
        return {};
    }

    private checkType = (): boolean => {
        return this.type === "milestone" || this.type === "project";
    }

    private checkStartDate = (): boolean => {
        if (this.startDate) {
            return moment(this.startDate, DEFAULT_CONFIG.dateFormat, true).isValid();
        }
        return false;
    }

    private checkEndDate = (): boolean => {
        if (this.type === "milestone") {
            return true;
        }
        else if(this.endDate) {
            return moment(this.endDate, DEFAULT_CONFIG.dateFormat, true).isValid();
        } else {
            return false
        }
    }

}