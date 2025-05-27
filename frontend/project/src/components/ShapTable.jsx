// import React from 'react'

// function ShapTable({ shapValues }) {
//   // Convert SHAP values object to sorted array
//   const sortedShapValues = Object.entries(shapValues)
//     .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
  
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="bg-dark-50">
//             <th className="py-2 px-4 text-left">Feature</th>
//             <th className="py-2 px-4 text-right">SHAP Value</th>
//             <th className="py-2 px-4">Impact</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedShapValues.map(([feature, value], index) => (
//             <tr 
//               key={feature} 
//               className={index % 2 === 0 ? 'bg-dark-200' : 'bg-dark-300'}
//             >
//               <td className="py-2 px-4 text-left">{feature}</td>
//               <td className="py-2 px-4 text-right font-mono">
//                 {value.toFixed(6)}
//               </td>
//               <td className="py-2 px-4">
//                 <div className="w-full bg-dark-50 h-4 rounded-full overflow-hidden">
//                   {value >= 0 ? (
//                     <div 
//                       className="bg-success-500 h-full rounded-full" 
//                       style={{ width: `${Math.min(Math.abs(value) * 100, 100)}%` }}
//                     ></div>
//                   ) : (
//                     <div 
//                       className="bg-error-500 h-full rounded-full ml-auto" 
//                       style={{ width: `${Math.min(Math.abs(value) * 100, 100)}%` }}
//                     ></div>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ShapTable