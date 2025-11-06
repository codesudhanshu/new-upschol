import Head from 'next/head';
import { useEffect } from 'react';

const Thank = () =>{
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
		return(
		<>
		 <Head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Thank You</title>   
		{/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.green.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css" />
		<Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
		<Script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js" /> */}
		</Head> 
				<div className="thanku">
	<br />
	<div className="container">
		<div className="header">
			<br />
			<br />
			<br />
			<center>
				<img
					src="/submission-confirm.gif"
					className="img-responsive"
				/>
			</center>
			<center>
				<h1 style={{ color: "#000" }}>
					<strong>THANK YOU !</strong>
				</h1>
			</center>
			<center>
				<h4>
					<strong>Your Submission has been received</strong>
				</h4>
			</center>
			<br />
			<div className="button">
				<center>
  <button
    type="button"
    onClick={() => window.history.back()}
    style={{
      padding: 10,
      border: "1px solid black",
      backgroundColor: "#002B5C",
      color: "#fff"
    }}
  >
    Visit Website
  </button>
</center>

				<br />
				<br />
			</div>
			{/*end of card*/}
		</div>
		{/*end of container*/}
		<br />
	</div>
	{/*end of thanku*/}
</div>
</>
		)
}

export default Thank