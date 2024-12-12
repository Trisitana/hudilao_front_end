import {postAction,getAction, deleteAction,putAction} from "./manage";


export const cookLogin = (params) => postAction("/api/cook/login", params)

export const cookGetOrder=(params)=>getAction("/api/cook/order",params)
export const cookGetAlerts=(params)=>getAction("/api/cook/history/announcement",params)
export const cookGetSchedule=(params)=>getAction("/api/cook/schedule",params)
export const cookHandOrder=(params)=>postAction("/api/cook/ready",params)