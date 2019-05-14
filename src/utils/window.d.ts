
/** 
 * 安全地访问 window 对象，将来 SSR 也不报错(大概吧)
 * - 第一次使用时会自动注册 window.ZEle = {}
 */
declare namespace window {}

export default window;