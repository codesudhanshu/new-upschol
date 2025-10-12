"use client"
import Layout from "@/components/Candidatepagelayout";
import UniversityComparison from "@/components/University/UniversityCompare";
import { useParams } from 'next/navigation';

const UniversityCompare = () =>{
    const params = useParams();
      const collegeUrl = params.universitycomparedata;
    return (
        <Layout>
            <UniversityComparison collegeUrl={collegeUrl}/>
        </Layout>
    )
}

export default UniversityCompare