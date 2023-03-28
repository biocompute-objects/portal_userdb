import React from "react";
import { Box, Card, CardContent, CardHeader, Grid, Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
      fontSize: "24px"
    },
    linkCard: {
      minHeight: "300px",
      textAlign: "center"
    },
    supportCard: {
      textAlign: "Left",
      marginBottom: 12,
      marginLeft: 12
    },
    centered: {
        minWidth: 275,
        textAlign: "center"
      },
    title: {
      fontSize: "33px",
      marginTop: 10
    },
    colorBackground: {
        backgroundColor: "#c2d3f7"
    }
  });

export default function Story() {
    const classes = useStyles();

    return (
        <Card className={classes.centered}>
            <CardContent className={classes.linkCard}>
                <Box className={classes.colorBackground}>
                <Typography className={classes.title}>
                    <strong>Our Story</strong>
                    <br />
                </Typography>
                <Typography className={classes.bullet}>
                    BioCompute is built through collaboration between the George Washington University and the Food and Drug Administration (FDA) and approved as an official standard of IEEE 2791-2020. BioCompute brings transparency of the workflow and clear expectations for data sharing between communities. The project has worked with individuals from NIH, Harvard, several biotech and pharma companies, EMBL-EBI, Galaxy Project, and many more, and can be integrated with any existing standard for HTS data. Associate tools have been developed by popular bioinformatics platforms such as DNAnexus, Seven Bridges, and Galaxy for BCO submission with minimal effort.
                    <br />
                    More information about The current BioCompute standard can be found on the <a href="https://osf.io/h59uh/">Open Science Foundation</a> website (where the standard is developed and maintained), the <a href="https://hive.biochemistry.gwu.edu/htscsrs/biocompute">HIVE</a> website, and the Research Objects discussion of BioCompute.
                </Typography>
                </Box>
            </CardContent>
        </Card>
);
}