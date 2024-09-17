export class Priority {

    #level;

    static acceptedLevels = ["low", "medium", "high"];

    constructor(level){
        this.#level = this.validateLevel(level);
    }

    getLevel(){
        return this.#level;
    }

    setLevel(newLevel){
        this.#level = this.validateLevel(newLevel);
    }

    validateLevel(level){
       return Priority.acceptedLevels.includes(level) ? level : "medium";
    }

    static comparePriorities(prioA, prioB){
        const valueA = Priority.acceptedLevels.indexOf(prioA.getLevel());
        const valueB = Priority.acceptedLevels.indexOf(prioB.getLevel());
        return valueA - valueB;
    }
}