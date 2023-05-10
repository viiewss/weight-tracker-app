import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  // useState hooks are setting initial state values for email, password, and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // useNavigate hook from react-router for programmatically navigating to different routes
  const navigate = useNavigate();

  // Function that handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the form from refreshing the page on submit
    //console.log(email, password);
    //console.log('event:', event);
    try {
      // Sends a POST request to the server with the email and password
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // If the server responds with an ok status, navigate to the Weight Tracker page
      if (response.ok) {
        navigate('/weight-tracker');
      } else {
        // If the server responds with an error, display the error message
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      // If there's an error with the fetch request, display a generic error message
      setError('Error registering user');
    }
  };

  // The return function renders the form
  return (
    <div>
      <h1>Register</h1>
      {/* If there's an error, display the error */}
      {error && <div className='error'>{error}</div>}
      {/* When the form is submitted, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          {/* When the email input changes, update the email state */}
          <input
            type='email'
            name='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          {/* When the password input changes, update the password state */}
          <input
            type='password'
            name='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        {/* Submit button for the form */}
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
