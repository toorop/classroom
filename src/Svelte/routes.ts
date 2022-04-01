import Home from './Pages/Home.svelte'
import Courses from './Pages/Courses.svelte'
import Course from './Pages/Course.svelte'
import NotFound from './Pages/NotFound.svelte'

const routes = {
  '/': Home,

  '/courses': Courses,

  '/course/:name/:id': Course,

  // catchall
  '*': NotFound
}

export default routes
