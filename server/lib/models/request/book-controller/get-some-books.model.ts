export default interface GetSomeBooksRequest {
  query: {
    data: BookFilter
  }
} 

export interface BookFilter {
  title?: string;
  categories?: string[];
  authors?: string[];
}