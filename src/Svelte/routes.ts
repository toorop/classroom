import Home from './Pages/Home.svelte'
import Courses from './Pages/Courses.svelte'
import Room from './Pages/Room.svelte'
import NotFound from './Pages/NotFound.svelte'

const routes = {
  '/': Home,

  '/courses': Courses,

  '/room': Room,

  // catchall
  '*': NotFound
}

export default routes
