import { JwtPayload } from "jsonwebtoken";

export type cookiewithid = JwtPayload & {
    id: string
}
export type cookie = cookiewithid | string 