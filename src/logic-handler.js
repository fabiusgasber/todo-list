import { ButtonHandler, FormSubmitAction, FormCancelAction, ProjectDeleteAction, TodoDeleteAction, FormAddAction, TodoCompleteAction } from "./button-handler";

export const logicHandler = (() => {

    const handler = {
        buttonAction: {
            "form-submit-btn": new ButtonHandler(new FormSubmitAction()),
            "form-cancel-btn": new ButtonHandler(new FormCancelAction()),
            "deleteProject-btn": new ButtonHandler(new ProjectDeleteAction()),
            "delete-div": new ButtonHandler(new TodoDeleteAction()),
            "addTodo": new ButtonHandler(new FormAddAction()),
            "addProject": new ButtonHandler(new FormAddAction()),
            "checker": new ButtonHandler(new TodoCompleteAction()),
            "checker checked": new ButtonHandler(new TodoCompleteAction()),
        },
    }

    const getLogicObject = () => handler;

    return { getLogicObject };
})();
