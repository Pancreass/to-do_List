
function Navbar() {

  return (
    <nav className='flex px-6 py-3 bg-blue-900 justify-between'>
        <div className="cursor-pointer mx-9 font-bold text-xl text-white logo">To-Do</div>
        <ul className='mx-9 text-white flex space-x-6'>
          <li className='cursor-pointer'>Home</li>
          <li className='cursor-pointer'>About us</li>
        </ul>
    </nav>
  )
}

export default Navbar
