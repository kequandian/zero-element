
// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));

async function fetchList({ API, payload }) {
  console.log("fetchList to :", API, payload);
}

const effects = {
  fetchList,
};
export default effects;