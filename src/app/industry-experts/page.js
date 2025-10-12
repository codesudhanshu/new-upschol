"use client"
import Layout from "@/components/Candidatepagelayout";
import IndustryExpertAll from "@/components/IndustyExpert/IndustryExpertAll";

export default function IndustryExpert() {
 

  return (
    <Layout>
       <div className="min-h-0 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
         <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Our Industry Experts
          </h1>
          <p className="text-lg text-gray-600">
           Connect with our experienced professionals who are ready to guide you through your career journey
          </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mt-6"></div>
          </div>
              <div className="mx-4 my-12 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
        <IndustryExpertAll />
        </div>
        </div>
      </div>
    </Layout>
  );
}