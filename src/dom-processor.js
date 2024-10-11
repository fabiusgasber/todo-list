import { domCreator } from "./dom-creator";

class DomProcessor{
    constructor(value){
        this.value = value;
    }

    process(value){
        this.value.process(value);
    }
}

class TextProcessor extends DomProcessor {
    process(value){
        return domCreator.createElement("p", value);
    }
}

class SelectProcessor extends DomProcessor {
    process(selectValue){
       const select = domCreator.createElement("select", "", { value: selectValue });
       const option = domCreator.createElement("option", selectValue);
       select.append(option);
       return select;
    }
}

class DateProcessor extends DomProcessor {
    process(dateValue){
        return domCreator.createElement("input", "", { type: "date", value: dateValue });
    }
}

export const domProcessor = (() => {
   
    const processor = {
     "text": new TextProcessor(),
     "date": new DateProcessor(),
     "select-one": new SelectProcessor(),
    }
 
    const getProcessor = () => processor;
 
    return { getProcessor }
 })();