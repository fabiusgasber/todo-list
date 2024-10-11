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
        domLoader.submitForm(e.target.parentElement);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e){
        const element = e.target.parentElement;
        domLoader.removeElement(element);
        domLoader.resetElement(element);
    }
}