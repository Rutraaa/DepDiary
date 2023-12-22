export class ResponsePayload<T> {
  status!: string;
  payload!: T | undefined;
}
