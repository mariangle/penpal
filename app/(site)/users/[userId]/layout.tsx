const layout = ({children} : {children: React.ReactNode}) => {
  return (
  <div className="w-full my-4 glassmorphism min-h-[90vh]">
      <div className="bg_default">
      </div>
    {children}
    </div>
  )
}

export default layout