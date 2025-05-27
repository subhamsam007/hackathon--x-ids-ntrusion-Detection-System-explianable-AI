import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function FileUploader({ setFeatures, uploadedFile, setUploadedFile, setError }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    if (file) {
      // Check file type
      if (!file.name.endsWith('.csv')) {
        setError('Please upload a CSV file')
        return
      }

      setUploadedFile(file)

      // Read file content
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target.result
          const rows = content.split('\n')

          // Get the first non-empty row
          const dataRow = rows.find(row => row.trim() !== '')

          if (!dataRow) {
            setError('CSV file is empty')
            return
          }

          // Parse values
          const values = dataRow.split(',').map(val => val.trim())

          // Validate number of features
          if (values.length !== 41) {
            setError(`Expected 41 features, but found ${values.length}`)
            return
          }

          // Validate numeric values
          // Step 1: Trim and convert to numbers
          const numericValues = values.map(val => parseFloat(val.trim()));

          // Step 2: Validate length and type
          if (numericValues.length !== 41) {
            setError(`Expected 41 features, but found ${numericValues.length}`);
            return;
          }

          if (numericValues.some(val => isNaN(val))) {
            setError('All features must be valid numbers');
            return;
          }
          // Step 3: Set features
          setFeatures(numericValues);
          setError(null);
          console.log("📥 Cleaned numeric features:", numericValues);

        } catch (err) {
          console.error('Error parsing CSV:', err)
          setError('Error parsing CSV file')
        }
      }
      reader.readAsText(file)
    }
  }, [setFeatures, setUploadedFile, setError])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
          ${isDragActive
            ? 'border-primary-500 bg-primary-500/10'
            : 'border-gray-600 hover:border-primary-400 hover:bg-dark-200'}`
        }
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-12 h-12 mb-4 ${isDragActive ? 'text-primary-400' : 'text-gray-500'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>

          {isDragActive ? (
            <p className="text-primary-400">Drop the CSV file here...</p>
          ) : (
            <>
              <p className="text-gray-300 font-medium">Drag & drop a CSV file here, or click to select</p>
              <p className="text-gray-500 text-sm mt-1">The file should contain a single row with 41 comma-separated numeric values</p>
            </>
          )}
        </div>
      </div>

      {uploadedFile && (
        <div className="bg-dark-200 p-4 rounded-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-secondary-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>

            <div className="ml-2 overflow-hidden">
              <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
              <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
            </div>

            <button
              className="ml-auto text-gray-400 hover:text-error-500"
              onClick={(e) => {
                e.stopPropagation()
                setUploadedFile(null)
                setFeatures(Array(41).fill(''))
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploader