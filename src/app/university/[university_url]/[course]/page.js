import Layout from "@/components/Candidatepagelayout";
import CourseClient from "@/components/Courseclient";
import UniversityClient from "@/components/UniversityClient";


export default function CoursePage({ params }) {
  // ✅ params.collegeUrl will come directly from URL (server side)
  const { course } = params;

  return (
    <>
    <Layout>
      <div className="min-h-screen ">
        <CourseClient collegeUrl={course} />
      </div>
    </Layout>
    </>
  );
}
