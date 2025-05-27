import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark-400 py-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} X-IDS By-Team: <span className='text-red-400 text-md'> knight_pheniox </span> . All rights reserved.</p>
          <p className="mt-2 md:mt-0">Explainable AI-based Intrusion Detection System</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer