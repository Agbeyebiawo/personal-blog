import { Link } from 'react-router-dom'

const Post = ({post}) => {
  const {id,title,summary,cover,author,createdAt} = post
  
  return (
    <Link to={`/post/${id}`}>
      <div className='card max-w-sm w-full border rounded-lg shadow-md lg:max-w-full lg:flex gap-3 mb-5'>
          <div className="image">
              <img className='rounded-l-lg' src={cover} alt="" />
          </div>
          <div className="card-left">
              <p className="author mt-4 text-sm text-gray-600 font-semibold">{author.name}</p>
              <h3 className="title mt-8 text-gray-900 font-bold text-xl mb-2">{title}</h3>
              <p className="content mt-4 text-gray-700 text-base">{summary}</p>
              <p className="date mt-12 text-sm">
                  <p className='text-gray-600'>{new Date(createdAt).toDateString()}</p>
              </p>
          </div>
      </div>
    </Link>
  )
}

export default Post