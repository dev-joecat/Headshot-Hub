import React, { useState } from 'react';
import { auth } from './firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('User created:', userCredential.user);
      // Proceed with user onboarding, such as linking game accounts
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={signUp}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
