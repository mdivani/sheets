import * as moment from "moment";

const DEFAULT_CONFIG = {
    dateFormat: "DD/MM/YYYY",
}

export interface IRow {
    type: Types;
    project: string;
    startDate: string;
    endDate: string;
    dependsOn?: string;
    extraCols?: string[];
    isComplete: () => boolean;
}

export enum Types {
    blank = 0,
    project,
    milestone
}

export default class Row implements IRow {
    public type: Types;
    public project: string;
    public startDate: string;
    public endDate: string;
    public dependsOn?: string;
    public extraCols?: string[];

    constructor(params: IRow) {
        this.type = params.type || Types.blank;
        this.project = params.project || "";
        this.startDate = params.startDate || "";
        this.endDate = params.endDate || "";
        this.dependsOn = params.dependsOn;
        this.extraCols = params.extraCols;
    }

    public isComplete = () => {
        return this.checkType() && this.checkStartDate() && this.checkEndDate() && !!this.project;
    }

    private checkType = (): boolean => {
        return this.type > 0;
    }

    private checkStartDate = (): boolean => {
        if (this.startDate) {
            return moment(this.startDate, DEFAULT_CONFIG.dateFormat, true).isValid();
        }
        return false;
    }

    private checkEndDate = (): boolean => {
        if (this.type === Types.milestone) {
            return true;
        }
        else if(this.endDate) {
            return moment(this.endDate, DEFAULT_CONFIG.dateFormat, true).isValid();
        } else {
            return false
        }
    }

}