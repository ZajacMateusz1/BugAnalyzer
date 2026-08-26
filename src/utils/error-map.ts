import HttpError from "../errors/HttpError.js";
const mapToHttpError = (error: unknown): HttpError => {
  if (error instanceof HttpError) {
    return error;
  }
  return new HttpError("Internal Server Error", 500);
};

export default mapToHttpError;
