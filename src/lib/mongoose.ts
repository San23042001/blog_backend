//Node modules

import mongoose from 'mongoose';

//Custom modules
import config from '@/config';
import { logger } from './winston';

//Types
import type { ConnectOptions } from 'mongoose';

//Client option
const clientOptions: ConnectOptions = {
  dbName: 'blog-db',
  appName: 'Blog API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

/*
 *Establishes a connection tp the MongoDB database using Mongoose.
 * If an error occurs during the connection process,it throws an error with a descriptive message.
 *
 * - Use 'MONGO_URL' as the connection string.
 * - 'clientOptions contains additional configuration for Mongoose'.
 * - Errors are properly handled and rethrown for better debugging.
 */
export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URL) {
    throw new Error('MongoDB URL is not defined in the configuration.');
  }
  try {
    await mongoose.connect(config.MONGO_URL, clientOptions);
    logger.info('Connected to the database successfully.', {
      uri: config.MONGO_URL,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    logger.error('Error connecting to the database', err);
  }
};

/*
 *Disconnects from the MongoDB database using Mongoose.
 *
 * This function attempts to disconnect from the database asynchronously.
 * If the disconnection is successful, a success message is logged.
 * If an error occurs,it is either re-thrown as a new Error (if it's an instance of Error)
 * or logged to the console.
 */

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from the database successfully', {
      uri: config.MONGO_URL,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    logger.error('Error disconnecting from the database',err);
  }
};
