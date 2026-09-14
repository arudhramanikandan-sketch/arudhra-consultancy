import { Job } from '../types';

/**
 * Default fallback job array is kept empty so that deleted jobs never resurrect.
 * Active jobs are dynamically loaded and persisted via the Admin Dashboard and database.
 */
export const defaultJobs: Job[] = [];

