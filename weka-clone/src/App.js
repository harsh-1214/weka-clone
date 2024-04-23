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
    e.preventDefault();
    numericCorellation();
  }

  return (
    <div style={{ textAlign: "center", margin: "100px" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="arffData"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          value={firstVal}
          onChange={(e) => setFirstVal(e.target.value)}
        />
        <input
          type="text"
          value={secondVal}
          onChange={(e) => setSecondVal(e.target.value)}
        />
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
