import { parse, format, addDays, differenceInDays, isToday } from "date-fns";

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

    isDueNextWeek(){
        let today = new Date();
        today = addDays(today, 6);
        const difference = differenceInDays(today, this.#date);
        return difference <= 6 && difference >= 0;
    }
}