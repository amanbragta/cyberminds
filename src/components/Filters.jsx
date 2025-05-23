import React, { useEffect, useState } from 'react'
import seachIcon from '../assets/searchVector.png'
import locationIcon from '../assets/locationVector.png'
import dropDown from '../assets/dropDown.png'
import jobVector from '../assets/jobVector.png'
import {Range} from 'react-range'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { getPostings } from '../../store/postingSlice.js'

function Filters() {
    const [values,setValues] = useState([0,100])
    const [jobTitle,setJobTitle] = useState('')
    const [location,setLocation] = useState('')
    const [open,setOpen] = useState(false)
    const [openLocation,setOpenLocation] = useState(false)
    const [selected,setSelected] = useState(null)
    const query = useQueryClient()
    const {postings} = useSelector(state=>state.posting)
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getPostings())
    },[])

    const data = query.getQueryData(['postings'])
    const salArr = postings.map(item=>item.salary).flat().map(element=>parseInt(element)/12/1000)
    const locationArr = data?.data.map(item=>item.location)
    const locationOBj = {}
    if(locationArr){
      for(const location of locationArr){
        if(locationOBj[location]) continue
        locationOBj[location] = 1
      }
    }
    
   

    function handleJobFilter(e){
      if(e.key==="Enter"){
        const regex = new RegExp(jobTitle,'i')
        const newData = data.data.filter(item=> regex.test(item.title))
        query.setQueryData(['postings'],(oldData)=>{
          return {...oldData, data:newData}
        })
      }
    }

    function handleLocationFilter(location){
        const newData = data.data.filter(item=>item.location==location)
        query.setQueryData(['postings'],(oldData)=>{
          return {...oldData,data:newData}
        })
        setLocation(location)
        setOpenLocation(false)
    }

    function handleJobType(type){
      // const regex = new RegExp(selected,'i')
      // const newData = data.data.filter(item=>regex.test(item.type))
      const newData = postings.filter(item=>item.type===type)
      query.setQueryData(['postings'],(oldData)=>{
        return {...oldData,data:newData}
      })
      setSelected(type)
      setOpen(false)
    }
    function handleSlider(){
      const newData = postings.filter(item=> item.salary[0]/1000/12>=values[0] && Math.floor(item.salary[1]/1000/12)<=values[1])
      query.setQueryData(['postings'],(oldData)=>{
        return {...oldData,data:newData}
      })
    }
  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 w-full lg:gap-0 lg:flex lg:flex-row px-10 lg:px-4 lg:justify-evenly text-[#686868] py-6 text-[16px] bg-white'>
        <div className='flex items-center justify-center gap-7'>
            <div>
            <img src={seachIcon} alt='' width='18px' height='18px'/>
            </div>
            <span className='w-[200px]'><input type='text' onKeyDown={handleJobFilter} value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} placeholder='Search By Job Title, Role' className='bg-transparent outline-none w-full'/></span>
        </div>
        <span className='text-[48px] text-[#EAEAEA] font-extralight hidden lg:block'>|</span>
        <div className='flex items-center lg:gap-7 justify-center relative'>
            <div>
            <img src={locationIcon} alt='' width='18px' height='18px'/>
            </div>
            <div className='flex w-[233px]'>
              <button onClick={()=>setOpenLocation(!openLocation)} className={`bg-white w-full cursor-pointer`} >
                <span className='pr-20 text-[#686868]'>{location || "Preferred Location"}</span>
                <span className='absolute lg:right-0'>
                <img src={dropDown} alt='' width='24px' height='24px'/>
                </span>
              </button>
            </div>
            {openLocation && (
                <div className='absolute flex flex-col top-0 z-10 mt-8 lg:mt-16 w-full bg-white rounded-md shadow-md'>
                  {Object.keys(locationOBj).map(item=>(
                    <span key={item} className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                      handleLocationFilter(item)
                    }}>{item}</span>
                  ))}
                  </div>
              )}
        </div>
        <span className='text-[48px] text-[#EAEAEA] font-extralight hidden lg:block'>|</span>
        <div className='flex items-center lg:gap-7 justify-center relative'>
            <div>
            <img src={jobVector} alt='' width='18px' height='18px'/>
            </div>
            <div className='flex w-[200px]'>
              <button onClick={()=>setOpen(!open)} className='bg-white w-full lg:w-[142px] cursor-pointer' >
                <span className='pr-4 lg:pr-18 text-[#686868]'>{selected || "Job Type"}</span>
                <span className='absolute lg:right-0'>
                <img src={dropDown} alt='' width='24px' height='24px'/>
                </span>
              </button>
            </div>
            {open && (
                <div className='absolute flex flex-col top-0 z-10 mt-8 lg:mt-16 w-full bg-white rounded-md shadow-md'>
                  <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                    handleJobType('Full-time')
                  }}>Full-time</span>
                  <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                    handleJobType('Part-time')
                  }}>Part-time</span>
                  <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                    handleJobType('Contract')
                  }}>Contract</span>
                  <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                    handleJobType('Internship')
                  }}>Internship</span>
                  </div>
              )}
        </div>
        <span className='text-[48px] text-[#EAEAEA] font-extralight hidden lg:block'>|</span>
        <div className='flex flex-col items-center justify-between lg:w-[300px]'>
            <div className='flex gap-16 lg:justify-between text-[#222222] font-medium'>
            <span>Salary per month </span>
            <span>₹{values[0]}k - ₹{values[1]}k</span>
            </div>
            {postings && (
                <Range
                step={1}
                min={0}
                max={Math.floor(Math.max(...salArr, ...values, 100))}
                values={values}
                onFinalChange={handleSlider}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => {
                    const { _key, ...restProps } = props;
                    return (
                        <div
                          {...restProps}
                          className="w-64 h-[2px] bg-[#CCC2C2] rounded-full relative mt-5"
                        >
                          <div
                            className="absolute h-[2px] bg-[#222222] rounded-full"
                            style={{
                              left: `${((values[0]) / Math.max(...salArr, ...values,100) ) * 100}%`,
                              width: `${((values[1] - values[0]) / Math.max(...salArr,...values,100)) * 100}%`,
                            }}
                          />
                         {children}
                        </div>
                      );
                    }}
                renderThumb={({ props,index }) => {
                    const { _key, ...restProps } = props;
                    return (
                  <div
                    {...restProps}
                    key={`thumb-${index}`}
                    className="w-4 h-4 bg-[#222222] rounded-full flex justify-center items-center"
                  >
                    <div className="bg-white w-[5px] h-[5px] rounded-full">
                        
                    </div>
                  </div>
                )}
            }
              />
            )}
        
        </div>
    </div>
  )
}

export default Filters