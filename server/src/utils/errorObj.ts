interface IError {
  field: string;
  message: string;
}
interface IDataError {
  errors: IError[];
}
export const errorObj = ({ errors }: IDataError) => {
  return {
    success: false,
    errors,
  };
};
