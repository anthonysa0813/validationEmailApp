import React, { FormEvent, useEffect, useRef, useState } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import { sendEmailArr } from "../utils/apisFunctions";
import uploadFilesImage from "../assets/images/up.gif";
import checkFileImage from "../assets/images/check.gif";
import errorFileImage from "../assets/images/error.gif";

import FormColumns from "./FormColumns";

const FormFile = () => {
  const [isDesabled, setIsDesabled] = useState(true);
  const [valueFile, setValueFile] = useState<any>(null);
  const refInput = useRef<any>();
  const [isValidateFieldsFile, setIsValidateFieldsFile] = useState(true);
  const [statusDataSend, setStatusDataSend] = useState(false);
  const [statusNumber, setStatusNumber] = useState(0);
  const [statusLoading, setStatusLoading] = useState(false);
  const [formColumns, setFormColumns] = useState(false);
  const [formNamesColumns, setFormNamesColumns] = useState({
    firstColumnName: "",
    secondColumnName: "",
  });
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);

  const [columnIndex, setColumnIndex] = useState({
    firstColumnIndex: 0,
    secondColumnIndex: 0,
  });
  const { firstColumnIndex, secondColumnIndex } = columnIndex;
  const { firstColumnName, secondColumnName } = formNamesColumns;

  useEffect(() => {
    if (firstColumnName && secondColumnName) {
      setIsDesabled(false);
    }
  }, [firstColumnName, secondColumnName]);

  useEffect(() => {
    if (valueFile) {
      const nameExtension = valueFile.split(".")[1];
      console.log(nameExtension);
      if (nameExtension !== "xlsx") {
        setIsDesabled(true);
      } else {
        setFormColumns(true);
        // setIsDesabled(false);
      }
    }
  }, [valueFile]);

  const hancleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormNamesColumns({
      ...formNamesColumns,
      [e.target.name]: e.target.value,
    });
  };

  const searchColumns = (rows: any, column: string) => {
    const oneIndex = rows.map((item: any, index: number) => {
      if (String(item).toLowerCase() === column) {
        // console.log({ firstIndex: index });
        // setFirstIndex(index);
        return index;
      } else {
        return "";
      }
    });
    const arrFilter = oneIndex.filter((item: number | string) => item !== "");
    return arrFilter[0];
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    readXlsxFile(refInput.current.files[0]).then((rows) => {
      const firstCol = searchColumns(rows[0], firstColumnName);
      const secondtCol = searchColumns(rows[0], secondColumnName);

      console.log({ rows });
      const objectData = rows.map((item, index) => {
        if (index > 0) {
          return {
            [firstColumnName]: item[firstCol],
            [secondColumnName]: item[secondtCol],
          };
        }
      });
      const copyArr = objectData.slice(1, rows.length);
      console.log("objectData", copyArr);
      setStatusLoading(true);
      sendEmailArr(copyArr, firstColumnName, secondColumnName).then(
        (res: any) => {
          setStatusDataSend(res?.status);
          setStatusLoading(false);
          setStatusNumber(res?.status);
        }
      );
    });
  };

  return (
    <>
      {statusLoading && (
        <div className="flex flex-col items-center p-4">
          <h1 className="text-3xl text-center">Subiendo la data....</h1>
          <div className="flex justify-center">
            <img src={uploadFilesImage} alt="" className="h-24" />
          </div>
        </div>
      )}
      {!statusDataSend && (
        <form
          className="flex flex-col items-center block gap-4"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-start gap-0 mt-3 text-center">
            <div className="flex justify-center  w-full my-4">
              <h1 className="text-3xl text-indigo-600 text-3xl">
                Validación de correos
              </h1>
            </div>
            {!isValidateFieldsFile && (
              <h2 className="text-red-700">
                Campos requeridos ({firstColumnName} - {secondColumnName})
              </h2>
            )}
            <span className="text-red-600">
              Sube un archivo en formato: xlsx
            </span>
            <input
              ref={refInput}
              type="file"
              className="w-full p-1 m-0 mt-0 mt-3 bg-blue-500 rounded-md file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:border-none file:text-white file:cursor-pointer file:shadow-sm file:shadow-bluw-600/50 lg:w-auto text-white/80 "
              onChange={(e) => {
                console.log(e);
                setValueFile(e.target.value);
              }}
            />
          </div>
          {formColumns && (
            <FormColumns
              onChange={hancleChange}
              formNamesColumns={formNamesColumns}
            />
          )}
          <button
            type="submit"
            className={`text-white p-2 rounded-md  ${
              isDesabled ? "bg-gray-400 " : "bg-green-500"
            }`}
            disabled={isDesabled}
          >
            Validar
          </button>
        </form>
      )}
      {statusNumber >= 200 && statusNumber <= 300 && (
        <div className="flex justify-center flex-col">
          <h3 className="text-3xl text-indigo-600">La data se ha subido</h3>
          <div className="text-center flex justify-center">
            <img src={checkFileImage} alt="" className="h-24" />
          </div>
        </div>
      )}

      {statusNumber >= 400 && (
        <div className="flex justify-center flex-col">
          <h3 className="text-3xl text-indigo-600">
            Hubo un error en el envio de la información
          </h3>
          <div className="text-center  flex justify-center">
            <img src={errorFileImage} alt="" className="h-24" />
          </div>
        </div>
      )}
    </>
  );
};

export default FormFile;
