import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CoursesCard from '../CoursesCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="loader" color="##4656a1" width={50} height={50} />
    </div>
  )

  OnRetryButton = () => {
    this.getCoursesData()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.OnRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <div className="success-main">
        <div className="success-container">
          <h1 className="success-heading">Courses</h1>
          <ul className="success-list">
            {coursesList.map(eachCourse => (
              <CoursesCard key={eachCourse.id} courseDetails={eachCourse} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderCoursesAllData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCoursesAllData()}
      </>
    )
  }
}

export default HomeRoute
