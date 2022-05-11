export interface RuleProp {
  type: "required" | "email" | "custom"
  message: string
  validator?: (inputVal: string) => boolean
}

export type ValidateFunc = () => boolean
