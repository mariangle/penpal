import AuthForm from "./components/AuthForm"

const Login = () => {
  return (
    <div className='min-h-[90vh] flex items-center flex-col justify-center w-full max-w-[25rem]'>
        <div className="mt-4 w-full rounded-xl border border-gray-200 p-4  bg-white">
          <h1 className="text-2xl text-center font-bold my-4">Sign In</h1>
          <AuthForm variant="login"/>
        </div>
    </div>
  )
}

export default Login