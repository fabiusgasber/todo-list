import { ButtonHandler, FormCancelAction, FormSubmitAction } from "./button-handler";
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
            "submit-btn": new ButtonHandler(new FormSubmitAction()),
            "cancel-btn": new ButtonHandler(new FormCancelAction()),
        },
    }

    const getLogicObject = () => handler;

    return { getLogicObject };
})();
