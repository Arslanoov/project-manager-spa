import { LANG_EN, LANG_EN_NAME, LANG_RU, LANG_RU_NAME } from "@/const/lang"

export const getToggledLanguage = (lang: string) => lang === LANG_EN ? LANG_RU : LANG_EN

export const getLanguageName = (lang: string) => lang === LANG_EN ? LANG_EN_NAME : LANG_RU_NAME
