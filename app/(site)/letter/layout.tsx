
const layout = ({children} : {children : React.ReactNode} ) => {
  return (
    <div className="w-full">
        <div className="min-h-[20vh] grid content-center">
          <p className="desc">Lorem ipsum dolor sit amet <span className="blue_gradient">consectetur</span> adipisicing elit. Modi, architecto!</p>
        </div>
        <div className="glassmorphism mt-6">
          {children}
        </div>
    </div>  
  )
}

export default layout