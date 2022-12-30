import Cell from "read-excel-file";
export interface ObjectEmail {
  correo: typeof Cell | string;
  lote: typeof Cell | string;
}

export interface SaveEmailInterface {
  correo?: string | "";
  lote?: string | "";
}
