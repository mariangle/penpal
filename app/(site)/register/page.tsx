import AuthForm from "../../components/forms/AuthForm"

const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>PenPal</h1>
      <h2>Sign Up</h2>
      <div className="mt-4 w-full max-w-sm">
        <AuthForm variant="register"/>
      </div>
    </div>
  )
}

export default Register