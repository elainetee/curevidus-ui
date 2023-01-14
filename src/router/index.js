import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory} from 'vue-router'
import routes from './routes'
import EchoLibrary from 'laravel-echo';
import { Cookies } from "quasar";


window.Pusher = require('pusher-js');

window.Echo = new EchoLibrary({
    authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
    broadcaster: 'pusher',
    key: process.env.PUSHER_APP_KEY,
    cluster: process.env.PUSHER_APP_CLUSTER,
    forceTLS: true,
    // wsHost : '127.0.0.1',
    // wsPort : 8000,
    auth: {
      headers: {
        Authorization: "Bearer" + Cookies.get("token")
      }
    }
});

window.Echo.connector.pusher.connection.bind("connecting", (payload) => {
  /**
   * All dependencies have been loaded and Channels is trying to connect.
   * The connection will also enter this state when it is trying to reconnect after a connection failure.
   */

  console.log("connecting...");
});

window.Echo.connector.pusher.connection.bind("connected", (payload) => {
  /**
   * The connection to Channels is open and authenticated with your app.
   */

  console.log("connected!", payload);
});

window.Echo.connector.pusher.connection.bind("unavailable", (payload) => {
  /**
   *  The connection is temporarily unavailable. In most cases this means that there is no internet connection.
   *  It could also mean that Channels is down, or some intermediary is blocking the connection. In this state,
   *  pusher-js will automatically retry the connection every 15 seconds.
   */

  console.log("unavailable", payload);
});

window.Echo.connector.pusher.connection.bind("failed", (payload) => {
  /**
   * Channels is not supported by the browser.
   * This implies that WebSockets are not natively available and an HTTP-based transport could not be found.
   */

  console.log("failed", payload);
});

window.Echo.connector.pusher.connection.bind(
  "disconnected",
  (payload) => {
    /**
     * The Channels connection was previously connected and has now intentionally been closed
     */

    console.log("disconnected", payload);
  }
);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    // : createWebHistory()
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
    // history: createWebHistory(),
  })

  return Router
})
