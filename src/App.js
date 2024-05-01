import {Switch, Route, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import CourseItemDetailsRoute from './components/CourseItemDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/courses/:id" component={CourseItemDetailsRoute} />
      <Route exact path="/not-found" component={NotFoundRoute} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
