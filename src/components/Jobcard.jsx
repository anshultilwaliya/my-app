import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'


const Jobcard = ({ job }) => {

  const navigate = useNavigate()
  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={job.companyId.image} alt="" />
      </div>
      <h4 className='flex items-center font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex gap-3 items-center text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5'>{job.location}</span>
        <span className='bg-red-100 text-red-800 px-4 py-1.5'>{job.level}</span>
      </div>
      <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + "..." }} />
      <div className='mt-4 flex gap-4 text-sm'>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className='bg-blue-600 text-white px-4 py-2 rounded'>Apply Now</button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className='text-gray-500 border border-gray-500 rounded px-4 py-2'>Learn More</button>
      </div>
    </div>
  )
}

export default Jobcard
