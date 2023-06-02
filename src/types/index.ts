export enum ToastDataTypeEnum {
    Default = "default",
    Success = "success",
    Error = "error"
}

export type ToastDataType = {
    type: ToastDataTypeEnum,
    text: string
}