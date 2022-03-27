import Home from './Pages/Home.svelte'
import NotFound from './Pages/NotFound.svelte'
import Room from './Pages/Room.svelte'

const routes = {
  '/': Home,

  '/room': Room,

  // catchall
  '*': NotFound
}

export default routes
