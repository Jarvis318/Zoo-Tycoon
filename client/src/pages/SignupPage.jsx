import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/Mutation';
import { Segment, Form, Button } from 'semantic-ui-react';

function SignupPage(props) {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
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
      <div className="container my-1">
        <Link to="/login">← Go to Login</Link>
        <h2>Signup</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Field>
            <label htmlFor="username">Username:</label>
            <input
              placeholder="username"
              name="username"
              type="text"
              id="username"
              onChange={handleChange}
              value={formState.username}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">Email:</label>
            <input
              placeholder="example@email.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              value={formState.email}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              value={formState.password}
            />
          </Form.Field>
          <Button type="submit" primary>
            Submit
          </Button>
          {error && <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>}
        </Form>
      </div>
    </Segment>
  );
}

export default SignupPage;
