export const ERRORS_CONSTANTS = {
  DB: {
    23505: (entityName: string): string => `${entityName} already exists.`,
  },
  CODES: {
    INVALID_CREDENTIALS: 'Invalid Credentials',
    INVALID_CODE_ACTIVATION: 'Invalid Code Activation',
    USER_NOT_FOUND: 'User Not Found',
    USER_NOT_ACTIVATED: 'User Not Activated. Please check your email.',
    USER_LOCKED: 'User Locked, Contact support!',
  },
};
