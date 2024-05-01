import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetailsRoute extends Component {
  state = {
    courseData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseItemsData()
  }

  getCourseItemsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
      this.setState({
        courseData: updatedData,
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
    this.getCourseItemsData()
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

  renderCourseSuccessView = () => {
    const {courseData} = this.state
    const {imageUrl, name, description} = courseData
    return (
      <div className="course-success">
        <img src={imageUrl} alt={name} className="course-img" />
        <div className="content">
          <h1 className="name">{name}</h1>
          <p className="desc">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseSuccessView()
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
        <div className="main-container">{this.renderCourseDetails()}</div>
      </>
    )
  }
}

export default CourseItemDetailsRoute
