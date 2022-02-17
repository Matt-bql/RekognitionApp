// import React, { useState } from "react";
// import "./App.css";
// import Amplify, { Predictions } from "aws-amplify";
// import awsExports from "./aws-exports";
// import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
// Amplify.configure(awsExports);
// Amplify.addPluggable(new AmazonAIPredictionsProvider());

// function App() {
//   const [response, setResponse] = useState("Please upload a phote...");
//   async function identify(e) {
//     setResponse("Identifying text...");
//     const {
//       target: { files },
//     } = e;
//     const file = files[0];
//     const data = await Predictions.identify({
//       text: { source: { file }, format: "PLAIN" }, // PLAIN, FORM,TABLE,ALL
//     });
//     setResponse(data.text.fullText);
//   }

//   return (
//     <div className='flex justify-center text-center bg-gray-800 min-h-screen text-white'>
//       <header className=''>
//         <h3>Text Iden</h3>
//         <input type='file' onChange={identify} />
//         <p>{response}</p>
//       </header>
//     </div>
//   );
// }

// export default App;
