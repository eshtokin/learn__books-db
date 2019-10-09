export default interface AuthorizationRequest {
  body: {
    password: string,
    email: string,
    name: string,
    role: number,
  }
}