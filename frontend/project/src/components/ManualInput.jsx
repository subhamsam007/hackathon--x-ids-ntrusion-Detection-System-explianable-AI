import { useEffect } from 'react'

function ManualInput({ features, setFeatures }) {
  const selectedFeatureNames = [
    'duration',       // index 0
    'src_bytes',      // index 4
    'dst_bytes',      // index 5
    'count',          // index 22
    'serror_rate'     // index 24
  ]

  const selectedFeatureIndices = [0, 4, 5, 22, 24]

  // Ensure features array has 41 items
  useEffect(() => {
    if (features.length !== 41) {
      setFeatures(Array(41).fill(''))
    }
  }, [features, setFeatures])

  const handleInputChange = (index, value) => {
    const updatedFeatures = [...features]
    updatedFeatures[index] = value
    setFeatures(updatedFeatures)
  }

  const clearAll = () => {
    setFeatures(Array(41).fill(''))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-300">
          Enter the 5 key features for prediction:
        </h3>
        <button 
          onClick={clearAll}
          className="text-xs text-gray-400 hover:text-gray-300"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedFeatureNames.map((name, idx) => {
          const actualIndex = selectedFeatureIndices[idx]
          return (
            <div key={actualIndex} className="space-y-1">
              <label className="block text-xs text-gray-400">
                {actualIndex + 1}. {name}
              </label>
              <input
                type="text"
                value={features[actualIndex]}
                onChange={(e) => handleInputChange(actualIndex, e.target.value)}
                className="input-field text-sm"
                placeholder="0.0"
              />
            </div>
          )
        })}
      </div>

      <div className="text-xs text-gray-500 mt-2">
        <p>Note: Other 36 values are automatically filled with 0. You only need to enter these 5 important features.</p>
      </div>
    </div>
  )
}

export default ManualInput
