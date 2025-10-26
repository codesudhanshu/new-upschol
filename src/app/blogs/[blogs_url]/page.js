"use client"
import GetBlogDataByURL from "@/components/Blog/GetBlogDataByURL";
import Layout from "@/components/Candidatepagelayout";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogsUrl() { // Capital 'B' se start karo
  const params = useParams();
  const url = params.blogs_url; 
  
  return (
    <div>
      <Layout>
        <GetBlogDataByURL blogUrl={url}/> {/* yahan prop name check karo */}
      </Layout>
    </div>
  );
}