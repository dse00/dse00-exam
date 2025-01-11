import { getPagination } from '../getPagination';

describe('getPagination', () => {
  it('should return correct pagination when in the middle of pages', () => {
    const result = getPagination(5, 18);
    expect(result).toEqual([2, 3, 4, 5, 6, 7, 8]);
  });

  it('should return correct pagination when at the first page', () => {
    const result = getPagination(1, 18);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should return correct pagination when at the last page', () => {
    const result = getPagination(18, 18);
    expect(result).toEqual([12, 13, 14, 15, 16, 17, 18]);
  });

  it('should handle cases where totalPages is less than maxVisiblePages', () => {
    const result = getPagination(3, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle cases where currentPage is less than maxVisiblePages / 2', () => {
    const result = getPagination(2, 18);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should handle cases where currentPage is close to totalPages', () => {
    const result = getPagination(17, 18);
    expect(result).toEqual([12, 13, 14, 15, 16, 17, 18]);
  });
});
