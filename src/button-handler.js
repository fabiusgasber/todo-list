import { domLoader } from "./dom-loader";

export class ButtonHandler {
    constructor(action){
        this.action = action;
    }

    execute(e){
        this.handleEvent(e);
    }

    handleEvent(e){
        this.action.handleEvent(e);
    }
}

class Action {
    handleEvent(){};
}

export class FormSubmitAction extends Action {
    handleEvent(){
        domLoader.submitForm();
    }
}

export class FormCancelAction extends Action {
    handleEvent(e){
        domLoader.removeElement(e.target.parentElement);
    }
}