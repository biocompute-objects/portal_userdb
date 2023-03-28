
import React from "react";
import Container from "@material-ui/core/Container";
import { Row, Col, Image } from "react-bootstrap";

const TeamMembersCard = (props) => {
	return (
		<React.Fragment>
			<Container maxWidth="lg">
				<h2 className="section-heading">{props.data.heading}</h2>
				<h3>{props.data.subheading}</h3>

				<Row className="gg-align-center">
					{props.data.people.map((json) => (
						<Col md={4} lg={3} className="team">
							<>
								{json.url ? (
									<>
										<a
											href={json.url}
											target="_blank"
											rel="noopener noreferrer">
											<Image
												className="img-circle"
												src={process.env.PUBLIC_URL + json.image}
												alt={json.imageText}
											/>
										</a>
										<a
											href={json.url}
											target="_blank"
											rel="noopener noreferrer">
											<h5>{json.name}</h5>
										</a>
									</>
								) : (
									<>
										<Image
											className="img-circle"
											src={process.env.PUBLIC_URL + json.image}
											alt={json.imageText}
										/>
										<h5>{json.name}</h5>
									</>
								)}
								<p>
									<div>{json.position}</div>
									<div>{json.department}</div>
									<div>{json.institution},</div>
									<div>{json.location}</div>
									<div>
										<em>{json.dateLeft}</em>
									</div>
								</p>
							</>
						</Col>
					))}
				</Row>
			</Container>
		</React.Fragment>
	);
};