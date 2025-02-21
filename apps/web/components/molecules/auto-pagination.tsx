"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@repo/ui/components/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  page: number;
  pageSize: number;
  pathname?: string;
  isLink?: boolean;
  onClick?: (pageNumber: number) => void;
};

const RANGE = 2;

const AutoPagination = ({
  page,
  pageSize,
  pathname = "/",
  isLink = true,
  onClick = (pageNumber) => {},
}: Props) => {
  const tAll = useTranslations("All");

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <PaginationItem>
            <PaginationEllipsis title={tAll("more_pages")} />
          </PaginationItem>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <PaginationItem>
            <PaginationEllipsis title={tAll("more_pages")} />
          </PaginationItem>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <PaginationItem key={index}>
            {isLink && (
              <PaginationLink
                href={{
                  pathname,
                  query: {
                    page: pageNumber,
                  },
                }}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            )}
            {!isLink && (
              <Button
                onClick={() => {
                  onClick(pageNumber);
                }}
                variant={pageNumber === page ? "outline" : "ghost"}
                className="w-9 h-9 p-0"
              >
                {pageNumber}
              </Button>
            )}
          </PaginationItem>
        );
      });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {isLink && (
            <PaginationPrevious
              href={{
                pathname,
                query: {
                  page: page - 1,
                },
              }}
              className={cn({
                "cursor-not-allowed": page === 1,
              })}
              onClick={(e) => {
                if (page === 1) {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                }
              }}
              title={tAll("previous")}
            />
          )}
          {!isLink && (
            <Button
              disabled={page === 1}
              className="h-9 p-0 px-2"
              variant={"ghost"}
              onClick={() => {
                onClick(page - 1);
              }}
            >
              <ChevronLeft className="w-5 h-5" /> {tAll("previous")}
            </Button>
          )}
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          {isLink && (
            <PaginationNext
              href={{
                pathname,
                query: {
                  page: page + 1,
                },
              }}
              className={cn({
                "cursor-not-allowed": page === pageSize,
              })}
              onClick={(e) => {
                if (page === pageSize) {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                }
              }}
              scroll={false}
              title={tAll("next")}
            />
          )}
          {!isLink && (
            <Button
              disabled={page === pageSize}
              className="h-9 p-0 px-2"
              variant={"ghost"}
              onClick={() => {
                onClick(page + 1);
              }}
            >
              {tAll("next")} <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AutoPagination;
