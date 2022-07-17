export const success = (data, msg, status = 200) => {
  return {
    status: status,
    data,
    message: msg,
    error: false
  };
}


export const error = (msg, status = 500) => {
  return {
    status: status,
    data: null,
    message: msg,
    error: true
  };
}