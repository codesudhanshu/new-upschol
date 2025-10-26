import BlogListing from "@/components/Blog/BlogListing";
import Layout from "@/components/Candidatepagelayout";
import Image from "next/image";

export default function blogs() {
  return (
   <div>
     <Layout>
      <BlogListing />
    </Layout>
   </div>
  );
}
