import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Button, Box, Card, CardContent, Grid, TextField, CardHeader } from '@material-ui/core';
import { MyTextField } from "../builder/specialFeilds";
import { changePassword } from '../../slices/accountSlice';

export default function Password() {
  const dispatch = useDispatch()

  return(
    <Card>
      <CardContent>
        <Formik
        initialValues={{
          old_password: '',
          new_password: '',
          confirm_password: '',
        }}
        validationSchema={Yup.object().shape({
          new_password: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/(?=.*[0-9])/, 'Password must contain a number.')
            .max(255)
            .required('Password is required'),
          confirm_password: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
            .required('Password Conformation is required'),

        })}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(true);
          dispatch(changePassword(values));
          console.log(values)
          setSubmitting(false);
        }}
        >
          {({values, isSubmitting}) => (
            <Form>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <MyTextField name="old_password" type="password" label='Old password' isRequired/>
                </Grid>
                <Grid item>
                  <MyTextField name="new_password" type="password" label='New password' isRequired/>
                </Grid>
                <Grid item>
                  <MyTextField name="confirm_password" type="password" label='Confirm password' isRequired/>
                </Grid>
              </Grid>
              <div style={{padding: 20}}> 
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  variant="contained"
                  color="primary"
                >Update password </Button>
                </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}