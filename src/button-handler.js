export class ButtonHandler {
    constructor(action){
        this.action = action;
    }

    execute(e, options){
        this.action.handleEvent(e, options);
    }
}

class Action {
    handleEvent(){};
}

export class FormSubmitAction extends Action {
    handleEvent(e, options){
        const form = e.target.parentElement;
        options["submitFtn"](form);
        options["cancelFtn"](form);
    }
}

export class FormCancelAction extends Action {
    handleEvent(e, options){
        const form = e.target.parentElement;
        options["cancelFtn"](form);
    }
}

export class ProjectDeleteAction extends Action {
    handleEvent(e, options){
        console.dir(e.target.parentElement);
        options.cancelFtn(e.target.parentElement);
    }
}