export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
      /*
      add Decrement logic here
      */
    default:
      return state
  }
}
