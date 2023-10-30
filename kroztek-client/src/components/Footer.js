/** @format */

import React from "react";
import { Layout, Row, Col } from "antd";
import { usePostApi } from "../context/PostProvider";
import {
	MailOutlined,
	PhoneOutlined,
	EnvironmentOutlined,
	MessageOutlined,
} from "@ant-design/icons";
import "../css/footer.css";
const { Footer } = Layout;

function AppFooter() {
	const { state } = usePostApi();
	const { metadata } = state;
		const latitude = 20.66249607748869;
		const longitude = 85.59409979447742;
	  
		const handleOpenLocation = () => {
		  // Construct the Google Maps URL with the coordinates
		  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
		
		// Open the URL in a new window or tab
		window.open(googleMapsUrl, "_blank");
	  }
	  
	return (
		<Footer style={{ backgroundColor: "#005BAB", color: "#fff" }}>
			<div className="footer-container">
				<Row gutter={[16, 16]} justify="center" align="middle">
					{/* Quick Links */}
					{/* <Col className='links' xs={24} sm={24} md={8} lg={8}>
						<h3>Quick Links</h3>
						<ul>
							<li>

								About Us

							</li>
							<li>

								FAQs

							</li>
							<li>

								Terms and Conditions

							</li>
						</ul>
					</Col> */}

					{/* Direct Contact */}
					<Col xs={24} sm={24} md={8} lg={7}>
						<h3>Direct Contact</h3>
						<ul>
							<li>
								<a href={`https://wa.me/${metadata?.phoneNumber || "+918637214899"}/?text=Hello%2C%20I%20want%20to%20chat`}>
									<MessageOutlined /> Chat via WhatsApp
								</a>
							</li>
							<li>
								<a href={`mailto:${metadata?.email || "kroztekintegratedsolution@gmail.com"}?subject=Email%20Subject&body=Hello%2C%20I%20want%20to%20email`}>
									<MailOutlined /> Contact Via Email
								</a>
							</li>
						</ul>
					</Col>

					{/* Contact Us */}
					<Col xs={24} sm={24} md={8} lg={9}>
						<h3>Contact Us</h3>
						<ul>
							<li>
								<strong>Office Location:</strong> <EnvironmentOutlined />{" "}
								<a href="#" onClick={handleOpenLocation}>
								113,gayatrinagar, Nuasasan
							
                                 Near Saishree Eye Hospital, 759001, Dhenkanal, Odisha
								 </a>
							</li>
							<li>
								<strong>Call Us at:</strong>{" "}
								<a href="tel:+918637214899">
									<PhoneOutlined /> +918637214899
								</a>
							</li>
						</ul>
					</Col>
				</Row>

				<Row justify="center">
					<Col xs={24}>
						<p
							style={{
								textAlign: "center",
								margin: "20px 0",
								fontSize: "14px",
							}}
						>
							&copy; {new Date().getFullYear()} Kroztek Integrated Solution. All rights
							reserved.
						</p>
					</Col>
				</Row>
			</div>
		</Footer >
	);
}

export default AppFooter;
