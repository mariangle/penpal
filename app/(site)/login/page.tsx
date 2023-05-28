import AuthForm from "../../components/auth/AuthForm"

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>PenPal</h1>
      <h2>Sign in to your account</h2>
      <div className="mt-4 w-full max-w-sm">
        <AuthForm variant="login"/>
      </div>
    </div>
  )
}

export default Login