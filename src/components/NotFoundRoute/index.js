import Header from '../Header'

import './index.css'

const NotFoundRoute = () => (
  <>
    <Header />
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="failure-img"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found.</p>
    </div>
  </>
)

export default NotFoundRoute
