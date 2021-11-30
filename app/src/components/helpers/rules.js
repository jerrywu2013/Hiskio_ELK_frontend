import { i18n } from "boot/i18n";

const EmailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const MyTestPattern = {
  date: v => /^-?[\d]+\-[0-1]\d\-[0-3]\d$/.test(v),
  email: v => EmailPattern.test(v) || i18n.t("__form.__invalid_email"),
  empty: v => !!v || i18n.t("__form.__empty_field")
};

export function checkPasswordLength (val) {
  return val.length >= 4 || this.$t("__user.__password_too_short");
}

export default {
  MyTestPattern
};
