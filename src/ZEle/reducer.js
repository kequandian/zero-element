
export default function reducer(state, { type, payload }) {
  const method = {
    extra() {
      return {
        ...state,
        extra: payload,
      }
    },
    defaults() {
      console.warn(`未定义的方法: ${type}`);
      return state;
    }
  };
  return (method[type] || method['defaults'])();
}