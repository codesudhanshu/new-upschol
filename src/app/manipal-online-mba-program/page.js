"use client"

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from '../../../styles/manipal.module.css';
import Head from 'next/head';
import { useRouter } from "next/navigation"; // Import useRouter 
import Script from "next/script";

const Manipal = () => {
	const [activeTab, setActiveTab] = useState("#home");
	const rankings = [
		{
			src: '/manipal/Group-48.png',
			title: 'International Credential Assessment Service of Canada',
		},
		{
			src: '/manipal/Group-46.png',
			title: 'International Qualifications Assessment Service (IQAS)',
		},
		{
			src: '/manipal/Group-47.png',
			title: 'International Credential Evaluation Service (ICES)',
		},
		{
			src: '/manipal/download.png',
			title: 'Ranked India’s #1 online MBA institution by Careers360',
		},
		{
			src: '/manipal/Group-42.png',
			title: 'All India Council for Technical Education (AICTE)',
		},
		{
			src: '/manipal/Group-43.png',
			title: 'University Grants Commission (UGC)',
		},
		{
			src: '/manipal/Group-44.png',
			title: 'World Education Services (WES)',
		},
		{
			src: '/manipal/Group-62.png',
			title: 'The Association of Commonwealth Universities (ACU)',
		},
		{
			src: '/manipal/Group-41.png',
			title: 'National Assessment and Accreditation Council (NAAC) A+',
		},
	];
		useEffect(() => {
						// Dynamically add Bootstrap CSS after Tailwind
						const link = document.createElement("link");
						link.rel = "stylesheet";
						link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
						document.head.appendChild(link);
				
						return () => {
							// Remove Bootstrap CSS when leaving the page
							document.head.removeChild(link);
						};
					}, []);

					const settings = {
						dots: false,
						infinite: true,
						speed: 500,
						autoplay: true,
						autoplaySpeed: 2000,
						arrows: true,
						slidesToShow: 4, // Default (Desktop)
						slidesToScroll: 1,
						responsive: [
							{
								breakpoint: 768, // Mobile (less than 768px)
								settings: {
									slidesToShow: 1, // Show 1 image at a time
									slidesToScroll: 1,
								},
							},
						],
					};

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
										const response = await fetch("/api/manipal", {
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
					
		return (
				<>
				<Head>
				<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
				<meta charset="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />	
				<title>Online Manipal </title>
				<link rel="shortcut icon" type="image/x-icon" href="/manipal/favicon.png" />
				<meta name="author" content='upschool'/>
				<meta name="keyword" content="" />
				<meta name="description" content=''/>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
				<meta property="og:url" content="" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="" />
				<meta property="og:description" content="" />
				<meta property="og:image" content="" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="risinginfra.in" />
				<meta property="twitter:url" content="" />
				<meta name="twitter:title" content="" />
				<meta name="twitter:description" content="" />
				<meta name="twitter:image" content="" />

			</Head>
				<Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
				<Script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
				<Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js" />
				<Script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" />
				<nav className={`navbar navbar-default navbar-fixed-top`}>
					<div className="container">
						<div className="row d-flex align-items-center">
							<div className="col-6">
								<a className="navbar-brand" href="#">
									<img
										className="navlogo Image-fluid"
										src="/manipal/Manipallogo.png"
										alt="Logo"
										style={{ height: 28 }}
									/>
								</a>
							</div>
							<div className="col-6 text-right">
								<button
									id="enquireButton12"
									className="btnnp enquire-btn btn "
									style={{
										color: "white",
										marginTop: 10,
										background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
										padding: "2px 20px",
										fontSize: 18,
										fontWeight: 600
									}}
									onClick={() => {
										const fnameInput = document.getElementById("fname");
										
										if (fnameInput) {
											fnameInput.focus(); // Instant focus without delay
										}
									}}
								>
									Apply Now
								</button>
							</div>
						</div>
					</div>
				</nav>
				<div style={{overflow:"hidden"}}>
				<section className={styles.bgimage} id="section1" style={{ marginTop: 61,  }} >
					<div className="container" id="enquiryForm">
						<div className="row">
							<div className="col-lg-8 col-md-8 col-sm-10 mx-auto text-center"></div>
							<div className="col-lg-4 col-md-8 col-sm-10 mx-auto text-center">
								<div className={styles.transparent_bg}>
									<p
										className={`${styles.formSection} ${styles.formtop}`}
										style={{
											fontWeight: 600,
											fontFamily: '"inter", sans-serif',
											fontSize: 17,
											color: "#f16622"
										}}
									>
										Get Free Counselling for Online MBA
									</p>
									<form onSubmit={handleSubmit}>
										<div className="name-box">
											<ul>
												<li>
													<div className="form-row form-div form-bottom-1">
														<div className="form-group col-md-12 unit">
															<input
																className="form-control"
																type="text"
																name="name"
																id="fname"
																placeholder="Full Name*"
																required=""
																value={formData.name}
																onChange={handleChange}
															/>
														</div>
													</div>
												</li>
												<li>
													<div className="form-row form-div form-bottom-1">
														<div className="form-group col-md-12 unit">
															<input
																className="form-control form-text phoneno"
																name="phoneNumber"
																id="phoneNumber"
																placeholder="Mobile Number*"
																autoComplete="off"
																type="tel"
																maxLength="10"
																pattern="^\d{10}$"
																title="Please enter correct Phone number"
																required=""
																value={formData.phoneNumber} 
																onChange={handleChange}
															/>
														</div>
													</div>
												</li>
												<li>
													<div className="form-row form-div form-bottom-1">
														<div className="form-group col-md-12 unit">
															<input
																className="form-control form-text"
																type="email"
																name="email"
																id="email"
																placeholder="Email*"
																required=""
																value={formData.email} 
																onChange={handleChange}
															/>
														</div>
													</div>
												</li>
												<li>
													<div className="form-row form-div form-bottom-1">
														<div className="form-group col-md-12 unit">
															<input
																className="form-control form-text"
																type="text"
																name="location"
																id="location"
																placeholder="Enter City*"
																required=""
																value={formData.location} 
																onChange={handleChange}
															/>
														</div>
													</div>
												</li>
												<li>
													<div className={`form-row form-div form_bottom_1`}>
														<div className="form-group col-md-12 unit" styles={{display:'flex',alignItems:'center'}}>
															
														 <div>
															<span style={{ fontSize: 13, marginTop: '-1em' }}>
															Get Free Counselling for Online UG, PG Course from Manipal University.
																</span>
														 </div>
														</div>
													</div>
												</li>
												<li>
													<div className="left form-error-top">
														<span className="form-success sucessMessage" />
														<span className="form-failure failMessage" />
													</div>
													<div className="form-group col-md-8" id="form_data_div">
													<input
															type="submit"
															className="submit-btn contact-form-submit"
															style={{
																color: "#fff",
																background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
																width: "100%",
																height: 30,
																paddingTop: 1,
																outline: "none",
																border: "none",
																cursor: loading ? "not-allowed" : "pointer",
																opacity: loading ? 0.7 : 1,
																position: "relative"
															}}
															name="btnSubmit"
															id="btnSubmit"
															value="Enquire Now"
															disabled={loading}
														/>

															{loading && (
																<div className="loader-overlay">
																	<div className="loader"></div>
																</div>
															)}
													</div>
													<span id="loader" />
												</li>
											</ul>
											<div className="clearB" />
										</div>
										<input
											type="hidden"
											name="utm_campaign"
											id="utm_campaign"
											defaultValue="Manipal"
										/>
										<input
											type="hidden"
											name="utm_content"
											id="utm_content"
											defaultValue="MUJ-online-MBA-Search"
										/>
										<input
											type="hidden"
											name="SourceIPAddress"
											id="SourceIPAddress"
											defaultValue=""
										/>
										<input
											type="hidden"
											name="utm_medium"
											id="utm_medium"
											defaultValue="Google"
										/>
										<input
											type="hidden"
											name="SourceReferrerURL"
											id="SourceReferrerURL"
											defaultValue=""
										/>
										<input
											type="hidden"
											name="utm_keyword"
											id="utm_keyword"
											defaultValue="Manipal online university"
										/>
										<input
											type="hidden"
											name="utm_adgroup"
											id="utm_adgroup"
											defaultValue=""
										/>
										<input type="hidden" name="gclid" id="gclid" defaultValue="" />
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>


{/* <section> */}
	<div className={styles.manipal_div}>
		<h2>The Manipal Legacy - Transformative education for a successful career</h2>
		<div className={styles.manipal_images_div}>
			<div className={styles.manipal_images}>
				<div className={styles.manipal_images_divs}>
					<img src="/manipal/Manipal-1.jpg" alt="Manipal-1"/>
				</div>
				<div className={styles.manipal_para1}>
					<p>Manipal Academy of Higher Education (MAHE)</p>
				</div>
			</div>
			<div className={styles.manipal_images}>
				<div className={styles.manipal_images_divs}>
					<img src="/manipal/Manipal-2.jpg" alt="Manipal-2"/>
				</div>
				<div className={styles.manipal_para2}>
					<p>Manipal University Jaipur (MUJ)</p>
				</div>
			</div>
			<div className={styles.manipal_images}>
				<div className={styles.manipal_images_divs}>
					<img src="/manipal/Manipal-3.png" alt="Manipal-3"/>
				</div>
				<div className={styles.manipal_para3}>
					<p>Sikkim Manipal University (SMU)</p>
				</div>
			</div>
		</div>
	</div>
{/* </section> */}

				<section className={styles.mobmar}>
			<h1 className="text-center" style={{ fontWeight: 600, fontFamily: 'Inter, sans-serif', padding: '25px 0' }}>
				Rankings & Accreditations
			</h1>
			<div className={styles.containerfluid} style={{ padding: 20, background: 'rgb(225 229 248)' }}>
				<Slider {...settings} className={styles.slick_slider}>
					{rankings.map((item, index) => (
						<div key={index} className="line-items text-center">
							<img
								style={{ display: 'block', margin: '0 auto', height: '27%', width: 200 }}
								loading="lazy"
								src={item.src}
								alt={item.title}
							/>
							<div className="title text-center">{item.title}</div>
						</div>
					))}
				</Slider>
			</div>
		</section>
				<div className="container donotshowonmobn" style={{ marginTop: 25 }}>
					<h1
						className="text-center"
						style={{ fontWeight: 600, fontFamily: '"Inter",sans-serif' }}
					>
						Programs equipped for the future
					</h1>
					<div className={styles.centered_tabs}>
					<button
						className={`${styles.btn} ${activeTab === "#home" ? styles.selected : ""}`}
						onClick={() => setActiveTab("#home")}
					>
						All
					</button>
					<button
						className={`${styles.btn} ${activeTab === "#menu1" ? styles.selected : ""}`}
						onClick={() => setActiveTab("#menu1")}
					>Master&rsquo;s Degree
					</button>
					<button
						className={`${styles.btn} ${activeTab === "#menu2" ? styles.selected : ""}`}
						onClick={() => setActiveTab("#menu2")}
					>Bachelor&rsquo;s Degree
					</button>
					</div>
			
					{activeTab === "#home" && (
					<div className={`${styles.tab_content} tab-content`}>
						<div
							id="home"
							className={`tab-pane fade in active`}
							style={{ padding: 23 }}
						>
							<div className="row">
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MBA-MUJ.jpg"
											loading="lazy"
											className="Image-responsive"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif',
												}}
											>
												MBA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif' , fontSize:"16px"}}
											>
												Master of Business Administration
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>24 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,75,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
														id="enquireButton2"
														className="enquire-btn"
														style={{
															color: "white",
															background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
															outline: "none",
															border: "none",
															padding: "10px",
															borderRadius: "5px",
															cursor: "pointer",
														}}
														onClick={() => {
															const fnameInput = document.getElementById("fname");

															if (fnameInput) {
																fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
																fnameInput.focus(); // Instant focus without delay
															}
														}}
													> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-BCA.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												BCA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Bachelor of Computer Applications
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>36 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,35,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
												id="enquireButton2"
												className="enquire-btn"
												style={{
													color: "white",
													background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
													outline: "none",
													border: "none",
													padding: "10px",
													borderRadius: "5px",
													cursor: "pointer",
												}}
												onClick={() => {
													const fnameInput = document.getElementById("fname");

													if (fnameInput) {
														fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
														fnameInput.focus(); // Instant focus without delay
													}
												}}
											>Enquire Now</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-BBA.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												BBA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Bachelor of Business Administration
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>36 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,35,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
												id="enquireButton2"
												className="enquire-btn"
												style={{
													color: "white",
													background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
													outline: "none",
													border: "none",
													padding: "10px",
													borderRadius: "5px",
													cursor: "pointer",
												}}
												onClick={() => {
													const fnameInput = document.getElementById("fname");

													if (fnameInput) {
														fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
														fnameInput.focus(); // Instant focus without delay
													}
												}}> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-MCOM.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												MCOM
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Master of Commerce
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>24 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,08,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
													id="enquireButton2"
													className="enquire-btn"
													style={{
														color: "white",
														background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
														outline: "none",
														border: "none",
														padding: "10px",
														borderRadius: "5px",
														cursor: "pointer",
													}}
													onClick={() => {
														const fnameInput = document.getElementById("fname");

														if (fnameInput) {
															fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
															fnameInput.focus(); // Instant focus without delay
														}
													}}
												> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-BCOM.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												BCOM
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif' }}
											>
												Bachelor of Commerce
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>36 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 99,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
											id="enquireButton2"
											className="enquire-btn"
											style={{
												color: "white",
												background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
												outline: "none",
												border: "none",
												padding: "10px",
												borderRadius: "5px",
												cursor: "pointer",
											}}
											onClick={() => {
												const fnameInput = document.getElementById("fname");

												if (fnameInput) {
													fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
													fnameInput.focus(); // Instant focus without delay
												}
											}}
										> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-MCA.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												MCA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Master of Computer Application
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>24 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,58,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
												id="enquireButton2"
												className="enquire-btn"
												style={{
													color: "white",
													background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
													outline: "none",
													border: "none",
													padding: "10px",
													borderRadius: "5px",
													cursor: "pointer",
												}}
												onClick={() => {
													const fnameInput = document.getElementById("fname");

													if (fnameInput) {
														fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
														fnameInput.focus(); // Instant focus without delay
													}
												}}
											> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						</div>
			)}

{activeTab === "#menu1" && (
	<div className={`${styles.tab_content} tab-content`}>
						<div style={{ padding: 23 }}>
							<div className="row">
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MBA-MUJ.jpg"
											loading="lazy"
											className="Image-responsive"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												MBA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Master of Business Administration
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>24 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,75,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
								id="enquireButton2"
								className="enquire-btn"
								style={{
									color: "white",
									background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
									outline: "none",
									border: "none",
									padding: "10px",
									borderRadius: "5px",
									cursor: "pointer",
								}}
								onClick={() => {
									const fnameInput = document.getElementById("fname");

									if (fnameInput) {
										fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
										fnameInput.focus(); // Instant focus without delay
									}
								}}
							> 
																			Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-MCOM.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												MCOM
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Master of Commerce
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>24 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,08,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
												id="enquireButton2"
												className="enquire-btn"
												style={{
													color: "white",
													background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
													outline: "none",
													border: "none",
													padding: "10px",
													borderRadius: "5px",
													cursor: "pointer",
												}}
												onClick={() => {
													const fnameInput = document.getElementById("fname");
													
													if (fnameInput) {
														fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
														fnameInput.focus(); // Instant focus without delay
													}
												}}
											> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-MCA.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												MCA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Master of Computer Application
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>24 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,58,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
													id="enquireButton2"
													className="enquire-btn"
													style={{
														color: "white",
														background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
														outline: "none",
														border: "none",
														padding: "10px",
														borderRadius: "5px",
														cursor: "pointer",
													}}
													onClick={() => {
														const fnameInput = document.getElementById("fname");

														if (fnameInput) {
															fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
															fnameInput.focus(); // Instant focus without delay
														}
													}}
												> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						</div>
)}
{activeTab === "#menu2" && (
	<div className={`${styles.tab_content} tab-content`}>
						<div style={{ padding: 23 }}>
							<div className="row">
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-BCA.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												BCA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Bachelor of Computer Applications
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>36 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,35,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
														id="enquireButton2"
														className="enquire-btn"
														style={{
															color: "white",
															background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
															outline: "none",
															border: "none",
															padding: "10px",
															borderRadius: "5px",
															cursor: "pointer",
														}}
														onClick={() => {
															const fnameInput = document.getElementById("fname");

															if (fnameInput) {
																fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
																fnameInput.focus(); // Instant focus without delay
															}
														}}
													> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-BBA.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												BBA
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Bachelor of Business Administration
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>36 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 1,35,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
															id="enquireButton2"
															className="enquire-btn"
															style={{
																color: "white",
																background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
																outline: "none",
																border: "none",
																padding: "10px",
																borderRadius: "5px",
																cursor: "pointer",
															}}
															onClick={() => {
																const fnameInput = document.getElementById("fname");

																if (fnameInput) {
																	fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
																	fnameInput.focus(); // Instant focus without delay
																}
															}}
														> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-4">
									<div className="panel panel-default">
										<img
											src="/manipal/MUJ-BCOM.jpg"
											loading="lazy"
											className="card-Image-top"
											alt="Card Image"
										/>
										<div className="panel-body">
											<h3
												className="text-center"
												style={{
													background: "rgba(225, 229, 248)",
													color: "#000",
													fontFamily: '"inter", sans-serif'
												}}
											>
												BCOM
											</h3>
											<h4
												className="text-center"
												style={{ fontWeight: 600, fontFamily: '"inter", sans-serif',fontSize:"16px" }}
											>
												Bachelor of Commerce
											</h4>
										</div>
										<div className="panel-footer">
											<div className="row">
												<div className="col-md-6 col-12">
													<div>
														<i className="fa fa-calendar" />
														<span>24 months</span>
													</div>
												</div>
												<div className="col-md-6 col-12">
													<div>
														<span style={{ fontWeight: 600 }}>INR 99,000/-</span>
													</div>
												</div>
											</div>
										</div>
										<div style={{ padding: 15 }}>
										<button
															id="enquireButton2"
															className="enquire-btn"
															style={{
																color: "white",
																background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
																outline: "none",
																border: "none",
																padding: "10px",
																borderRadius: "5px",
																cursor: "pointer",
															}}
															onClick={() => {
																const fnameInput = document.getElementById("fname");

																if (fnameInput) {
																	fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
																	fnameInput.focus(); // Instant focus without delay
																}
															}}
														> 
												Enquire Now
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						</div>
							)}
				</div>

				<section className={`${styles.certificate_sec} ${styles.seciton_padding}`}>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-sm-5">
          <div className="text-center mb-5" id={styles.image_data}>
            <img src="/manipal/Certificate-1.png" width="50%" style={{cursor: "pointer"}} alt="Manipal Certificate"
              data-bs-toggle="modal" data-bs-target="#certificatModal" />
          </div>
          <div className={`${styles.d_flex} gap-5`}>
            <img src="/manipal/Certificate-2.png" width="49%" style={{cursor: "pointer"}} alt="Manipal Certificate"
              data-bs-toggle="modal" data-bs-target="#certificatModal" />
            <img src="/manipal/Certificate-3.png" width="49%" style={{cursor: "pointer"}} alt="Manipal Certificate"
              data-bs-toggle="modal" data-bs-target="#certificatModal" />
          </div>
        </div>
        <div className="col-sm-7 ps-3 ps-sm-5">
          <div className={`${styles.headingbox} mt-3 mt-sm-0`}>
            <h2>Online Programs From Manipal University</h2>
            <p><small>Manipal University provides the Online Manipal Plus that has the benefits of e-lectures, counselling from academic advisors, career assistance, and others.</small></p>

          </div>
          <ul className={styles.certificat_list}>
            <li>Advantage of Integrated LMS and online lectures</li>
            <li>E-Library with more than 1,50,000 e-books</li>
            <li>Support from academic advisors</li>
            <li>Career assistance with interview tips</li>
            <li>Connect with university alumni network</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

				<section
					id="services "
					className="services-area fix py-3 pb-5"
					style={{
						background: "rgba(225,229,248)",
						paddingBottom: 40
					}}
				>
					<div className="container" id="section2">
						<div className="row align-items-center">
							<div className="col-lg-4 col-md-12">
								<div
									className={styles.about_title}
									style={{ paddingTop: 30 }}
								>
									<h5 style={{ fontFamily: '"inter",sans-serif' }}>Advantages</h5>
									<h2
										style={{
											fontFamily: '"inter",sans-serif',
											fontSize: "37px!important"
										}}
									>
										Online Manipal
										<br /> Advantages
									</h2>
								</div>
							</div>
							<div className="col-lg-8 col-md-12">
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<div
											className={`${styles.services_box} wow fadeInDown animated`}
											data-delay=".5s"
											style={{ visibility: "visible", animationName: "fadeInDown" }}
										>
											 <div className={styles.services_icon}>
												<i
													className="fa fa-user"
													style={{ fontSize: 25, color: "#03045e" }}
												/>
											</div>
											<div className={styles.services_content2}>
												<br />
												<h6 style={{ fontWeight: 600, fontSize: 18 }}>
													Convenient class schedule
												</h6>
												<p
													style={{ fontFamily: '"Inter", sans-serif', fontSize: 14 }}
												>
													Engage in live interactions to get your doubts clarified and
													write online-proctored exams from the comfort of your homes
													by booking slots as per your convenience.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div
											className={`${styles.services_box} wow fadeInDown animated`}
											data-delay=".5s"
											style={{ visibility: "visible", animationName: "fadeInDown" }}
										>
										 <div className={styles.services_icon}>
												<i
													className="fa fa-trophy"
													style={{ fontSize: 25, color: "#03045e" }}
												/>
											</div>
											<div className={styles.services_content2}>
												<br />
												<h6 style={{ fontWeight: 600, fontSize: 18 }}>
													Free Coursera access
												</h6>
												<p
													style={{ fontFamily: '"Inter", sans-serif', fontSize: 14 }}
												>
													Get exclusive access to 10,000+ courses on Coursera.
													Additionally, learners will be given free access to Google
													Cloud Computing Foundations curriculum.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div
											className={`${styles.services_box} wow fadeInDown animated`}
											data-delay=".5s"
											style={{ visibility: "visible", animationName: "fadeInDown" }}
										>
											<div className={styles.services_icon}>
												<i
													className="fa fa-address-book"
													style={{ fontSize: 25, color: "#03045e" }}
												/>
											</div>
											<div className={styles.services_content2}>
												<br />
												<h6 style={{ fontWeight: 600, fontSize: 18 }}>
													Industry webinars &amp; simulations
												</h6>
												<p
													style={{ fontFamily: '"Inter", sans-serif', fontSize: 14 }}
												>
													Attend webinars by industry experts to gain
													industry-specific knowledge. Participate in hands-on
													workshops and get certified in emerging technologies like
													Metaverse, AI Modelling, Blockchain, and more.
												</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div
											className={`${styles.services_box} wow fadeInDown animated`}
											data-delay=".5s"
											style={{ visibility: "visible", animationName: "fadeInDown" }}
										>
											<div className={styles.services_icon}>
												<i
													className="fa fa-snowflake-o"
													style={{ fontSize: 25, color: "#03045e" }}
												/>
											</div>
											<div className={styles.services_content2}>
												<br />
												<h6 style={{ fontWeight: 600, fontSize: 18 }}>
													Prestigious Manipal alumni status
												</h6>
												<p
													style={{ fontFamily: '"Inter", sans-serif', fontSize: 14 }}
												>
													Benefit from 70+ years of Manipal legacy and become a member
													of a reputed 150,000+ member alumni network with top
													professionals &amp; business leaders like Mr Satya Nadella,
													Chef Vikas Khanna and more.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div
					id="hiring"
					className="container"
					style={{ marginTop: 25, marginBottom: 50 }}
				>
					<h1
						className="text-center"
						style={{ fontWeight: 600, fontFamily: '"Inter",sans-serif' }}
					>
						Our Reputed Hiring Partners
					</h1>
					<img
						style={{ maxWidth: "100%" }}
						src="/manipal/placement.jpg"
						loading="lazy"
						alt=""
						className="Image-fluid"
					/>
				</div>
				<div
					className="p-5 my-5"
					style={{
						background: "rgba(225,229,248)",
						paddingTop: 18,
						paddingBottom: 40
					}}
				>
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<h2 style={{ fontFamily: '"inter",sans-serif' }}>
									<i className="fa fa-graduation-cap" />
								</h2>
								<h2 style={{ fontFamily: '"inter",sans-serif', fontSize: 24 }}>
									Avail Easy Financing Options
								</h2>
								<p
									style={{
										fontFamily: '"inter",sans-serif',
										fontSize: 16,
										textAlign: "justify"
									}}
								>
									With our no-cost EMIs, we let your learning take the spotlight
									without the stress of financing.
								</p>
							</div>
							<div className="col-md-6">
								<h2 style={{ fontFamily: '"inter",sans-serif' }}>
									<i className="fa fa-money" />
								</h2>
								<h2 style={{ fontFamily: '"inter",sans-serif', fontSize: 24 }}>
									Get Attractive Scholarships
								</h2>
								<p
									style={{
										fontFamily: '"inter",sans-serif',
										fontSize: 16,
										textAlign: "justify"
									}}
								>
									Exclusive scholarships designed for defense personnel, government
									employees, differently-abled people &amp; meritorious students.
								</p>
							</div>
						</div>
					</div>
				</div>
				<h1
					className="text-center pb-4 mb-4"
					style={{
						fontWeight: 600,
						fontFamily: '"Inter",sans-serif',
						paddingTop: 25,
						paddingBottom: 20
					}}
				>
					Academic Excellence. Global Impact.
				</h1>
				<section id="section3" style={{ paddingTop: 20, paddingBottom: 50 }}>
					<div className="container">
						<div className="row">
							<div className="col-md-3">
								<div>
									<span
										style={{
											fontFamily: '"Inter",sans-serif',
											fontWeight: 700,
											fontSize: 20
										}}
									>
										70+
									</span>
									<p
										style={{
											fontFamily: '"Inter",sans-serif',
											fontSize: 16,
											fontWeight: 500
										}}
									>
										Years of educational experience
									</p>
								</div>
								<div className="mt-3" style={{ paddingTop: 20 }}>
									<span
										style={{
											fontFamily: '"Inter",sans-serif',
											fontWeight: 700,
											fontSize: 20
										}}
									>
										1500+
									</span>
									<p
										style={{
											fontFamily: '"Inter",sans-serif',
											fontSize: 16,
											fontWeight: 500
										}}
									>
										Learner footprint across towns &amp; cities of India
									</p>
								</div>
							</div>
							<div className="col-md-6">
								<img
									style={{ maxWidth: "100%" }}
									className="d-blcok ms-auto"
									src="/manipal/Rev-Global-Impact.png"
									loading="lazy"
									alt=""
								/>
							</div>
							<div className="col-md-3">
								<div>
									<span
										style={{
											fontFamily: '"Inter",sans-serif',
											fontWeight: 700,
											fontSize: 20
										}}
									>
										60+
									</span>
									<p
										style={{
											fontFamily: '"Inter",sans-serif',
											fontSize: 16,
											fontWeight: 500
										}}
									>
										Student nationalities
									</p>
								</div>
								<div className="mt-3" style={{ paddingTop: 20 }}>
									<span
										style={{
											fontFamily: '"Inter",sans-serif',
											fontWeight: 700,
											fontSize: 20
										}}
									>
										3000+
									</span>
									<p
										style={{
											fontFamily: '"Inter",sans-serif',
											fontSize: 16,
											fontWeight: 500
										}}
									>
										Expert faculty
									</p>
								</div>
								<div className="mt-3" style={{ paddingTop: 20 }}>
									<span
										style={{
											fontFamily: '"Inter",sans-serif',
											fontWeight: 700,
											fontSize: 20
										}}
									>
										100+
									</span>
									<p
										style={{
											fontFamily: '"Inter",sans-serif',
											fontSize: 16,
											fontWeight: 500
										}}
									>
										Recruiters from Fortune 500 companies
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className={styles.onlyonphone}>
					<h1
						id="global"
						className="text-center my-5"
						style={{
							fontFamily: '"inter", sans-serif',
							fontWeight: 600,
							fontSize: 22,
							marginBottom: 36
						}}
					>
						Admission Process
					</h1>
					<div className={styles.containerfluid}>
						<div className="row">
							<div className="col-lg-12">
								<div className={styles.horizontal_timeline}>
									<ul className={`list-inline ${styles.items}`}>
										<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													className={`${styles.event_date} badge bg-info  text-white`}
													style={{
														backgroundColor: "#17a2b8",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 1
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Choose a Program{" "}
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Choose the program and register by filling in your basic
													details
												</p>
											</div>
										</li>
										<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													className={`${styles.event_date} badge bg-info text-white`}
													style={{
														backgroundColor: "#28a745",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 2
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Provide Educational Details
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Fill in your educational &amp; work experience-related
													details
												</p>
											</div>
										</li>
										<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													className={`${styles.event_date} badge bg-info  text-white`}
													style={{
														backgroundColor: "#ffc107",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 3
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Pay Program Fee{" "}
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Pay the admission fee for the first semester/year or full
													program
												</p>
											</div>
										</li>
										<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													 className={`${styles.event_date} badge bg-info  text-white`}
													style={{
														backgroundColor: "#007bff",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 4
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Upload Documents
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Upload supporting documents &amp; submit your application
													complete the process
												</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className={styles.notmobb}>
					<h1
						id="global "
						className="text-center my-5"
						style={{
							fontFamily: '"inter", sans-serif',
							fontWeight: 600,
							marginBottom: 80
						}}
					>
						Admission Process
					</h1>
					<div className={styles.containerfluid}>
						<div className="row">
							<div className="col-lg-12">
							<div className={styles.horizontal_timeline}>
							<ul className={`list-inline ${styles.items}`}>
									<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													className={`${styles.event_date} badge bg-info  text-white`}
													style={{
														backgroundColor: "#17a2b8!important",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 1
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Choose a Program{" "}
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Choose the program and register by filling in your basic
													details
												</p>
											</div>
										</li>
										<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													 className={`${styles.event_date} badge bg-info  text-white`}
													style={{
														backgroundColor: "#28a745!important",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 2
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Provide Educational Details
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Fill in your educational &amp; work experience-related
													details
												</p>
											</div>
										</li>
										<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													 className={`${styles.event_date} badge bg-info  text-white`}
													style={{
														backgroundColor: "#ffc107!important",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 3
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Pay Program Fee{" "}
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Pay the admission fee for the first semester/year or full
													program
												</p>
											</div>
										</li>
										<li className={`list-inline-item ${styles.items_list}`}>
											<div className="px-4">
												<div
													 className={`${styles.event_date} badge bg-info  text-white`}
													style={{
														backgroundColor: "#007bff!important",
														fontSize: 16,
														padding: 6
													}}
												>
													Step 4
												</div>
												<h5
													className="pt-2"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontWeight: 600
													}}
												>
													Upload Documents
												</h5>
												<p
													className="text-muted"
													style={{
														fontFamily: '"Inter", sans-serif',
														fontSize: 16,
														color: "#000"
													}}
												>
													Upload supporting documents &amp; submit your application
													complete the process
												</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div style={{ display: "none" }} className="container onlyphone">
					<div className="text-center mt-2">
						<h3 style={{ fontWeight: 600, color: "#3c4752" }}>
							Online MBA Programme
						</h3>
						<hr
							style={{
								borderTop: "5px solid #D02F38",
								fontWeight: "bold",
								margin: "20px auto",
								width: "25%"
							}}
						/>
						<a
							href="#formSection"
							className="btn mt-4"
							style={{
								backgroundColor: "#D02F38",
								color: "#fff",
								fontSize: 18,
								fontWeight: 600,
								width: "50%",
								margin: "0px auto",
								borderRadius: 20
							}}
						>
							Enquire Now
						</a>
					</div>
				</div>
				<div className="container text-center" style={{ padding: 30 }}>
					<div style={{ padding: 15 }}>
						<button
							id="enquireButton12"
						 className={`${styles.btnnp} enquire-btn`}
							style={{
								color: "white",
								background: "linear-gradient(90deg, #ed3024 0%, #ff6600 100%)",
								fontSize: 25,
								fontWeight: 600
							}}
							onClick={() => {
								const fnameInput = document.getElementById("fname");
								
								if (fnameInput) {
									fnameInput.scrollIntoView({ behavior: "smooth", block: "start" });
									fnameInput.focus(); // Instant focus without delay
								}
							}}
						>
							Start Your Admission Process
						</button>
					</div>
				</div>
				<section
					className="containerfluid "
					id="section4"
					style={{ width: "100%", marginTop: 30, backgroundColor: "#F48945" }}
				>
					<div className="row">
						<div className="col-md-7 col-12">
							<div
								className="certificateHolder"
								style={{ padding: 20, paddingTop: 25 }}
							>
								<h2
									className="section-title text-white"
									style={{
										fontFamily: '"inter", sans-serif',
										fontSize: 22,
										color: "#fff",
										fontWeight: 600
									}}
								>
									Get a <span className="fontBold orangeColor">Prestigious</span>{" "}
									Degree
								</h2>
								<p
									className="p text-white"
									style={{
										fontFamily: '"inter", sans-serif',
										fontSize: 18,
										marginTop: 10,
										color: "#fff",
										textAlign: "justify"
									}}
								>
									Globally recognized and widely accepted by governments and
									organizations, the online degrees offered by Manipal University
									Jaipur are at par with on-campus degrees and open doors to better
									professional opportunities.{" "}
								</p>
							</div>
						</div>
						<div className="col-md-5 col-12">
							<img
								style={{ maxWidth: "100%" }}
								src="/manipal/online-manipal-c.jpg"
								loading="lazy"
								alt=""
							/>
						</div>
					</div>
				</section>
				<div className="containerfluid" style={{ backgroundColor: "#ca2128" }}>
					<div className="container p-2">
						<div className="row">
							<div className="col-md-12 text-center">
								<p
									style={{
										color: "#fff",
										fontFamily: '"inter", sans-serif',
										fontSize: 16,
										padding: 10
									}}
								>
									{" "}
									© Online Manipal. All Rights Reserved. | Privacy Policy
								</p>
							</div>
						</div>
					</div>
				</div>
				</div>
			</>
			
		)
}
export default Manipal