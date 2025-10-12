import Layout from "@/components/Candidatepagelayout";
import JobListings from "@/components/Careers/CareersPage";
import AllFaqdata from "@/components/FAQ/AllFaqData";
import Image from "next/image";

export default function Careers() {
  return (
   <div>
     <Layout>
      <JobListings />
    </Layout>
   </div>
  );
}
