import { ExclamationCircleOutlined, SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";

export const STATUS_OPTS = [
    { value: "Active", en: "Active", ar: "تم الإبلاغ عنه" },
    { value: "InProgress", en: "In Progress", ar: "قيد التنفيذ" },
    { value: "Resolved", en: "Resolved", ar: "تم الحل" },
];
export const STATUS_TO_CODE = {
    Active: 0,
    "تم الإبلاغ عنه": 0,
    InProgress: 1,
    "قيد التنفيذ": 1,
    Resolved: 2,
    "تم الحل": 2,
};
export const STATUS_ICON = {
    Active: <ExclamationCircleOutlined />,
    InProgress: <SyncOutlined />,
    Resolved: <CheckCircleOutlined />,
};
export const STATUS_COLOR = {
    Active: "blue",
    InProgress: "orange",
    Resolved: "green",
};