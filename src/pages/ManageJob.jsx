import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ManageJob = () => {
  const navigate = useNavigate()
  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-center'>Applications</th>
              <th className='py-2 px-4 text-center'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className='text-gray-700 border-b'>
                <td className='py-2 px-4 text-center'>{index + 1}</td>
                <td className='py-2 px-4'>{job.title}</td>
                <td className='py-2 px-4 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 text-center'>{job.applicants}</td>
                <td className='py-2 px-4 text-center'>
                  <input className='scale-125 cursor-pointer' type="checkbox" checked={job.visible} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
        <button onClick={() => navigate('/dashboard/add-job')} className='bg-black text-white  py-2 px-4 rounded'>Add-job</button>
      </div>
      </div>
    </div>
  )
}

export default ManageJob