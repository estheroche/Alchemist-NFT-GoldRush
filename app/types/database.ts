import { Generated } from 'kysely';

export interface PageViews {
  id: number,
  views: number,
  updated_at: Generated<Date>
}

export interface Database {
  page_views: PageViews
}

export interface Views {
  id: number
  views: number
}