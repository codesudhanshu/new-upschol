import Layout from "@/components/Candidatepagelayout";
import UniversityClient from "@/components/UniversityClient";


export default function UniversityPage({ params }) {
  // ✅ params.collegeUrl will come directly from URL (server side)
  const { university_url } = params;

  return (
    <>
    <Layout>
      <div className="min-h-screen py-8 px-4">
        <UniversityClient collegeUrl={university_url} />
      </div>
    </Layout>
    </>
  );
}
