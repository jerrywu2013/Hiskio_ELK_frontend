import { getApiResponseI18n } from "src/api/utils";
import { i18n } from "boot/i18n";
import { Notify } from "quasar";

const UpdateSucc = "Update successfully";
const CreateSucc = "Create successfully";

export const updateNotify = function () {
  Notify.create({
    type: "info",
    color: "green",
    message: i18n.t(getApiResponseI18n(UpdateSucc))
  });
};

export const createNotify = function () {
  Notify.create({
    type: "info",
    color: "green",
    message: i18n.t(getApiResponseI18n(CreateSucc))
  });
};
