import React from 'react'
import Sidebar from './sidebar';


type Props = {
  children?: React.ReactNode
};
const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="h-full w-full p-4 overflow-y-auto lg:block  sm:hidden " style={{ boxShadow: " 0px 4px 60px 0px #0000000D"}}>{children}</div>
    </div>
  )
}

export default Layout