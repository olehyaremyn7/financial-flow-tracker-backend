export interface IErrorService {
  handleUnauthenticated(): never;
  handleBadRequest(message: string, id: string | unknown): never;
  handleServerError(error: unknown): never;
}
