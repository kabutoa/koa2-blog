export function getResponse(res) {
  const initialResponse = {
    status: 'success',
    msg: '',
    data: {}
  }
  return {
    ...initialResponse,
    ...res
  }
}
