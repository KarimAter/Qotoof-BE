import AppError from './AppError';

class JwtError extends AppError {
  constructor(public message: string) {
    super('JWT Error::', message, 401);
    Object.setPrototypeOf(this, JwtError.prototype);
  }
}

export default JwtError;
