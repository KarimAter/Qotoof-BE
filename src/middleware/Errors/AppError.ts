class AppError extends Error {
  timeStamp: string;

  constructor(
    public name: string,
    public message: string,
    public statusCode: number,
  ) {
    super();
    this.timeStamp = new Date().toISOString();
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export default AppError;
