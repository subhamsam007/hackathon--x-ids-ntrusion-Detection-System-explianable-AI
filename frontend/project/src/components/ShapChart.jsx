import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function ShapChart({ shapValues }) {
  // Get top 5 features by absolute SHAP value
  const topFeatures = Object.entries(shapValues)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 5)
  
  // Prepare data for chart
  const labels = topFeatures.map(([feature]) => feature)
  const values = topFeatures.map(([, value]) => value)
  
  // Define colors based on value (positive/negative)
  const backgroundColors = values.map(value => 
    value >= 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'
  )
  
  const borderColors = values.map(value => 
    value >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
  )
  
  const data = {
    labels,
    datasets: [
      {
        label: 'SHAP Value',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            label += context.parsed.x.toFixed(4)
            return label
          },
          title: function(context) {
            return context[0].label
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  }
  
  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
      <div className="mt-4 text-xs text-gray-400 text-center">
        <p>
          <span className="inline-block w-3 h-3 bg-success-500 mr-1"></span> Positive values contribute toward "normal" prediction
        </p>
        <p>
          <span className="inline-block w-3 h-3 bg-error-500 mr-1"></span> Negative values contribute toward "attack" prediction
        </p>
      </div>
    </div>
  )
}

export default ShapChart