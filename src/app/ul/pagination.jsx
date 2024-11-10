// 'use client';

// // import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// import { usePathname, useSearchParams } from 'next/navigation';

// export default function Pagination({ totalPages }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get('page')) || 1;

//   const createPageURL = (pageNumber) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', pageNumber.toString());
//     return `${pathname}?${params.toString()}`;
//   };

//   // Additional logic for the pagination component here...
// }
