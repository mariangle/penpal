import AuthForm from "./components/AuthForm"

const Login = () => {
  return (
    <div className='min-h-[90vh] flex items-center flex-col justify-center w-full max-w-[25rem]'>
        <div className="mt-4 w-full rounded-xl border border-gray-200 p-4  bg-white">
          <div className="my-4">
            <h1 className="text-4xl text-center font-bold mt-4 blue_gradient">PenPal</h1>
            <p className="text-gray-500 my-4 text-sm text-center">Sign in to your account.</p>
          </div>
          <AuthForm variant="login"/>
        </div>
    </div>
  )
}

export default Login