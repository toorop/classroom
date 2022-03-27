import Home from './Pages/Home.svelte'
import NotFound from './Pages/NotFound.svelte'

const routes = {
  '/': Home,

  // catchall
  '*': NotFound
}

export default routes
