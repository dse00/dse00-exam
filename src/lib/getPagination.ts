export const getPagination = (currentPage: number, totalPages: number) => {
  const maxVisiblePages = 7; // Number of pages to display in the pagination
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust startPage if endPage is less than maxVisiblePages
  startPage = Math.max(1, endPage - maxVisiblePages + 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};
