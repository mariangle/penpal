import Sidebar from "./components/Sidebar"

const layout = ({children} : {children: React.ReactNode}) => {

  return (
    <div className="bg-white w-full m-4 p-6 rounded-lg border glassmorphism">
        <div className='min-h-[10vh] border-b py-8 flex items-center'>
            <h1 className="font-semibold text-2xl">Account</h1>
        </div>
        <div className='flex flex-col lg:flex-row py-8 gap-4'>
            <Sidebar />
            <div className="border w-full rounded-lg p-4 bg-white">
              {children}
            </div>
        </div>
    </div>
  )
}

export default layout