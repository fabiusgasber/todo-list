import { ButtonHandler, FormCancelAction, TodoSubmitAction, ProjectDeleteAction, ProjectSubmitAction, TodoDeleteAction } from "./button-handler";
import { Navigation, PageAll, PageImportant, PageToday, PageWeek } from "./navigation";

export const logicHandler = (() => {

    const handler = {
        navigation: {
            "all": new Navigation(new PageAll()),
            "today": new Navigation(new PageToday()),
            "week": new Navigation(new PageWeek()),
            "important": new Navigation(new PageImportant()),
        },
        buttonAction: {
            "todo-submit-btn": new ButtonHandler(new TodoSubmitAction()),
            "project-submit-btn": new ButtonHandler(new ProjectSubmitAction()),
            "cancel-btn": new ButtonHandler(new FormCancelAction()),
            "deleteProject-btn": new ButtonHandler(new ProjectDeleteAction()),
            "deleteTodo-btn": new ButtonHandler(new TodoDeleteAction()),
        },
    }

    const getLogicObject = () => handler;

    return { getLogicObject };
})();
