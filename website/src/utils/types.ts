export interface QouteAbleResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export type getQouteData = {
  author: string;
  content: string;
};
