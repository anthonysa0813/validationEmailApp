import React from "react";
import FormFile from "./components/FormFile";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen main bg-slate-900">
      <section className="w-2/6 p-4 text-center bg-white border border-blue-500 rounded-lg main">
        <FormFile />
      </section>
    </div>
  );
};

export default App;
