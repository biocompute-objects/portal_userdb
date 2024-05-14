import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Row } from "react-bootstrap";
import Container from "@material-ui/core/Container";

export default function HorizontalHeading(props) {
	const { post } = props;

	return (
		<div className="content-box-md" id={props.id}>
			<Container maxWidth="xl">
				<Row>
					<Grid item xs={12} sm={12} md={12} lg={12} className="text-left">
						<div className="horizontal-heading">
							<h5>{post.h5VerticalText}</h5>
							<h2>
								<span>
									<strong>{post.h2textTopStrongBefore}</strong>
								</span>{" "}
								{post.h2textTop}{" "}
								<span>
									<strong>{post.h2textTopStrongAfter}</strong>
								</span>{" "}
								{post.h2textTop2} <br />
								<span>
									<strong>{post.h2textBottomStrongBefore}</strong>
								</span>{" "}
								{post.h2textBottom}{" "}
								<span>
									<strong>{post.h2textBottomStrongAfter}</strong>
								</span>
							</h2>
							<Typography variant="p" style={{ fontSize: "18px" }}>
								{post.pText}
							</Typography>
						</div>
					</Grid>
				</Row>
			</Container>
		</div>
	);
}

HorizontalHeading.propTypes = {
	post: PropTypes.object,
};