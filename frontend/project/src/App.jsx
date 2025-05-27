import { useState } from 'react'
import Header from './components/Header'
import InputSection from './components/InputSection'
import ResultsSection from './components/ResultsSection'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [inputMethod, setInputMethod] = useState('upload') // 'upload' or 'manual'
  const [uploadedFile, setUploadedFile] = useState(null)

  return (
    <div className="min-h-screen bg-dark-500 text-white flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection 
            loading={loading}
            setLoading={setLoading}
            setResults={setResults}
            setError={setError}
            inputMethod={inputMethod}
            setInputMethod={setInputMethod}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
          
          <ResultsSection 
            loading={loading}
            results={results}
            error={error}
            uploadedFile={uploadedFile}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App