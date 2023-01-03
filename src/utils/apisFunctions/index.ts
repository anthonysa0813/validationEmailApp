import axios from "axios";

export const sendEmailArr = async (
  data: any,
  firstCol: string,
  secondCol: string
) => {
  console.log("data", data);
  const response = await fetch(`http://localhost:3000/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data, firstCol, secondCol }),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const sendEmailWithAxios = async (data: any) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:5051/api/",
    data: data,
  });
  console.log("response", response);
};
