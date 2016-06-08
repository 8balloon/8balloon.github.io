export default function createAction(type) {

  return (payload) => {
    return {
      type: type,
      payload: payload
    }
  }
}
