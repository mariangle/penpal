import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-screen-lg mx-auto flex'>
      <aside>Sidebar</aside>
      <div className='w-full max-w-md'>
        {children}
      </div>
    </div>
  )
}

export default layout