import AuthForm from "@/app/components/auth/AuthForm"

const Register = () => {
  return (
    <div className='min-h-[90vh] flex items-center flex-col justify-center w-full max-w-[27.5rem]'>
        <div className="mt-4 w-full rounded-xl border border-gray-200 p-4  bg-white bg-opacity-70 md:p-6">
          <div className="my-4">
            <h1 className="text-4xl text-center font-bold mt-4 blue_gradient">Register</h1>
          </div>
          <AuthForm variant="Register"/>
        </div>
    </div>
  )
}

export default Register