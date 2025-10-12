import Layout from "@/components/Candidatepagelayout";
import CollegeListingPage from "@/components/University/TopUniversity";
import Image from "next/image";

export default function University() {
  return (
   <div>
     <Layout>
      <CollegeListingPage />
    </Layout>
   </div>
  );
}
