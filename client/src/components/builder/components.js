import { MyTextField, BaisicDateTimePicker } from "./specialFeilds"
import { Grid } from "@material-ui/core";

export const Uri = ({uri_element}) => {
  return (
    <>
      <Grid item xs>
        <MyTextField name={`${uri_element}["filename"]`} label="File name"/>
      </Grid>
      <Grid item xs>
        <MyTextField name={`${uri_element}["uri"]`} label="URI"/>
      </Grid>
      <Grid item xs>
        <BaisicDateTimePicker name={`${uri_element}["access_time"]`} label="Access Time"/>
      </Grid>
      <Grid item xs>
        <MyTextField name={`${uri_element}["sha1_checksum"]`} label="SHA1 Checksum"/>
      </Grid>
    </>

  )

}