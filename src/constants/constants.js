// export const apiUrl = "http://localhost:5000/xwaitsolution/us-central1/api";
// // export const apiUrl = `https://us-central1-xwaitsolution.cloudfunctions.net/api`;
// console.log(process.env.NODE_ENV);
export const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/xwaitsolution/us-central1/api"
    : "https://us-central1-xwaitsolution.cloudfunctions.net/api";
