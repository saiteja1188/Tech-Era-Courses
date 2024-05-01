import {Link} from 'react-router-dom'

import './index.css'

const CoursesCard = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <li className="card-list-item">
      <Link to={`/courses/${id}`} className="nav-link">
        <img src={logoUrl} alt={name} className="card-img" />
        <p className="card-name">{name}</p>
      </Link>
    </li>
  )
}

export default CoursesCard
