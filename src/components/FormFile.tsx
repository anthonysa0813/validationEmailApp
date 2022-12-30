import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ObjectEmail } from "../interfaces";
import readXlsxFile, { Row } from "read-excel-file";
import { sendEmailArr, sendEmailWithAxios } from "../utils/apisFunctions";
import uploadFilesImage from "../assets/images/up.gif";
import checkFileImage from "../assets/images/check.gif";
import axios from "axios";
import FormColumns from "./FormColumns";

const FormFile = () => {
  const [isDesabled, setIsDesabled] = useState(true);
  const [valueFile, setValueFile] = useState<any>(null);
  const refInput = useRef<any>();
  const [isValidateFieldsFile, setIsValidateFieldsFile] = useState(true);
  const [statusDataSend, setStatusDataSend] = useState(false);
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

  const searchColumns = (rows: any) => {
    rows.forEach((item: any, index: number) => {
      if (String(item).toLowerCase() === firstColumnName) {
        console.log({ firstIndex: index });
        setFirstIndex(index);
        console.log({ firstIndex });
      }
    });

    rows.forEach((item: any, index: number) => {
      if (String(item).toLowerCase() === secondColumnName) {
        console.log({ secondIndex: index });

        setSecondIndex(index);
        console.log({ secondIndex });
      }
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (refInput.current) {
      readXlsxFile(refInput.current.files[0]).then((rows) => {
        // searchColumns(rows[0]);
        rows[0].forEach((item: any, index: number) => {
          if (String(item).toLowerCase() === firstColumnName) {
            console.log({ firstIndex: index });
            setFirstIndex(index);
            console.log({ firstIndex });
          }
        });

        rows.forEach((item: any, index: number) => {
          if (String(item).toLowerCase() === secondColumnName) {
            console.log({ secondIndex: index });

            setSecondIndex(index);
            console.log({ secondIndex });
          }
        });

        const copyNewArr = rows.slice(1, rows.length);
        const newArr = copyNewArr.map((item) => {
          console.log({ firstIndex, secondIndex });
          return {
            [firstColumnName]: item[firstIndex],
            [secondColumnName]: item[secondIndex],
          };
        });
        console.log(newArr);
      });
    } else {
      setIsValidateFieldsFile(false);
    }
  };
  // setStatusLoading(true);
  // sendEmailArr(newArr).then((res: any) => {
  //   setTimeout(() => {
  //     console.log(res);
  //     setStatusDataSend(res?.status);
  //     setStatusLoading(false);
  //   }, 3000);
  // });
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
      {!statusDataSend ? (
        <form
          className="flex flex-col items-center block gap-4"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-start gap-0 mt-3 text-center">
            <h1 className="text-lg text-3xl">Validación de correos</h1>
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
      ) : (
        <div className="flex flex-col items-center h-36">
          <h4>Se ha subido la data a la base de datos</h4>
          <div className="h-24">
            <img src={checkFileImage} alt="" className="h-24" />
          </div>
        </div>
      )}
    </>
  );
};

export default FormFile;
