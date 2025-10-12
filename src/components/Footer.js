'use client';

import { getAllfooterdata } from '@/app/api/admin/apiService';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import '../../public/css/responsive.css';

const UpScholFooter = () => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    getAllfooter();
  }, []);

  const getAllfooter = async () => {
    try {
      const data = await getAllfooterdata()
      if (data.status && data.result.data) {
        setFooterData(data.result.data);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  return (
    <footer className="footer pt-5 pb-4">
      <div className="container">
        <div className="top-stuff">
          <div className="row">
            <div className="col-md-6">
              <div className="w-50">
                <img src="/images/logo.jpeg" alt="logo" />
                <p className="mt-3">Connect with Upschol and start your journey</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="socials d-flex align-items-center justify-content-end">
                <a href="https://www.instagram.com/upschol/" className="social-btn mx-2">
                  <img src="/images/Instagram.svg" alt="" />
                </a>
                <a href="https://www.facebook.com/people/UpSchol/61552821882181/" className="social-btn mx-2">
                  <img src="/images/fb.svg" alt="" />
                </a>
                <a href="https://www.youtube.com/@upskillwithus" className="social-btn mx-2">
                  <img src="/images/utube.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="center-stuff">
          <div className="row">
            <div className="col-xl-4">
              <div className="ratings d-flex align-items-center justify-content-between px-4">
                <p className="text-muted mb-0">4.2 Rating</p>
                <img src="/images/greenstr.svg" alt="icon" />
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="heading">
                        <h6 className="mb-3">Home</h6>
                      </div>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <Link href="/careers" className="nav-link ps-0 pt-0">Careers</Link>
                        </li>
                        <li className="nav-item">
                          <Link href="/contact-us" className="nav-link ps-0 pt-0">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <div className="heading">
                        <h6 className="mb-3">Upschol</h6>
                      </div>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <Link href="/scholarship" className="nav-link ps-0 pt-0">Scholarships</Link>
                        </li>
                        {/* <li className="nav-item">
                          <Link href="/referrals" className="nav-link ps-0 pt-0">Referral</Link>
                        </li> */}
                        <li className="nav-item">
                          <Link href="/blogs" className="nav-link ps-0 pt-0">Blogs</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="heading">
                        <h6 className="mb-3">Universities</h6>
                      </div>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <Link href="/university" className="nav-link ps-0 pt-0">Top Universities</Link>
                        </li>
                        <li className="nav-item">
                          <Link href="/expert-advice" className="nav-link ps-0 pt-0">Experts</Link>
                        </li>
                        <li className="nav-item">
                          <Link href="/faqs" className="nav-link ps-0 pt-0">FAQ</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <div className="heading">
                        <h6 className="mb-3">Other Links</h6>
                      </div>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <Link href="/about-us" className="nav-link ps-0 pt-0">About Us</Link>
                        </li>
                        <li className="nav-item">
                          <Link href="/terms-conditions" className="nav-link ps-0 pt-0">Terms & Conditions</Link>
                        </li>
                        <li className="nav-item">
                          <Link href="/privacy-policy" className="nav-link ps-0 pt-0">Privacy Policy</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

              <div className="bottom-stuff mt-3">
          <ul className="nav flex-row justify-content-between">
            <li className="nav-item">
              <Link href="/about-us" className="nav-link ps-0 py-0 pe-0">About us</Link>
            </li>
            <li className="nav-item">
              <Link href="/blogs" className="nav-link ps-0 py-0 pe-0">Blog</Link>
            </li>
            <li className="nav-item">
              <Link href="/map-page" className="nav-link ps-0 py-0 pe-0">Sitemap</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact-us" className="nav-link ps-0 py-0 pe-0">Contact us</Link>
            </li>
            <li className="nav-item">
              <Link href="/careers" className="nav-link d-flex align-items-center ps-0 py-0 pe-0">
                <span>CS Careers </span>
                <span className="ms-2 badge badge-success">We are Hiring</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Dynamic Footer Navigation */}
        <div className="footer_navigation_main footer_mega_menu accordion" id="accordionExample">
          {footerData.map((item, index) => (
            <div className="footer-navigation_listing" key={index}>
              <div className="footer_navigation">
                <h4>{item.courseName}</h4>
                <Link className="btn collapsed accordion_filter" data-bs-toggle="collapse" href={`#collapse${item.courseName.replace(/\s+/g, '-')}`} aria-expanded="false">
                  {item.courseName}
                </Link>
                <div className="collapse accordion-collapse" id={`collapse${item.courseName.replace(/\s+/g, '-')}`} data-bs-parent="#accordionExample">
                  <ul className="university-list">
                    {item.universities.map((uni, uniIndex) => (
                      <li key={uniIndex}>
                        <Link href={`/university/${uni.url}`} className="submit-global">
                          {uni.universityName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        

  <div className="menubar-strip">
    <div className="container">
      <ul className="d-flex flex-wrap align-items-center justify-content-between p-0 m-0">
        <li className="active">
          <Link href="/">
            <figure>
              <img src="/images/home-icon.svg" alt="Home" />
            </figure>
            Home
          </Link>
        </li>
        <li>
          <Link href="tel:+919810102541" className="phone-number">
            <figure>
              <img src="/images/call-us.svg" alt="survay" />
            </figure>
            Call
          </Link>
        </li>
        <li>
          <Link 
            href="https://wa.me/+919810102541?text=Hello%20there!" 
            className="whatsapp-button" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure>
              <img src="/images/whatsapp-svg.svg" alt="survay" />
            </figure>
            Chat
          </Link>
        </li>
        <li>
          <Link href="/expert-advice">
            <figure>
              <img src="/images/survey_icon-01.svg" alt="survay" />
            </figure>
            Expert Advice
          </Link>
        </li>
      </ul>
    </div>
  </div>


        <div className="v-bottom my-4">
          <ul className="nav flex-row text-center justify-content-center">
            <li className="nav-item">
              <Link href="#" className="nav-link px-0 me-2">Disclaimer</Link>
            </li>
            <li className="nav-item">
              <Link href="/terms-conditions" className="nav-link px-0 me-2">/ Terms & Conditions</Link>
            </li>
            <li className="nav-item">
              <Link href="/privacy-policy" className="nav-link px-0 me-2">/ Our Policy</Link>
            </li>
          </ul>
          <div className="long-txt text-center">
            <small>Upschol aims to provide unbiased and precise information, along with comparative guidance on universities and their programs, to admission aspirants. The content on the College Sathi website—encompassing texts, graphics, images, blogs, videos, and university logos—is intended solely for informational purposes and should not be viewed as a substitute for offerings from academic partners. While we strive for accuracy and present information in good faith, College Sathi makes no warranties regarding the completeness or reliability of the content and will not be liable for any errors, omissions, or resulting damages from its use.</small>
          </div>
          <p className="text-center copyright mt-3 mb-0">© Upschol 2025. All Right Reserved.</p>
        </div>
      </div>
      <style jsx>{`  footer.footer {
            min-height: 781px
        }

        .top-stuff .w-50 {
            width: 40% !important;
        }

        footer .social-btn {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 40px
        }

        footer .ratings {
            width: 362px;
            min-height: 60px;
            border-radius: 6px;
            background: #FFF
        }

        footer .ratings p {
            font-weight: 600 !important;
            font-size: 22px !important
        }

        footer .follows {
            width: 227px;
            min-height: 70px;
            border-radius: 6px;
            background: #FFF
        }

        footer .bottom-stuff .nav-link {
            color: #B5B7BC !important
        }

        footer .badge-success {
            font-weight: 200 !important;
            font-size: 12px;
            background: #16B1A2
        }

        footer .bottom-stuff {
            padding-bottom: 12px;
            border-bottom: 1px solid #B5B7BC
        }

        .v-bottom ul .nav-link {
            font-size: 12px !important;
            color: #B5B7BC !important
        }

        footer .long-txt small {
            color: #B5B7BC !important
        }

        footer p.copyright {
            font-size: 14px !important;
            color: #B5B7BC !important
        }
        }`}</style>
    </footer>
  );
};

export default UpScholFooter;