"use client"
import { getAllpartnersdata } from '@/app/api/admin/courseapi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AllPartner() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllpartnersdata();
        if (response.status && response.result.data) {
          setPartners(response.result.data);
        }
      } catch (error) {
        console.error('Error fetching partners data:', error);
      }
    };
    fetchData();
  }, []);

  // Duplicate partners array to create seamless infinite scroll
  const duplicatedPartners = partners.length > 0 ? [...partners, ...partners] : [];

  if (partners.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading Partners...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="uni-logos">
      <div className="logos-list">
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner._id}-${index}`}
            className="logo-items border d-flex align-items-center mx-1 rounded px-3 py-2"
          >
            <Link href={`/university/${partner.collegeUrl}`} target="_blank">
              <Image
                src={partner.logo}
                alt="uni-logo"
                width={145}
                height={56}
                decoding="async"
                className="uni-logo-img"
              />
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .uni-logos {
          width: 100%;
          overflow: hidden;
          padding: 27px 0;
          position: relative;
        }

        .logos-list {
          display: flex;
          justify-content: flex-start;
          animation: scroll 150s linear infinite;
          width: max-content;
          will-change: transform;
        }

        .logo-items {
          justify-content: center;
          height: 56px;
          width: 180px;
          flex: 0 0 auto;
          padding: 10px;
          margin: -21px 0;
        }

        .d-flex {
          display: flex;
        }

        .align-items-center {
          align-items: center;
        }

        .border {
          border: 1px solid #dee2e6;
        }

        .rounded {
          border-radius: 0.25rem;
        }

        .mx-1 {
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }

        .px-3 {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }

        .py-2 {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .uni-logo-img {
          max-width: 100%;
          height: auto;
        }

        @keyframes scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 768px) {
          .logos-list {
            animation-duration: 180s;
          }

          .uni-logo-img {
            max-width: 120px;
          }
        }

        @media (max-width: 480px) {
          .logos-list {
            animation-duration: 180s;
          }

          .uni-logo-img {
            max-width: 145px;
          }
        }
      `}</style>
    </section>
  );
}