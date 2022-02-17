// import React, { useState } from "react";
// import "./App.css";
// import Amplify, { Predictions } from "aws-amplify";
// import awsExports from "./aws-exports";
// import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
// Amplify.configure(awsExports);
// Amplify.addPluggable(new AmazonAIPredictionsProvider());

// function App() {
//   const [response, setResponse] = useState([]);
//   async function identify(e) {
//     try {
//       const file = e.target.files[0];
//       await Predictions.identify({
//         labels: {
//           source: {
//             file,
//           },
//           type: "LABELS",
//         },
//       }).then(res => {
//         const { labels } = res;
//         setResponse(labels);
//         labels.forEach(element => {
//           console.log(element);
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className='flex justify-center text-center bg-gray-800 min-h-screen text-white'>
//       <header className=''>
//         <div className='flex place-items-center'>
//           <h1 className='text-4xl'>Identify Image:</h1>
//           <input className='ml-4' type='file' onChange={identify} />
//         </div>

//         <ul className='mt-10'>
//           {response.map(item => (
//             <div className='flex border-b p-4'>
//               <li className='flex mr-8 px-2' key={item.name}>
//                 <p className='font-medium mr-2 text-lg'>Label:</p>{" "}
//                 <p className='font-light'>{item.name}</p>
//               </li>
//               <li className='flex'>
//                 <p className='font-medium mr-4 text-lg'>Confidence:</p>{" "}
//                 <p className='font-light'>{item.metadata.confidence}</p>
//               </li>
//             </div>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;
