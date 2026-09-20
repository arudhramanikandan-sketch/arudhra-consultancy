import { Job } from '../types';
import { initialJobs } from '../../server/data';

/**
 * Default fallback job array populated with active Singapore vacancies.
 * Synchronized with server storage and updated whenever jobs are created/modified in Admin.
 */
export const defaultJobs: Job[] = [...initialJobs];

