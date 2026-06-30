import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../../../../shared/components";

type Props = {
  page: number;
  pages: (number | "...")[];
  totalPages: number;
  setPage: (page: number) => void;
};

export const ProductsPagination = ({
  page,
  pages,
  setPage,
  totalPages,
}: Props) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {pages.map((item, i) => (
          <PaginationItem key={i}>
            {item === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === item}
                onClick={() => setPage(item)}
                className="cursor-pointer"
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};
