import AuthForm from "../login/components/AuthForm"

const Register = () => {
  return (
    <div className='min-h-[90vh] flex items-center flex-col justify-center w-full max-w-[25rem]'>
        <div className="mt-4 w-full rounded-xl border border-gray-200 p-4  bg-white">
          <div className="my-4">
            <h1 className="text-2xl text-center font-bold mt-4">Sign Up</h1>
            <p className="text-gray-500 my-4 text-sm text-center">Experience the nostalgia of writing a traditional letter in a digital world. </p>
          </div>
          <AuthForm variant="register"/>
        </div>
    </div>
  )
}

export default Register