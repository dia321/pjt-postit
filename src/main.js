import './main.css';
import { initialRoutes, historyRouterPush, hashRouterPush } from './js/router';
import { memoInit } from './js/memo';

//router
const historyAppDiv = document.querySelector('#history-app');
const hashAppDiv = document.querySelector('#hash-app');
initialRoutes('history', historyAppDiv);
if (window.location.pathname === '/memo') {
  memoInit();
}
// initialRoutes("hash", hashAppDiv);

window.onload = () => {
  const historyLinker = document.querySelectorAll('span.history');
  const hashLinker = document.querySelector('a.hash');
  console.log(historyLinker);
  historyLinker.forEach((el) => {
    el.addEventListener('click', (evt) => {
      const pathName = evt.target.getAttribute('route');

      historyRouterPush(pathName, historyAppDiv);
    });
  });

  // hashLinker.forEach((el) => {
  //   el.addEventListener("click", (evt) => {
  //     const pathName = evt.target.getAttribute("route");

  //     hashRouterPush(pathName, hashAppDiv);
  //   });
  // });

  let previousUrl = '';

  const observer = new MutationObserver(() => {
    console.log(window.location.pathname);
    if (window.location.pathname !== previousUrl) {
      if (window.location.pathname === '/memo') {
        memoInit();
      }
      console.log(`URL changed from ${previousUrl} to ${window.location.pathname}`);
      previousUrl = window.location.pathname;
      // do your thing
    }
  });
  const config = { subtree: true, childList: true };
  // start observing change
  observer.observe(document, config);
};
