
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DoctorsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DoctorsPagination = ({ currentPage, totalPages, onPageChange }: DoctorsPaginationProps) => {
  if (totalPages <= 1) return null;
  
  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.max(1, currentPage - 1));
              }} 
            />
          </PaginationItem>
        )}
        
        {[...Array(totalPages)].map((_, i) => {
          // Show first page, current page, last page, and one page before and after current
          if (
            i === 0 || // First page
            i === totalPages - 1 || // Last page
            (i + 1) === currentPage || // Current page
            (i + 1) === currentPage - 1 || // One before current
            (i + 1) === currentPage + 1 // One after current
          ) {
            return (
              <PaginationItem key={i}>
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
          
          // Add ellipsis after first page if there's a gap
          if (i === 1 && currentPage > 3) {
            return <PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>;
          }
          
          // Add ellipsis before last page if there's a gap
          if (i === totalPages - 2 && currentPage < totalPages - 2) {
            return <PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>;
          }
          
          return null;
        })}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.min(totalPages, currentPage + 1));
              }} 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default DoctorsPagination;
