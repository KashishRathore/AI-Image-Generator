export const createError = (status, message) => {
    const err = new Error(); // Initialize with message
    err.status = status;
    err.message = message;           // Set the custom status
    return err;
};

/* 
import createError from 'http-errors'; // Use ES6 module syntax or the appropriate import method for CommonJS

// Example usage:
export const createError = (status, message) => {
    const err = new Error(message);
    err.status = status;
    return err;
};
*/