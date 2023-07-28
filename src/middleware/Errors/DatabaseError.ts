import AppError from './AppError';

class DatabaseError extends AppError {
  extraMessage: string | undefined;

  constructor(public code?: string, extraMessage?: string) {
    let message = '';
    switch (code) {
      case 'P2002':
        message = 'Unique constraint failed';
        break;
      case 'P2025':
        message = 'Record to update not found';
        break;
      default:
        message = 'database error';
        break;
    }
    super('Database Error::', `${message}`, 400);
    this.extraMessage = extraMessage || '';
    delete this.code;
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export default DatabaseError;
