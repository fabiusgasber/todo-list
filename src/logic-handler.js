import { ButtonHandler, FormSubmitAction, FormCancelAction, ProjectDeleteAction, TodoDeleteAction, FormAddAction, TodoCompleteAction } from "./button-handler";
import { Navigation, PageAll } from "./navigation";
import { defaultProject } from "./projects";

export const logicHandler = (() => {

    const handler = {
        navigation: {
            "all": new Navigation(new PageAll(), defaultProject.allTasks.getTodos, defaultProject.allTasks),
            "today": new Navigation(new PageAll(), defaultProject.allTasks.getToday, defaultProject.allTasks),
            "week": new Navigation(new PageAll(), defaultProject.allTasks.getWeek, defaultProject.allTasks),
            "important": new Navigation(new PageAll(), defaultProject.allTasks.getImportant, defaultProject.allTasks),
        },
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
