import { parse, format } from "date-fns";

export class DueDate {

    #date 

    constructor(date){
        this.#date = this.parseDate(date);
    }

    getDate(){
        return this.#date;
    }

    setDate(newDate){
        this.#date = this.parseDate(newDate);
    }

    parseDate(date) {
        return parse(date, "yyyy-MM-dd", new Date());
    }

    toString() {
       return isNaN(this.#date.getTime()) ? "" : format(this.#date, "yyyy-MM-dd");
    }

    isDueToday(){
        return isToday(this.#date);
    }

}