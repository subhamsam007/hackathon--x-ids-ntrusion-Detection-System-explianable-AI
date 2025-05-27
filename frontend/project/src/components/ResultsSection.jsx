import { useState } from 'react'
import ShapChart from './ShapChart'
import ShapTable from './ShapTable'

function ResultsSection({ loading, results, error, uploadedFile }) {
  const [showTable, setShowTable] = useState(false)
  
  // Display appropriate content based on state
  let content
  
  if (error) {
    content = (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-500/10 text-error-500 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-8 h-8"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-error-500">Error</h3>
          <p className="mt-2 text-sm text-gray-400">{error}</p>
        </div>
      </div>
    )
  } else if (loading) {
    content = (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 text-primary-400 mb-4 animate-pulse-slow">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-8 h-8 animate-spin"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-primary-400">Analyzing</h3>
          <p className="mt-2 text-sm text-gray-400">The AI model is processing your data...</p>
        </div>
      </div>
    )
  } else if (!results) {
    content = (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-50 text-gray-400 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-8 h-8"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-300">No Data Analyzed Yet</h3>
          <p className="mt-2 text-sm text-gray-400">
            Upload a CSV file or enter feature values manually, then click "Detect Intrusion"
          </p>
        </div>
      </div>
    )
  } else {
    // Display results
    const isAttack = results.prediction === 'attack'
    
    content = (
      <div className="space-y-6">
        {/* Prediction Result */}
        <div className={`p-4 rounded-lg border ${isAttack ? 'bg-error-500/10 border-error-500/20' : 'bg-success-500/10 border-success-500/20'}`}>
          <div className="flex items-center">
            <div className={`rounded-full p-2 ${isAttack ? 'bg-error-500/20 text-error-500' : 'bg-success-500/20 text-success-500'}`}>
              {isAttack ? (
                <svg xmlns="http://www.w3.org/2000/svg\" viewBox="0 0 24 24\" fill="currentColor\" className="w-6 h-6">
                  <path fillRule="evenodd\" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z\" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5zm-7.5 3a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5H9.75a1.5 1.5 0 01-1.5-1.5V12.75z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-4">
              <h3 className={`text-lg font-semibold ${isAttack ? 'text-error-500' : 'text-success-500'}`}>
                {isAttack ? '❌ Attack Detected' : '✅ Normal Traffic'}
              </h3>
              <p className="text-sm text-gray-400">
                {isAttack 
                  ? 'The AI model has detected suspicious network activity.' 
                  : 'The network traffic appears to be normal.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* SHAP Visualization */}
        <div>
          <h3 className="text-lg font-medium mb-4">Top Influential Features</h3>
          <ShapChart shapValues={results.shap} />
        </div>
        
        {/* Toggle between chart and table */}
        <div className="flex justify-center">
          <button 
            className="text-sm text-primary-400 hover:text-primary-300"
            onClick={() => setShowTable(!showTable)}
          >
            {showTable ? 'Hide detailed SHAP values' : 'Show all SHAP values'}
          </button>
        </div>
        
        {/* Full SHAP Table (conditionally rendered) */}
        {showTable && (
          <div className="mt-4">
            <ShapTable shapValues={results.shap} />
          </div>
        )}
        
        {/* File Information */}
        {uploadedFile && (
          <div className="mt-4 p-3 bg-dark-200 rounded text-xs text-gray-400">
            <p>File: {uploadedFile.name}</p>
            <p>Size: {(uploadedFile.size / 1024).toFixed(2)} KB</p>
            <p>Last modified: {new Date(uploadedFile.lastModified).toLocaleString()}</p>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="card h-full">
      <h2 className="text-xl font-bold mb-6">Analysis Results</h2>
      {content}
    </div>
  )
}

export default ResultsSection