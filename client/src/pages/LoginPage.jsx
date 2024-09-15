import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/Mutation';
import Auth from '../utils/auth';
import "../assets/styles.css";
import {
  GridColumn,
  FormInput,
  Button,
  Divider,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react'

function LoginPage(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const DividerVerticalForm = () => (
    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <GridColumn>
          <Form>
            <FormInput
              icon='user'
              iconPosition='left'
              placeholder='Email'
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
            <FormInput
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
            <Button content='Login' primary />
          </Form>
        </GridColumn>
  
        <GridColumn verticalAlign='middle'>
          <Button content='Sign up' icon='signup' size='big' as={Link}
                    to={`/signup/`} />
        </GridColumn>
      </Grid>
  
      <Divider vertical className='divider'>Or</Divider>
    </Segment>
      )
  return (
    DividerVerticalForm()
    // <div className="container my-1">
    //   <Link to="/signup">← Go to Signup</Link>

    //   <h2>Login</h2>
    //   <form onSubmit={handleFormSubmit}>
    //     <div className="flex-row space-between my-2">
    //       <label htmlFor="email">Email address:</label>
    //       <input
    //         placeholder="youremail@test.com"
    //         name="email"
    //         type="email"
    //         id="email"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="flex-row space-between my-2">
    //       <label htmlFor="pwd">Password:</label>
    //       <input
    //         placeholder="******"
    //         name="password"
    //         type="password"
    //         id="pwd"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     {error ? (
    //       <div>
    //         <p className="error-text">The provided credentials are incorrect</p>
    //       </div>
    //     ) : null}
    //     <div className="flex-row flex-end">
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
    
  );
}

export default LoginPage;
