import { domLoader } from "./dom-loader";

export class ButtonHandler {
    constructor(action){
        this.action = action;
    }

    execute(e){
        this.action.handleEvent(e);
    }
}

class Action {
    handleEvent(){};
}

export class FormSubmitAction extends Action {
    handleEvent(e){
        const element = e.target.parentElement;
        domLoader.submitForm(element);
        domLoader.removeElement(element);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e){
        const element = e.target.parentElement;
        domLoader.removeElement(element);
    }
}

export class FormProjectSubmitAction extends Action {
    handleEvent(e){
        const element = e.target.parentElement;
        domLoader.submitProject(element);
        domLoader.removeElement(element);
    }
}