import "./main.css";
import { initialRoutes, historyRouterPush, hashRouterPush } from "./js/router";

//router
const historyAppDiv = document.querySelector("#history-app");
const hashAppDiv = document.querySelector("#hash-app");

initialRoutes("history", historyAppDiv);
// initialRoutes("hash", hashAppDiv);

window.onload = () => {
  const historyLinker = document.querySelectorAll("span.history");
  const hashLinker = document.querySelector("a.hash");
  console.log(historyLinker);
  historyLinker.forEach((el) => {
    el.addEventListener("click", (evt) => {
      const pathName = evt.target.getAttribute("route");

      historyRouterPush(pathName, historyAppDiv);
    });
  });

  // hashLinker.forEach((el) => {
  //   el.addEventListener("click", (evt) => {
  //     const pathName = evt.target.getAttribute("route");

  //     hashRouterPush(pathName, hashAppDiv);
  //   });
  // });
};
