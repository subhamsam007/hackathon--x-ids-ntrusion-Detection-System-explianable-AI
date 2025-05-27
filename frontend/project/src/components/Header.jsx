import React from 'react'

function Header() {
  return (
    <header className="bg-dark-400 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-md bg-primary-500 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  d="M12 15a3 3 0 100-6 3 3 0 000 6z" 
                />
                <path 
                  fillRule="evenodd" 
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">X-IDS</h1>
              <p className="text-xs md:text-sm text-gray-400">Explainable AI-based Intrusion Detection System</p>
            </div>
          </div>
          
         
        </div>
      </div>
    </header>
  )
}

export default Header