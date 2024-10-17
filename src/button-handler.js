export class ButtonHandler {
    constructor(action){
        this.action = action;
    }

    execute(e, submitFtn, cancelFtn){
        this.action.handleEvent(e, submitFtn, cancelFtn);
    }
}

class Action {
    handleEvent(){};
}

export class FormSubmitAction extends Action {
    handleEvent(e, submitFtn, cancelFtn){
        const form = e.target.parentElement;
        submitFtn(form);
        cancelFtn(form);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e, submitFtn, cancelFtn){
        const form = e.target.parentElement;
        cancelFtn(form);
    }
}