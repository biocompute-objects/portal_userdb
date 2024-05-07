import { Box, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view"

export const ProvenanceView = () => {
  const prov = useSelector(state => state.bco.data.provenance_domain)
  return (
    <Card>
      <CardHeader title="Provenance Domain" />
      <CardContent>
        <Typography>Name: {prov.name}</Typography>
        <Typography>Version: {prov.version}</Typography>
        <Typography>License: {prov.license}</Typography>
        <Typography>Created: {prov.created}</Typography>
        <Typography>Modified: {prov.modified}</Typography>
      </CardContent>
      <CardContent>
        <CardHeader subheader="Contributors" />
        {prov.contributors.map((contributor, cont_index)=> (
          <div key={cont_index}>
            <Typography >Name: {contributor.name}</Typography>
            <Typography >Email: {contributor.email}</Typography>
            <Typography >Affiliation: {contributor.affiliation}</Typography>
            <Typography >ORCID: {contributor.orcid}</Typography>
            <Typography> Contribution:
              {contributor.contribution.map((contribution, contribution_index)=> (
                <Typography key={contribution_index}>{contribution}</Typography>
              ))}
            </Typography>
          </div>
        ))}
      </CardContent>
      <CardContent>
        <CardHeader subheader="Review" />
        {
          prov.review
            ? (prov.review.map((review, review_index)=>(
              <div key={review_index}>
                <Typography>Reviewer name: {review.reviewer.name}</Typography>
                <Typography>Reviewer comment: {review.reviewer_comment}</Typography>
                <Typography>Status: {review.status}</Typography>
                <Typography>Date: {review.date}</Typography>
                <Typography>Reviewer email: {review.reviewer.email}</Typography>
                <Typography>Reviewer affiliation: {review.reviewer.affiliation}</Typography>
                <Typography>Reviewer ORCID: {review.reviewer.orcid}</Typography>
              </div>
            )))
            : (<div></div>)
        }
      </CardContent>
    </Card>
  )
};

export const UsabilityView = () => {
  const use = useSelector(state => state.bco.data.usability_domain)
  return(
    <Card>
      <CardHeader title="Usability Domain" />
      <CardContent>
        {use.map((text, index) => (
          <Typography key={index}>{text}</Typography>
        ))}
      </CardContent>
    </Card>
  )
};

export const DescriptionView = () => {
  const desc = useSelector(state => state.bco.data.description_domain)
  return (
    <Card>
      <CardHeader title="Description Domain"/>
      <CardHeader subheader="Keywords"/>
      <CardContent>
        {desc.keywords.map((word, key_index)=>(
          <Typography key={key_index}>{word}</Typography>
        ))}
      </CardContent>
      <CardHeader subheader="External References"/>
      <CardContent>
        {desc.xref
          ? (desc.xref.map((xref, x_index)=>(
            <div key={x_index}>
              <Typography>Namespace: {xref.namespace}</Typography>
              <Typography>Name: {xref.name}</Typography>
              <Typography>Access time: {xref.access_time}</Typography>
              <Typography>Identifiers: {xref.ids}</Typography>
              <br/>
            </div>
          )))
          : <div></div>
        }
        <Typography>Platform: {desc.platform}</Typography>
      </CardContent>
      <CardHeader subheader="Pipeline Steps" />
      <CardContent>
        {desc.pipeline_steps.map((step, step_index)=> (
          <div key={step_index}>
            <Typography>Step name: {step.name}</Typography>
            <Typography>Step number: {step.step_number}</Typography>
            <Typography>Step version: {step.version}</Typography>
            <Typography>Step description: {step.description}</Typography>
            {step.prerequisite
              ? (<div>
                <CardHeader subheader={`${step.name} Prereqs:`}/>
                {step.prerequisite.map((prereq, pre_index) => (
                  <div key={pre_index}>
                    <Typography>Prereq name: {prereq.name}</Typography>
                    <Typography>Prereq URI: {prereq.uri.uri}</Typography>
                    <Typography>Prereq access time: {prereq.uri.access_time}</Typography>
                  </div>
                ))}
              </div>)
              : <div></div>}
            <br/>
            {step.input_list
              ? (<div>
                <CardHeader subheader={`${step.name} Input List:`}/>
                {step.input_list.map((input, input_index) => (
                  <div key={input_index}>
                    <Typography>Input name: {input.name}</Typography>
                    <Typography>Input URI: {input.uri}</Typography>
                    <Typography>Input access time: {input.access_time}</Typography>
                  </div>
                ))}
              </div>)
              : <div></div>}
            <br/>
            {step.output_list
              ? (<div>
                <CardHeader subheader={`${step.name} Output List:`}/>
                {step.output_list.map((output, output_index) => (
                  <div key={output_index}>
                    <Typography>Output name: {output.name}</Typography>
                    <Typography>Output URI: {output.uri}</Typography>
                    <Typography>Output access time: {output.access_time}</Typography>
                  </div>
                ))}
              </div>)
              : <div></div>}
            <br/>
          </div>
        ))}
      </CardContent>

    </Card>
  )
};
export const ExtensionView = () => {
  const extensionDom = useSelector(state => state.bco.data.extension_domain)
  console.log(extensionDom)
  return (
    <Card>
      <CardHeader title="Extension Domain"/>
      <CardContent>
        <TextField
          color="primary"
          fullWidth
          id="outlined-multiline-static"
          multiline
          minRows={25}
          defaultValue={JSON.stringify(extensionDom, null, 4)}
          variant="outlined"
          disabled
        />
      </CardContent>
    </Card>
  )
};

export const ParametricView = () => {
  const parameters = useSelector(state => state.bco.data.parametric_domain)
  return (
    <Card>
      <CardHeader title="Parametric Domain"/>
      <CardContent>
        {parameters.length > 0
          ? parameters.map((param, param_index) => (
            <Grid item key={param_index}>
              <Typography>Parameter: {param.param}</Typography>
              <Typography>Parameter step: {param.step}</Typography>
              <Typography>Parameter value: {param.value}</Typography>
              <br/>
            </Grid>
            
          ))
          : <div></div>
        }
      </CardContent>
    </Card>
  )
};

export const IoView = () => {
  const IoDom = useSelector(state => state.bco.data.io_domain)
  return (
    <Card>
      <CardHeader title="IO Domain"/>
      <CardHeader subheader="Input Subdomain"/>
      <CardContent>
        {IoDom.input_subdomain.length > 0
          ? (
            <div>
              {IoDom.input_subdomain.map((input, input_index)=> (
                <div key={input_index}>
                  <Typography >Filename: {input.uri.filename}</Typography>
                  <Typography >URI: {input.uri.uri}</Typography>
                  <Typography >Access time: {input.uri.access_time}</Typography>
                  <Typography >SHA Checksum: {input.uri.sha1_checksum}</Typography>
                  <br/>
                </div>
              ))}
            </div>
          )
          : <div>no</div>
        }
      </CardContent>
      <CardHeader subheader="Output Subdomain"/>
      <CardContent>
        {IoDom.output_subdomain.length > 0
          ? (
            <div>
              {IoDom.output_subdomain.map((output, output_index)=> (
                <div key={output_index}>
                  <Typography >Media type: {output.mediatype}</Typography>
                  <Typography >Filename: {output.uri.filename}</Typography>
                  <Typography >URI: {output.uri.uri}</Typography>
                  <Typography >Access time: {output.uri.access_time}</Typography>
                  <Typography >SHA Checksum: {output.uri.sha1_checksum}</Typography>
                  <br/>
                </div>
              ))}
            </div>
          )
          : <div>no</div>
        }
      </CardContent>
    </Card>
  )
};

export const ExecutionView = () => {
  const ExDom = useSelector(state => state.bco.data.execution_domain)
  const envVar = ExDom["environment_variables"]
  return (
    <Card>
      <CardHeader title="Execution Domain" />
      <CardContent>
        <Typography>Script Driver: {ExDom.script_driver}</Typography>
        {ExDom["script"]? (
          ExDom["script"].map((script, script_index) =>(
            <Typography key={script_index}>
              Script: {JSON.stringify(script["uri"]["uri"])}
            </Typography>
          ))
        ) : (<Typography />
        )}
      </CardContent>
      <CardHeader subheader="Environment Variables"/>{console.log()}
      <CardContent>
        {Object.keys(envVar).map((env,env_index) => (
          <Typography key={env_index}>
            {env} : {envVar[env]}
          </Typography>
        ))}
      </CardContent>
      <CardHeader subheader="Software Prerequisites"/>
      {ExDom["software_prerequisites"]? (
        ExDom["software_prerequisites"].map((prereq, prereq_index)=> (
          <CardContent key={prereq_index}>
            <Typography>Name: {prereq.name}</Typography>
            <Typography>Version: {prereq.version}</Typography>
            <Typography>URI: {prereq.uri.uri}</Typography>
            <br/>
          </CardContent>
        ))
      )  : (<CardContent></CardContent>)}
      <CardHeader subheader="External Data Endpoints"/>
      {ExDom["external_data_endpoints"]? (
        ExDom["external_data_endpoints"].map((endpoint, endpoint_index)=> (
          <CardContent key={endpoint_index}>
            <Typography>Name: {endpoint.name}</Typography>
            <Typography>URL: {endpoint.url}</Typography>
            <br/>
          </CardContent>
        ))
      )  : (<CardContent></CardContent>)}
    </Card>
  )
};

export const RawJson = () => {
  const bco = useSelector(state => state.bco.data)
  return (
    <Card>
      <CardHeader title="Raw JSON View"/>
      <CardContent>
        <Typography>
          <pre><code>
            {JSON.stringify(bco, null, 2)}
          </code></pre>
        </Typography>
      </CardContent>
    </Card>
  )
}

export const TreeView = () => {
  const bco = useSelector(state => state.bco.data)
  return (
    <ReactJson 
      src={bco}
    />
  )
}

export const ErrorView = () => {
  const ErrDom = useSelector(state => state.bco.data.error_domain)
  return (
    <Card>
      <CardHeader title="Error Domain"/>
      {ErrDom["empirical_error"] ? (
        <CardContent>
          <Typography>
            <pre><code>
              {JSON.stringify(ErrDom, null, 2)}
            </code></pre>
          </Typography>
        </CardContent>
      ) : (<Card></Card>)}
      
    </Card>
  )
};