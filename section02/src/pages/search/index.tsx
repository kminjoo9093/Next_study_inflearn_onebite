import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";

// SSR
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {

//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return { props: {books} };
// };

// SSG
// export const getStaticProps = async (
//   context: GetStaticPropsContext,
// ) => {

//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return { props: {books} };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async() => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  }

  useEffect(()=>{
    if(q){
      //검색 결과 불러오는 로직. 백엔드에 직접 요청
      fetchSearchResult();
    }
  }, [q])

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
