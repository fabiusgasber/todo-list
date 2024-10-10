import { domLoader } from "./dom-loader";

export class ButtonHandler {
    constructor(action){
        this.action = action;
    }

    execute(){
        this.handleEvent();
    }

    handleEvent(){
        this.action.handleEvent();
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
    handleEvent(){
        domLoader.removeForm();
    }
}