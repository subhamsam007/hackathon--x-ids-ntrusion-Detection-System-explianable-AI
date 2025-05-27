import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

/**
 * Send features to the API for intrusion detection
 * @param {Array<number>} features - Array of 41 numeric features
 * @returns {Promise<Object>} - Prediction result with SHAP values
 */
export async function predictIntrusion(features) {
  try {
    // Validate input
    if (!Array.isArray(features) || features.length !== 41) {
      throw new Error('Features must be an array of 41 numeric values')
    }

    // Ensure all features are numbers
    const numericFeatures = features.map(f => {
      const num = parseFloat(f)
      if (isNaN(num)) {
        throw new Error('All features must be valid numbers')
      }
      return num
    })

    // Make API request
    const response = await axios.post(`${API_BASE_URL}/predict`, {
      features: numericFeatures
    })

    return response.data
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.error || 'Server error'
      throw new Error(errorMessage)
    } else if (error.request) {
      throw new Error('No response from server. Is the API running?')
    } else {
      throw error
    }
  }
}

/**
 * Generate mock prediction data for testing purposes
 * @returns {Object} - Mock prediction data
 */
export function getMockPrediction() {
  const isAttack = Math.random() > 0.5

  const shapValues = {}
  const featureNames = [
    'duration', 'protocol_type', 'service', 'flag', 'src_bytes',
    'dst_bytes', 'land', 'wrong_fragment', 'urgent', 'hot',
    'num_failed_logins', 'logged_in', 'num_compromised', 'root_shell', 'su_attempted',
    'num_root', 'num_file_creations', 'num_shells', 'num_access_files', 'num_outbound_cmds',
    'is_host_login', 'is_guest_login', 'count', 'srv_count', 'serror_rate',
    'srv_serror_rate', 'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate',
    'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count', 'dst_host_same_srv_rate', 'dst_host_diff_srv_rate',
    'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate', 'dst_host_rerror_rate',
    'dst_host_srv_rerror_rate'
  ]

  featureNames.forEach(feature => {
    shapValues[feature] = (Math.random() * 2 - 1) * (isAttack ? 0.8 : 0.3)
  })

  return {
    prediction: isAttack ? 'attack' : 'normal',
    shap: shapValues
  }
}
