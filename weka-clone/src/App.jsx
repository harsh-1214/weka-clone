import { useState } from "react";
// import { Parser } from "papaparse";
import { parse } from "papaparse";

function App() {
  const [file, setFile] = useState("");

  const [firstVal, setFirstVal] = useState("");
  const [secondVal, setSecondVal] = useState("");
  const [result, setResult] = useState(null);

  function numericCorellation() {
    try {
      parse(file, {
        complete: (res, file) => {
          const data = res.data;
          console.log(data, data.length);
          const firstIndex = data[0]?.indexOf(firstVal);
          const secondIndex = data[0]?.indexOf(secondVal);

          let sumX = 0;
          let sumY = 0;
          let sumXY = 0;
          let sumX2 = 0;
          let sumY2 = 0;
          const n = data.length - 1;

          for (let i = 1; i < data.length; i++) {
            const ele = data[i];
            const first = Number(ele[firstIndex]);
            const second = Number(ele[secondIndex]);
            sumX = sumX + first;
            sumY = sumY + second;
            sumXY = sumXY + first * second;
            sumX2 = sumX2 + first * first;
            sumY2 = sumY2 + second * second;
          }

          const numerator = n * sumXY - sumX * sumY;
          const denominator =
            Math.sqrt(n * sumX2 - sumX * sumX) *
            Math.sqrt(n * sumY2 - sumY * sumY);

          const R = numerator / denominator;
          console.log(R);

          if (R < 0) {
            setResult("Negative Correlation");
          } else {
            setResult("Positive Correlation");
          }
        },
      });
    } catch (error) {
      console.error("Error uploading file", error);
    }
  }

  function handleSubmit(e) {
    console.log(file)
    e.preventDefault();
    numericCorellation();
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className=" bg-blue-400 p-4 flex flex-col items-center">
        
        <label htmlFor="arffData" className="flex cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          Upload
          <input
            type="file"
            name="arffData"
            id="arffData"
            onChange={(e) => setFile(e.target.files[0])}
            className="cursor-pointer hidden"
          />
        </label>
        {
          <div>
            {file.name}
          </div>
        }
        <div className="flex justify-between w-full">
          <div>First Attibute</div>
          <div>Second Attibute</div>
        </div>
        <div className=""> 
          <input
            type="text"
            value={firstVal}
            onChange={(e) => setFirstVal(e.target.value)}
            className="m-2"
          />
          <input
            type="text"
            value={secondVal}
            onChange={(e) => setSecondVal(e.target.value)}
          />
        </div>
        <button type="submit"> Upload File</button>
      </form>

      {result && (
        <div>
          <h1>{result}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
