import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  /**
   * Return all items.
   */
  findAll(key: string, data: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `All ${key} are returned successfully.`,
      data,
    };
  }

  /**
   * Retrieve a single item.
   */
  findOne(key: string, data: any) {
    return {
      statusCode: HttpStatus.OK,
      message: `The ${key} with ID ${data.id} was found successfully.`,
      data,
    };
  }

  /**
   * Create a new item.
   */
  createOne(key: string, id: number) {
    return {
      statusCode: HttpStatus.CREATED,
      message: `The ${key} was created successfully with ID ${id}.`,
    };
  }

  /**
   * Update an existing item.
   */
  updateOne(key: string, id: number) {
    return {
      statusCode: HttpStatus.OK,
      message: `The ${key} with ID ${id} was updated successfully.`,
    };
  }

  /**
   * Delete an item.
   */
  remove(key: string, id: number) {
    return {
      statusCode: HttpStatus.OK,
      message: `The ${key} with ID ${id} was removed successfully.`,
    };
  }
  notFound(key: string, id: number) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: `The ${key} with ID ${id} was not found.`,
    };
  }

  error(error: any) {
    console.log('🚀 ~ ResponseService ~ error ~ error:');
    console.log(error);
    console.log('🚀 ~ ResponseService ~ error ~ error:');
    switch (error.code) {
      // PostgreSQL Error Codes
      case '23505': // Unique violation
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'The requested resource has duplicate value.',
        };

      case '23503': // Foreign key violation
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'The request involves invalid references to other resources.',
        };

      case '22P02': // Invalid text representation (e.g., invalid UUID)
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid input format provided.',
        };

      case '22001': // String data right truncation
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Input value exceeds the allowed length.',
        };

      case '23502': // Not null violation
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'A required field is missing in the request.',
        };

      case '42601': // Syntax error
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is a syntax error in the database query.',
        };

      case '40001': // Serialization failure
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'A conflict occurred. Please retry the operation.',
        };

      // Generic application errors
      case 'AUTH001': // Authentication error
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Authentication failed. Please check your credentials.',
        };

      case 'PERM001': // Permission denied
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message:
            'You do not have the necessary permissions to perform this action.',
        };

      case 'VALID001': // Validation error
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Input validation failed. Please check your data.',
        };

      // Default fallback
      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'An unexpected error occurred.',
        };
    }
  }
}
