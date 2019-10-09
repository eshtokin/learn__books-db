export default interface GetBooksByFitlerRequest {
  query: {
    data: BookFilter
  }
} 

export interface BookFilter {
  title?: string;
  categories?: string[];
  authors?: string[];
}