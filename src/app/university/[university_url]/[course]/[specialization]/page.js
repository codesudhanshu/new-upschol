import Layout from "@/components/Candidatepagelayout";
import SpecializationClient from "@/components/SpecializationClient";
import UniversityClient from "@/components/UniversityClient";


export default function specializationPage({ params }) {
  const { specialization } = params;

  return (
    <>
    <Layout>
      <div className="min-h-screen ">
        <SpecializationClient collegeUrl={specialization} />
      </div>
    </Layout>
    </>
  );
}
