
export default function reducer(state, { type, payload }) {
  const method = {
    extraNode() {
      return {
        ...state,
        extra: payload,
      }
    },
    extraState() {
      return {
        ...state,
        extraState: payload,
      }
    },
    defaults() {
      console.warn(`未定义的方法: ${type}`);
      return state;
    }
  };
  return (method[type] || method['defaults'])();
}