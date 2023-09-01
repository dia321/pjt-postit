import homeTemplate from "../pages/routeHome.html";
import memo from "../pages/memo.html";
import "../css/router.css";

// const routeHome = homeTemplate();

const routes = {
  "/": null,
  "/memo": memo,
  "/routeHome": homeTemplate,
};

//entry point
const initialRoutes = (mode, el) => {
  // renderHTML(el, routes["/"]);
  if (mode === "history") {
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname]);
  } else {
    window.addEventListener("hashchange", () => renderHTML(el, getHashRoute()));
  }
};
// set hash history
const hashRouterPush = (pathName, el) => {
  renderHTML(el, getHashRoute());
};
// render
const renderHTML = (el, route) => {
  console.log(el, route);
  el.innerHTML = route;
};

// set browser history
const historyRouterPush = (pathName, el) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(el, routes[pathName]);
};

// get hash history route
const getHashRoute = () => {
  let route = "/";

  Object.keys(routes).forEach((hashRoute) => {
    if (window.location.hash.replace("#", "") === hashRoute.replace("/", "")) {
      route = routes[hashRoute];
    }
  });

  return route;
};

// module.exports = {
//   initialRoutes,
//   historyRouterPush,
//   hashRouterPush,
// };

export { initialRoutes, historyRouterPush, hashRouterPush };
