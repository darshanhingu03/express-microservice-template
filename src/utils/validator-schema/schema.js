import { body, param, query } from 'express-validator';
import db from '../../../models/index.js';

export const testSchema = [
  query('search').optional().isString(),
  body('name').optional().isString(),
  param('id').optional().isNumeric(),
];
