import { useState } from 'react'
import FileUploader from './FileUploader'
import ManualInput from './ManualInput'
import { predictIntrusion } from '../services/api'

function InputSection({ 
  loading,
  setLoading,
  setResults,
  setError,
  inputMethod,
  setInputMethod,
  uploadedFile,
  setUploadedFile
}) {
  const [features, setFeatures] = useState(Array(41).fill(''))

  const handleDetect = async () => {
    // Validate features
    if (inputMethod === 'manual' && features.some(f => f === '' || isNaN(parseFloat(f)))) {
      setError('All features must be valid numbers')
      return
    }

    if (inputMethod === 'upload' && !uploadedFile) {
      setError('Please upload a CSV file first')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Convert features to numbers
      const featuresArray = features.map(f => parseFloat(f))
      
      // Call API
      const result = await predictIntrusion(featuresArray)
      setResults(result)
    } catch (err) {
      console.error('Error detecting intrusion:', err)
      setError(err.message || 'An error occurred while processing your request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card h-full">
      <h2 className="text-xl font-bold mb-6">Input Data</h2>
      
      <div className="mb-6">
        <div className="flex rounded-md overflow-hidden">
          <button
            className={`flex-1 py-2 ${inputMethod === 'upload' ? 'bg-primary-500 text-white' : 'bg-dark-200 text-gray-300'}`}
            onClick={() => setInputMethod('upload')}
          >
            Upload CSV
          </button>
          <button
            className={`flex-1 py-2 ${inputMethod === 'manual' ? 'bg-primary-500 text-white' : 'bg-dark-200 text-gray-300'}`}
            onClick={() => setInputMethod('manual')}
          >
            Manual Input
          </button>
        </div>
      </div>
      
      <div className="transition-all duration-300">
        {inputMethod === 'upload' ? (
          <FileUploader 
            setFeatures={setFeatures} 
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            setError={setError}
          />
        ) : (
          <ManualInput 
            features={features} 
            setFeatures={setFeatures} 
          />
        )}
      </div>
      
      <div className="mt-6">
        <button 
          className="btn-primary w-full"
          onClick={handleDetect}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Detect Intrusion'
          )}
        </button>
      </div>
    </div>
  )
}

export default InputSection