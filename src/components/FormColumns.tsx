import React from "react";

interface Prop {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formNamesColumns: {
    firstColumnName: string;
    secondColumnName: string;
  };
}

const FormColumns = ({ onChange, formNamesColumns }: Prop) => {
  const { firstColumnName, secondColumnName } = formNamesColumns;
  return (
    <div className="">
      <div className="flex justify-between items-center  gap-2">
        <span>Nombre de la primera columna: </span>
        <input
          className="border border-2  border-indigo-600 rounded-lg px-1"
          name="firstColumnName"
          type="text"
          onChange={onChange}
          value={firstColumnName}
        />
      </div>
      <div className=" flex justify-between items-center gap-2">
        <span>Nombre de la segunda columna: </span>
        <input
          className="border border-2  border-indigo-600 rounded-lg px-1"
          name="secondColumnName"
          type="text"
          onChange={onChange}
          value={secondColumnName}
        />
      </div>
    </div>
  );
};

export default FormColumns;
