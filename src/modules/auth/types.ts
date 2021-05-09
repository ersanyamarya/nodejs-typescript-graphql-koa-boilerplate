export type UserObject = {
  _id?: string
  firstName: string
  lastName: string
  email: string
  password: string
  role?: 'ADMIN' | 'USER'
}
// export enum Roles {
//   ADMIN,
//   USER,
// }
export type LoginInput = {
  email: string
  password: string
}
export type LoginResponse = {
  token: string
  tokenType: string
}
