import React, { useState } from "react";
import "./App.css";
import Amplify, { Predictions } from "aws-amplify";
import awsExports from "./aws-exports";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
Amplify.configure(awsExports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function identify(e) {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);
    try {
      const file = e.target.files[0];
      await Predictions.identify({
        labels: {
          source: {
            file,
          },
          type: "LABELS",
        },
      }).then(res => {
        const { labels } = res;
        setResponse(labels);
        setIsLoading(false);
      });
    } catch (err) {
      // console.log(err);
    }
  }
  const colorArr = {
    green: "text-lime-600",
    red: "text-red-800",
  };

  return (
    <div className='flex flex-col justify-center place-items-center text-center bg-gray-800 min-h-screen w-full text-white'>
      <div>
        <div className='flex flex-col place-items-center '>
          <h1 className='text-4xl'>Identify Image:</h1>
          <br />
          <input className='ml-4' type='file' onChange={identify} />
        </div>
      </div>
      {!isLoading ? (
        <ul className='flex flex-col mt-10 w-full items-center'>
          {response.map(item => (
            <div>
              {item.metadata.confidence >= 50.0 ? (
                <div
                  className={`border-b p-4 place-items-center ${
                    item.metadata.confidence >= 70
                      ? "text-lime-600"
                      : "text-red-600"
                  }`}
                >
                  <li className={"flex mr-8 px-2 "} key={item.name}>
                    <p className='font-medium mr-2 md:text-lg pr-10 text-base '>
                      Label:
                    </p>
                    <p className='font-light md:text-base text-sm'>
                      {item.name}
                    </p>
                  </li>
                  <li className='flex justify-items-center'>
                    <p className='font-medium mr-4 md:text-lg text-base '>
                      Confidence:
                    </p>
                    <p className='font-light md:text-base text-sm '>
                      {Number(item.metadata.confidence).toFixed(2)}%
                    </p>
                  </li>
                </div>
              ) : null}
            </div>
          ))}
        </ul>
      ) : (
        <div className='mt-20'>Identifying Image...</div>
      )}
    </div>
  );
}

export default App;
