interface IError {
  field: string;
  message: string;
}

interface IData {
  success?: boolean;
  data?: Object | null;
  errors?: IError[];
}

export const returnObj = ({ success = true, data = null, errors }: IData) => {
  return {
    success: !errors,
    data,
    errors,
  };
};
