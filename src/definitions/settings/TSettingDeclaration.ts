export type TSettingDeclaration = {
  id: string;
  i18nLabel: string;
  i18nDescription: string;
  required: boolean;
  type: "string" | "boolean" | "number";
};
