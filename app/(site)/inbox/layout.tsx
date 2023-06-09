import Sidebar from "./components/Sidebar"

const layout = ({children} : {children : React.ReactNode} ) => {
  return (
    <div className="w-full">
        <div className="md:flex gap-4 min-h-[80vh] glassmorphism mt-6">
          <Sidebar />
          {children}
        </div>
    </div>
  )
}

export default layout