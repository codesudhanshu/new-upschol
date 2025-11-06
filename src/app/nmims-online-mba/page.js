"use client"

import Head from 'next/head';
import styles from '../../../styles/nmims.module.css'
import Slider from "react-slick";
import { useState } from 'react';
import { useRouter } from "next/navigation"; // Import useRouter
import Link from 'next/link';

const Nmims = () =>{
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 5, // Adjust for responsiveness
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: { slidesToShow: 2 },
			},
			{
				breakpoint: 768,
				settings: { slidesToShow: 1 },
			},
		],
	};
const slides = [
		{
			title: "Live Interactive & Recorded Lectures",
			description: "24/7 access to all content, including recorded sessions of lectures",
			image: "/nmims/book.png",
			alt: "Live Interactive Lectures",
		},
		{
			title: "High Focus on Academic Excellence",
			description: "600+ faculty members, including academicians and industry experts. Globally curated curriculum.",
			image: "/nmims/presentation.png",
			alt: "Academic Excellence",
		},
		{
			title: "Dynamic, Application Oriented Assessment",
			description: "Computer-based exams at designated centres all over India.",
			image: "/nmims/student.png",
			alt: "Assessment",
		},
		{
			title: "Convenient Payment Option",
			description: "Flexible payment options with loan facility.",
			image: "/nmims/payement_method.png",
			alt: "Payment Option",
		},
		{
			title: "Latest Tech-Based Learning Systems",
			description: "Mobile application-based learning platform with recorded lectures & eBooks.",
			image: "/nmims/latest_tech.png",
			alt: "Tech Learning",
		},
		{
			title: "Best-in-class Student Services",
			description: "Multiple touchpoints: email, toll-free number, and live chat.",
			image: "/nmims/team.png",
			alt: "Student Services",
		},
		{
			title: "Career Services",
			description: "Career development & assistance with mentoring and guidance.",
			image: "/nmims/growth.png",
			alt: "Career Services",
		},
	];
	const [loading, setLoading] = useState(false);
			const router = useRouter(); 
			const [formData, setFormData] = useState({
					name: "",
					email: "",
					phoneNumber: "",
					location: ""
			});
	
			const [message, setMessage] = useState("");
	
			const handleChange = (e) => {
					setFormData({ ...formData, [e.target.name]: e.target.value });
			};
	
			const handleSubmit = async (e) => {
					e.preventDefault();
					setLoading(true); // Show loader
					const response = await fetch("/api/nmims", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(formData),
					});
	
					if (response.ok) {
							router.push("/thank-you"); // Redirect to Thank You Page
					} else {
							const data = await response.json();
							setMessage(data.error);
					}
			};
return(<><Head><meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no" />
		<title>NMIMS CDOE Programs - MBA (Online)</title>
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<link rel="icon" type="image/x-icon" href="/nmims/favicon.png" />
		<meta name="author" content='upschool'/>
		<meta name="keyword" content="" />
		<meta name="description" content=''/>
		<meta property="og:url" content="" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="" />
		<meta property="og:description" content="" />
		<meta property="og:image" content="" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta property="twitter:domain" content="" />
		<meta property="twitter:url" content="" />
		<meta name="twitter:title" content="" />
		<meta name="twitter:description" content="" />
		<meta name="twitter:image" content="" />
		<style>{`
					html, body {
						width: 100%;
						height: 100%;
						padding: 0;
						margin: 0;
					} 
					* {
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;
						margin: 0;
						padding: 0;
					}
				`}</style>
			</Head>
			<main style={{overflow:"hidden"}}>
	<header>
	<div className={`${styles.nmins_header} ${styles.color_red}`}>
			<div className={styles.Lnmimshead} >
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
  <a href="">
    <img src="/nmims/nmims_logo.png" alt="NMIMS Logo" className="h-12 w-auto" style={{objectFit:"contain"}} />
  </a>

  <a
    href="tel://+917678313034"
    className="inline-block bg-[#772879] text-white sm:px-5 sm:py-2 px-2 py-2 rounded-md font-bold font-sans transition duration-300 hover:bg-[#6a226c] text-center"
  >
    📞 Apply Now - +91 7678313034
  </a>
</div>


			</div>
			<i className={styles.clearB}/>
		</div>
	</header>
	<div id={styles.wrapper} >
	
		{/*-End Section01*/}
		{/*Section02*/}
		<section className={styles.banner_section}>
	<div className={styles.main_banner}>
		<img src="/nmims/banner4.jpg" className={`${styles.responsive_img} ${styles.img}`} />
		<div className={`${styles.L_banner_box} ${styles.mobile_banner_box}`}>
			<h2>MBA Online</h2>
			<h3>One Degree, Unlimited Opportunities</h3>
			<div className={styles.f_box}></div>
		</div>
		<div className={styles.container}>
			<div className={styles.banner_overlay}>
				<div className={styles.L_banner_box}>
					<h2>MBA Online</h2>
					<h3>One Degree, Unlimited Opportunities</h3>
					<div className={styles.f_box}></div>
				</div>
				<div className={styles.R_banner_box}>
					<div className={styles.free_sample_form}>
						<h3>Inquire Now</h3>
						<span>Admissions Open.</span>
						<form name="requestsamplefrm" id="requestsamplefrm" method="post" onSubmit={handleSubmit}>
							<input type="hidden" name="type" defaultValue="" />
							<div className={styles.name_box}>
								<ul>
									<li>
										<label>Name</label>
										<input name="name" id="name" placeholder="Type name" value={formData.name} onChange={handleChange} type="text" />
										<div id="requestsamplefrm_name_errorloc" className={styles.errormsg}>
											Please enter your Name
										</div>
									</li>
									<li>
										<label>Email ID</label>
										<input name="email" id="email" placeholder="Type email id" value={formData.email} onChange={handleChange} type="text" />
										<div id="requestsamplefrm_email_errorloc" className={styles.errormsg}>
											Please enter your valid email
										</div>
									</li>
									<li>
										<label>Mobile Number</label>
										<input name="phoneNumber" maxLength="10" placeholder="Enter Contact Number" value={formData.phoneNumber} onChange={handleChange} type="tel" />
										<div id="requestsamplefrm_contactno_errorloc" className={styles.errormsg}>
											Please enter your contact no.
										</div>
									</li>
									<li>
										<label>Location</label>
										<input name="location" id="name" placeholder="Type name" value={formData.location} onChange={handleChange} type="text" />
										<div id="requestsamplefrm_name_errorloc" className={styles.errormsg}>
											Please enter your Name
										</div>
									</li>
								</ul>
								<div className={styles.clearB}></div>
							</div>
							<div className={styles.send_box}>
								<ul>
									<li>
										<div className={styles.contact_send_sec}>
										<input 
											type="submit" 
											name="submit" 
											value={loading ? "Submitting..." : "SUBMIT"} 
											className={styles.submit_btn} 
											disabled={loading} 
										/>
										</div>
									</li>
									<i className={styles.clearB}></i>
								</ul>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>{/* Section 02 */}<section className={styles.section02}>
	<div className={styles.bfuture_ready_section}>
		<div className={styles.container}>
			<div className={styles.bfr_img}>
				<img className={styles.img} src="/nmims/bfr_img1.jpg" />
			</div>
			<div className={styles.bfr_content}>
				<h2 className={styles.heading01}>
					Elevate <span className={styles.r_color}>Your Career</span>
				</h2>
				<span>An MBA program to launch your career to the next level!</span>
				<p>
					Get ready to take your career to the next level with NMIMS CDOE&amp;s MBA program. Our five contemporary
					specialisations are designed for working professionals like you, offering flexible learning options
					from expert faculty. Gain the skills and knowledge needed to succeed in today&amp;s competitive business
					landscape. Enrol now to transform your future.
				</p>
				<div className={styles.bfr_gac}>
					<img className={styles.img} src="/nmims/bfr_gac_bg.png" />
				</div>
			</div>
			<i className={styles.clearB}></i>
		</div>
		<i className={styles.clearB}></i>
	</div>
</section>{/* Section 03 */}<section className={styles.section03}>
	<div className={styles.distance_learning_programme_section}>
		<div className={styles.container}>
			<div className={styles.DLP_block}>
				<h2 className={styles.heading01W}>MBA Online Specializations</h2>
				<div className={styles.display_desktop}>
					<div id="horizontalTab">
						<ul className={styles.resp_tabs_list}>
							<li className={styles.blue}>MBA Online Specializations</li>
						</ul>
						<div className={styles.resp_tabs_container}>
							<div>
								<div className={styles.pgdp_block}>
									<div className={styles.L_pgdp} style={{padding:"3em"}}>
										<ul>
											<li>Business Management</li>
											<li>Marketing Management</li>
											<li>Financial Management</li>
											<li>Human Resource Management</li>
											<li>Operation & Data Science Management</li>
										</ul>
									</div>
									<div className={styles.R_pgdp}>
										<ul>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
											<li></li>
										</ul>
									</div>
									<i className={styles.clearB}></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Mobile Version */}
				<div className={styles.distance_learning_programme_section}>
				<div className={`${styles.dlp_slider} ${styles.display_mobile}`}>
					<div className={`${styles.wow} ${styles.fadeInLeft}`}>
							<h4 className={`${styles.degree_head} ${styles.blue}`}>MBA Online Specializations</h4>
						<div className={styles.DLP_box}>
							<div className={styles.degree_block}>
								<ul>
									<li>Business Management</li>
									<li>Marketing Management</li>
									<li>Financial Management</li>
									<li>Human Resource Management</li>
									<li>Operation & Data Science Management</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</div>
				{/* End */}
			</div>
		</div>
	</div>
</section><section className={styles.section4}>
			<div className={styles.leadthefuture_section}>
				<h2 className={styles.heading01}>
					Lead the <span className={styles.r_color}>Future</span>
				</h2>
	<Slider {...settings} className={styles.lead_future_slider}>
					{slides.map((slide, index) => (
						<div key={index} className={styles.LFS_box}>
							<div className={styles.blue_data}>
									<h4>{slide.title}</h4>
									<img className={styles.adv_img} src={slide.image} alt={slide.alt} />
							</div>
							<div className={styles.musturd_data}>
								<p>{slide.description}</p>
							</div>
						</div>
					))}
				</Slider>
		<div className={styles.ltf02}>
					<img className={styles.img} src="/nmims/ltf_02.png" alt="NMIMS Future" />
				</div>
			</div>
		</section>

		{/* <section className={styles.container_specialize}>
			<div className={styles.conatiners}>
				<h2 className={styles.r_colors}>Specializations Wize Updated Fees 2025</h2>
				<button className={styles.structure} onClick={() => {
								const fnameInput = document.getElementById("name");
								
								if (fnameInput) {
									fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
									fnameInput.focus(); // Instant focus without delay
								}
							}}>View Fees Structure</button>
			</div>
			<table className={styles.tables}>
  			    <thead>
  			      <tr>
  			        <th className={styles.tables_th1}>Specializations</th>
  			        <th className={styles.tables_th2}>Fees</th>
  			        <th className={styles.tables_th3}>Duration</th>
  			      </tr>
  			    </thead>
  			    <tbody>
  			      <tr>
  			        <td className={styles.tables_td1}>Business Management</td>
  			        <td className={styles.tables_td2}>₹55,000 /Semester</td>
  			        <td className={styles.tables_td3}>2 Years</td>
  			      </tr>
  			      <tr>
  			        <td className={styles.tables_td1}>Operations Management</td>
  			        <td className={styles.tables_td2}>₹55,000 /Semester</td>
  			        <td className={styles.tables_td3}>2 Years</td>
  			      </tr>
  			      <tr>
  			        <td className={styles.tables_td1}>HR Management</td>
  			        <td className={styles.tables_td2}>₹55,000 /Semester</td>
  			        <td className={styles.tables_td3}>2 Years</td>
  			      </tr>
  			      <tr>
  			        <td className={styles.tables_td1}>Finance Management</td>
  			        <td className={styles.tables_td2}>₹55,000 /Semester</td>
  			        <td className={styles.tables_td3}>2 Years</td>
  			      </tr>
  			      <tr>
  			        <td className={styles.tables_td1}>Marketing Management</td>
  			        <td className={styles.tables_td2}>₹55,000 /Semester</td>
  			        <td className={styles.tables_td3}>2 Years</td>
  			      </tr>
  			      <tr>
  			        <td className={styles.tables_td1}>Data Science</td>
  			        <td className={styles.tables_td2}>₹55,000 /Semester</td>
  			        <td className={styles.tables_td3}>2 Years</td>
  			      </tr>
  			    </tbody>
  			  </table>
		</section> */}

		<section className={styles.prices_section}>
			<div className={styles.datastructure}>
				<h2 className={styles.courses}><b>Fees Structure </b></h2>
				<h4 className={styles.hadd}><b>Convenient Fee Payment Option:</b></h4>
				<p className={styles.para_cont}>Choose your preferred fee payment option: semester-wise (4 semesters) or annually (2 years).</p>
			</div>	
			<div className={styles.options_container}>
				<div className={styles.options_con}>
					<div className={styles.options}>
						<h2 className={styles.datas}>Option 1</h2>
						<h2 className={styles.datas}><b>Annual payment</b></h2>
						<h2 className={styles.datas}>(in INR)</h2>
					</div>
					<div className={styles.numbers}>
						<div>
							<h2 className={styles.courses}>MBA</h2>
						</div>
						<div>
							<h2 className={styles.prices}>1,05,000/-</h2>
						</div>
					</div>
				</div>
				<div className={styles.options_con}>
					<div className={styles.options}>
						<h2 className={styles.datas}>Option 2</h2>
						<h2 className={styles.datas}><b>Semester-wise fee payment</b></h2>
						<h2 className={styles.datas}>(in INR)</h2>
					</div>
					<div className={styles.numbers}>
						<div>
							<h2 className={styles.courses}>MBA</h2>
						</div>
						<div>
							<h2 className={styles.prices}>55,000/-</h2>
						</div>
					</div>
				</div>
			</div>	
		</section>

{/* Start Section 05 */}<section className={styles.section05}>
	<div className={styles.aboutnmims_section}>
		<div className={styles.container}>
			<div className={`${styles.a_center} ${styles.abt_block}`}>
				<h2 className={styles.heading03}>About</h2>
				<p>
					NMIMS CDOE is the distance and online education centre of NMIMS University. NMIMS CDOE began its ODL & OL journey in 2013 with a 
					state-of-the-art learning management system to provide interactive learning on connected platforms 24/7.
					<br /><br />
					NMIMS CDOE is changing the dynamics of higher education delivery in India while empowering students across India and enabling them 
					to fulfill their dreams and aspirations.
				</p>
			</div>
			<div className={`${styles.a_center} ${styles.ngaf_block}`}>
				<h2 className={styles.heading03}>NMIMS CDOE Forte</h2>
				<ul>
					<li>
						<div className={`${styles.ngaf_box} ${styles.blue}`}>
							<div className={styles.L_ngaf}>
								<h3>1,56,000+</h3>
								<p>Active Students</p>
							</div>
							<div className={styles.R_ngaf}>
								<img className={styles.img} src="/nmims/active_students.png" alt="Active Students" />
							</div>
						</div>
					</li>
					<li>
						<div className={`${styles.ngaf_box} ${styles.musturd}`}>
							<div className={styles.L_ngaf}>
								<h3>27,000+</h3>
								<p>Alumni</p>
							</div>
							<div className={styles.R_ngaf}>
								<img className={styles.img} src="/nmims/alumni.png" alt="Alumni" />
							</div>
						</div>
					</li>
					<li>
						<div className={`${styles.ngaf_box} ${styles.blue}`}>
							<div className={styles.L_ngaf}>
								<p>Students from</p>
								<h3>600+</h3>
								<p>Locations across India</p>
							</div>
							<div className={styles.R_ngaf}>
								<img className={styles.img} src="/nmims/location.png" alt="Locations" />
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>{/*End Section 06*/}
		{/*Start Section07*/}
		<section className={styles.section7}>
	<div className={styles.regional_office_section}>
		<div className={styles.container}>
			<div className={styles.L_regional_ofc}>
				<h2 className={styles.heading01}>
					NMIMS Mumbai Campus Address:
				</h2>
				<p>
					NMIMS CDOE, 2nd Floor, NMIMS Building, V. L., Pherozeshah Mehta Rd, 
					Vile Parle West, Mumbai, Maharashtra 400056
				</p>
			</div>
			<div className={styles.R_regional_ofc}>
				<img className={styles.img} src="/nmims/nmims_ofc.png" alt="NMIMS Office" />
			</div>
		</div>
		<i className={styles.clearB} />
	</div>
	<div className="fixed bottom-6 right-6 z-50">
      <Link href="https://wa.me/+917678313034" target="_blank" >
        <div className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </div>
      </Link>
    </div>
</section>{/* End Section07 */}<div className={styles.disclamer}>
	<div className={styles.container}>
		<p className={styles.disclam}>
			Disclaimer: As an Affiliate Enquiry Partner (AEP) of NMIMS CDOE, we
			display and showcase program information of NMIMS CDOE. Counselling,
			Admission, Program delivery, and examination are solely managed by NMIMS
			CDOE, and as an AEP, we have no role to play in it.
		</p>
	</div></div>
		<footer>
			<div className={styles.footersection}>
				<div className={`block sm:flex items-center ${styles.container}`}>
  <p>
    © 2025 All Rights Reserved. | <a href="">Privacy Policy</a>
  </p>
  <p className="mt-2 sm:mt-0 sm:ml-16">
    Contact us Now - <a href="tel://+917678313034">+91 7678313034</a>
  </p>
</div>


			</div>
		</footer>
	</div>
	</main></>
		)
}

export default Nmims
