

// Código de respuestas  HHTP desde el servidor
export enum eCodHhtp {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export enum eAccionHTTP {
  POST = 1,
  PUT = 2,
  DELETE = 3

}
