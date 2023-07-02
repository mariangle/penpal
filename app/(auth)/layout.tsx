const layout = ({children} : { children: React.ReactNode}) => {
  return (
  <div className="min-h-[90vh] grid content-center px-2">
    {children}
    </div>
  )
}

export default layout