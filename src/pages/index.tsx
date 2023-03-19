import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './login.module.css';
import axios from 'axios';

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues extends LoginFormValues {
  confirmPassword: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();

  function dashboard(token:string) {
    axios.post("https://nextapp-o1zrqv7k2-kvksatish.vercel.app/api/authentication/dashboard", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      localStorage.setItem('token', token);
      router.push("/dashboard");
    });
  }
  



  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isConfirmPasswordValid = confirmPassword === password;

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      if (isSignup) {
        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
          // Here, you could add logic to create a user and send a verification email

          axios.post('https://nextapp-o1zrqv7k2-kvksatish.vercel.app/api/authentication/signup', { email, password, name: "hgvhyvju" }).then((res) => {
            console.log(res, "siginup")
            alert("success")
            })
            
       //   router.push('/dashboard');
        } else {
          setError('Please provide valid email address and password');
        }
      } else {
        if (isEmailValid && isPasswordValid) {
          // Here, you could add logic to sign in the user
          
          axios.post('https://nextapp-o1zrqv7k2-kvksatish.vercel.app/api/authentication/login', { email, password}).then((res) => {
            console.log(res.data.token, "login")
            //settoken()
            dashboard(res.data.token)
          })
            
          //  router.push('/dashboard');
        } else {
          setError('Please provide valid email address and password');
        }
      }
    } catch (error:any) {
      setError(error.message);
    }
  };

    return (
        <div style={{ backgroundColor: "red",width:"50%",margin:"auto",marginTop:"4rem",padding:"4rem" }} className="container mx-auto">
  <div className="flex justify-center">
    <div className="w-1/2">
            <h1 className="mb-4 text-2xl">{isSignup ? 'Sign up' : 'Login'}</h1>
          

      <form onSubmit={handleFormSubmit}>
        <div  className="form-group">
          <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className={`form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${email && !isEmailValid ? 'border-red-500' : ''}`}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {email && !isEmailValid ? <div className="text-red-500 text-sm mt-1">Invalid email address</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            className={`form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${password && !isPasswordValid ? 'border-red-500' : ''}`}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {password && !isPasswordValid ? (
            <div className="text-red-500 text-sm mt-1">
              Password must contain at least 8 characters, including at least one uppercase letter, one lowercase
              letter, one number, and one special character.
            </div>
          ) : null}
        </div>

        {isSignup ? (
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className={`form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${confirmPassword && !isConfirmPasswordValid ? 'border-red-500' : ''}`}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {confirmPassword && !isConfirmPasswordValid ? (
              <div className="text-red-500 text-sm mt-1">Passwords do not match</div>
            ) : null}
          </div>
        ) : null}

        <div className="form-group">
          <button type="submit" className="inline-block px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus:bg-indigo-600 active:bg-indigo-700">{isSignup ? 'Sign up' : 'Login'}</button>
        </div>
      </form>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : null}

      <p className="mt-4 text-sm">
        {isSignup ? 'Already have an account?' : "Don't havean account?"}{' '}
<button
className="text-indigo-500 underline hover:text-indigo-700 focus:outline-none"
onClick={() => setIsSignup((prevState) => !prevState)}
>
{isSignup ? 'Login instead' : 'Sign up instead'}
</button>
</p>
</div>

  </div>
</div>

);
};

export default LoginPage;
