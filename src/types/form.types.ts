export type TPropsFormInputSelector = {
    valueId: number;
    name: string;
}
export type  TPropsFormInputSelect = {
    valueId:number;
    name:string;
}

export type TFormInputListFilterOption = {
    valueId:number | string;
    name: string;
}

export type TFormMultiLanguageOptions = {
    langId?: number;
    translated: 0 | 5 | 10;
    value: string | null;
}
export type ILanguages = 'IT' | 'EN' | 'ES'|'DE' |'FR';

export type TFormMultilanguageRecordOption = {
[P in ILanguages]?: TFormMultiLanguageOptions
}
export type TSnackbarContentTypes = 'success'|'error'|'warning'|'info';

export type TPropsFormComboRadioGroup = {
    name:string;
    value:string;
}

export type TPropsFormRadioGroup = {
    name:string;
    value:string;
}

export type TPropsSteps = {
    label:string;
    key:string;
    show: boolean;
}