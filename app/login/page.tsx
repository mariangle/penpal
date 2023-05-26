import AuthForm from "./components/AuthForm"

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>SnailMail</h1>
      <h2>Sign in to your account</h2>
      <div className="mt-4 w-full max-w-sm">
        <AuthForm />
      </div>
    </div>
  )
}

export default Login