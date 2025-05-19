import React from 'react'
import Card from './Card'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function CompanyList() {
    const {data}= useQuery({
        queryKey:['postings'],
        queryFn:()=>{
            return axios.get(`${import.meta.env.VITE_API_URL}/jobs/postings`)
        }
    })
  return (
    <div className='mt-[50px] mx-[64px] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center'>
        {data?.data.map(item=>(
             <div key={item._id} className='flex-[0_1_calc(25%-8px)] min-w-[290px] max-w-[316px]'>
             <Card details={item}/>
         </div>
        ))}
        {/* <div className='flex-[0_1_calc(25%-8px)] min-w-[290px] max-w-[316px]'>
            <Card/>
        </div>
        <div className='flex-[0_1_calc(25%-8px)] min-w-[290px] max-w-[316px]'>
            <Card/>
        </div>
        <div className='flex-[0_1_calc(25%-8px)] min-w-[290px] max-w-[316px]'>
            <Card/>
        </div>
        <div className='flex-[0_1_calc(25%-8px)] min-w-[290px] max-w-[316px]'>
            <Card/>
        </div>
        <div className='flex-[0_1_calc(25%-8px)] min-w-[290px] max-w-[316px]'>
            <Card/>
        </div>
        <div className='flex-[0_1_calc(25%-8px)] min-w-[290px] max-w-[316px]'>
            <Card/>
        </div> */}
    </div>
  )
}

export default CompanyList