import { Role } from "./userModel"

export interface SignUpModel {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: Role
}