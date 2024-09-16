import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/Mutation';
import Auth from '../utils/Auth';
import "../assets/styles.css";
import {
  Grid,
  GridColumn,
  Form as SemanticForm,
  Input as FormInput,
  Button,
  Divider,
  Segment,
  Message,
} from 'semantic-ui-react';

function LoginPage() {
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

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <GridColumn>
          <SemanticForm onSubmit={handleFormSubmit}>
            <FormInput
              icon='user'
              iconPosition='left'
              placeholder='Email'
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              value={formState.email}
              style={{ marginBottom: '1em' }} // Adding margin to the bottom
            />
            <FormInput
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="password"
              id="pwd"
              onChange={handleChange}
              value={formState.password}
              style={{ marginBottom: '1em' }} // Adding margin to the bottom
            />
            {error ? (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>The provided credentials are incorrect</p>
              </Message>
            ) : null}
            <Button type='submit' content='Login' primary />
          </SemanticForm>
        </GridColumn>

        <GridColumn verticalAlign='middle'>
          <Button content='Sign up' icon='signup' size='big' as={Link} to='/signup' />
        </GridColumn>
      </Grid>

      <Divider className='hide' vertical>Or</Divider>
    </Segment>
  );
}

export default LoginPage;
