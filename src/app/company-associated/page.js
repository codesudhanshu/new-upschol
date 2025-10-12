import Layout from "@/components/Candidatepagelayout";
import CompanyAssociatedPage from "@/components/CompanyAssociated/CompanyAssociatedPage";
import Image from "next/image";

export default function CompanyAssociated() {
  return (
   <div>
     <Layout>
      <div className="min-h-0 bg-white">
            <div className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-[#14081E] mb-4">
                  Company Associated
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Discover our officially recognized Company Association
                </p>
                 <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mt-6"></div>
              </div>
                  <div className="mx-4 my-12 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
            <CompanyAssociatedPage />
            </div>
            </div>
            </div>
    </Layout>
   </div>
  );
}
