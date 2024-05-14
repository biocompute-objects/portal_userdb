
import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "head";
import CssBaseline from "@material-ui/core/CssBaseline";
// import StoryAboutUs from "../components/about/StoryAboutUs";
import OurTeam from "../OurTeam";
// import UnivLogos from "../components/about/UnivLogos";
import { logActivity } from "../data/logging";


const About = (props) => {
	useEffect(() => {
		logActivity();
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				{getTitle("about")}
				{getMeta("about")}
			</Helmet>

			<CssBaseline />
			<div style={{ backgroundColor: "#fff" }}>
				{/* <StoryAboutUs /> */}
				<OurTeam />
			</div>
		</React.Fragment>
	);
};
export default About;