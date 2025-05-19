import React, { useEffect, useState } from 'react'
import logo from '../assets/Clip_path_group.png'
import dropDownImg from '../assets/dropDown.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useFormik} from 'formik'
import { jobValidationSchema } from '../utils/jobValidationSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'


function NavBar() {
    const [openMenu,setOpenMenu] = useState(false)
    const [open,setOpen] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [dateDropDown,setDateDropDown] = useState(false)
    const query = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: (newPosting)=>{
            return axios.post(`${import.meta.env.VITE_API_URL}/jobs/add`,{
                title:newPosting.jobTitle,
                company:newPosting.companyName,
                location:newPosting.location,
                type:newPosting.jobType,
                salary:[newPosting.salaryMin,newPosting.salaryMax],
                deadline:newPosting.deadline,
                description:newPosting.description,
                image:'image%2077%20(1).png'
            })
        },
        onMutate:(value)=>{
            query.cancelQueries(['postings'])
            const prevData = query.getQueryData(['postings'])
            console.log(value)
            query.setQueryData(['postings'],(oldData)=>{
                return {...oldData, data:[...oldData.data, value]}
            })
            return prevData
        },
        onError:(err,value,context)=>{
            query.setQueryData(['postings'],context.prevData)
        },

    })
    function handleHome(){
        //query.invalidateQueries({queryKey:['postings']})

    }
    const formik = useFormik({
        initialValues:{
            jobTitle:'',
            companyName:'',
            location:'',
            jobType:'',
            salaryMin:undefined,
            salaryMax:undefined,
            deadline:'',
            description:''
        },
        
        validationSchema: jobValidationSchema,
        onSubmit:(values)=>{
            // values.description.replace(/(?:\r\n|\r|\n)/g, "\n")
            mutate(values)
            alert("Added successfully")
            setOpen(false)
        }
    })
    useEffect(() => {
        if (open) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
      }, [open]);
  return (
    <div className='flex justify-center text-[#303030] bg-white relative'>
        {/* sideMenu */}
        <div className='flex p-4 lg:hidden'>
            <div className='absolute left-2'>
                {openMenu ?
                    <button className='cursor-pointer' onClick={()=>setOpenMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                :
                <button className='cursor-pointer' onClick={()=>setOpenMenu(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                </button>
                
                }
               
            </div>
            <div className={`absolute ${openMenu? '-left-0': '-left-[100%]'} top-20 w-full h-screen z-10 bg-white transition-all`}>
                <div className='flex flex-col items-center gap-[10px] w-full'>
                <a href='/' className='px-6 py-2 cursor-pointer' onClick={handleHome}>Home</a>
                <span className='px-6 py-2'>Find Jobs</span>
                <span className='px-6 py-2'>Find Talents</span>
                <span className='px-6 py-2'>About Us</span>
                <span className='px-6 py-2'>Testimonials</span>
                </div>
                <div className='text-white text-center mt-10 text-nowrap'>
                    <button onClick={()=>setOpen(true)} className='cursor-pointer bg-linear-to-t from-[#6100AD] to-[#A128FF] rounded-[30px] px-6 py-2 '>Create Jobs</button>
                </div>
            </div>
            <div className='h-11 w-11'>
                <img src={logo} className=''/>
            </div>
        </div>

        {/* mainNav*/}
        <div className='hidden lg:flex text-[16px] mt-5 font-medium bg-white w-fit items-center justify-center border-[1px] border-[#FCFCFC] rounded-[122px] gap-6 py-2 px-4
            shadow-md'>
        <div className='h-11 w-11'>
            <img src={logo} className=''/>
        </div>
        <div className='flex gap-[10px]'>
            <a href='/' className='px-6 py-2 cursor-pointer' onClick={handleHome}>Home</a>
            <span className='px-6 py-2'>Find Jobs</span>
            <span className='px-6 py-2'>Find Talents</span>
            <span className='px-6 py-2'>About Us</span>
            <span className='px-6 py-2'>Testimonials</span>
        </div>
        <div className='text-white text-nowrap'>
            <button onClick={()=>setOpen(true)} className='cursor-pointer bg-linear-to-t from-[#6100AD] to-[#A128FF] rounded-[30px] px-6 py-2 '>Create Jobs</button>
        </div>
        </div>
        {open && (
            <div className='fixed z-20 inset-0 bg-[#00000080]/50 w-full h-full flex justify-center items-center'>
                <div className='w-full lg:w-[848px] bg-white rounded-[16px] flex flex-col px-10 py-8 max-h-[100vh] overflow-y-auto'>
                    <div>
                        <h1 className='text-[20px] lg:text-[24px] font-medium text-center'>Create Job Opening</h1>
                    </div>
                    <div className='flex gap-4 mt-15 flex-col lg:flex-row'>
                        <div className='flex flex-col gap-2'>
                        <div className='text-[20px] font-medium'><label>Job Title</label></div>
                        <input type='text' {...formik.getFieldProps('jobTitle')} placeholder='Full Stack developer, Web Dev' className='border-[1px] border-[#BCBCBC] w-full lg:w-[376px] h-[58px] rounded-[10px] px-3
                        focus:outline-none focus:border-[#222222] text-[18px] font-medium'/>
                        {formik.touched.jobTitle && formik.errors.jobTitle && <span className='text-xs text-red-500'>{formik.errors.jobTitle}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                        <div className='text-[20px] font-medium'><label>Company Name</label></div>
                        <input type='text' {...formik.getFieldProps('companyName')} placeholder='Amazon, Microsoft, Swiggy' className='border-[1px] border-[#BCBCBC] w-full lg:w-[376px] h-[58px] rounded-[10px] px-3
                        focus:outline-none focus:border-[#222222] text-[18px] font-medium'/>
                         {formik.touched.companyName && formik.errors.companyName && <span className='text-xs text-red-500'>{formik.errors.companyName}</span>}
                        </div>
                    </div>
                    <div className='flex gap-4 mt-4 flex-col lg:flex-row'>
                        <div className='flex flex-col gap-2'>
                        <div className='text-[20px] font-medium'><label>Location</label></div>
                        <input type='text' {...formik.getFieldProps('location')} placeholder='Choose Preferred Location' className='border-[1px] border-[#BCBCBC] w-full lg:w-[376px] h-[58px] rounded-[10px] px-3
                        focus:outline-none focus:border-[#222222] text-[18px] font-medium'/>
                         {formik.touched.location && formik.errors.location && <span className='text-xs text-red-500'>{formik.errors.location}</span>}
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                        <div className='text-[20px] font-medium'><label>Job Type</label></div>
                         <div className={`flex border-[1px] w-full lg:w-[376px] h-[58px] rounded-[10px] px-3
                         ${dropDown? 'border-[#222222]': 'border-[#BCBCBC]'}`}>
                            <button onClick={()=>setDropDown(!dropDown)} className='bg-white cursor-pointer flex justify-between items-center w-full'>
                            <span className=' text-[#686868]'>{formik.values.jobType || "Job Type"}</span>
                            <span className='pointer-events-none'>
                            <img src={dropDownImg} alt='' width='24px' height='24px'/>
                            </span>
                            </button>
                        </div>
                        {formik.touched.jobType && formik.errors.jobType && <span className='text-xs text-red-500'>{formik.errors.jobType}</span>}
                        {dropDown && (
                            <div className='absolute flex flex-col top-0 mt-25 z-10 w-full bg-white rounded-[10px] shadow-lg'>
                            <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                                formik.setFieldValue('jobType','Full-time')
                                setDropDown(false)
                            }}>Full-time</span>
                            <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                                 formik.setFieldValue('jobType','Part-time')
                                setDropDown(false)
                            }}>Part-time</span>
                            <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                                 formik.setFieldValue('jobType','Contract')
                                setDropDown(false)
                            }}>Contract</span>
                            <span className='p-4 transition-all hover:bg-[#F1F1F1] cursor-pointer' onClick={()=>{
                                 formik.setFieldValue('jobType','Internship')
                                setDropDown(false)
                            }}>Internship</span>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 mt-4 '>
                        <div className='flex flex-col gap-2'>
                        <div className='text-[20px] font-medium'><label>Salary Range</label></div>
                        <div className='flex gap-2'>
                            <div className='relative'>
                            <input type='text' {...formik.getFieldProps('salaryMin')} placeholder={`₹0`} className='border-[1px] border-[#BCBCBC] w-[183px] h-[58px] rounded-[10px] pl-10 pr-3
                            focus:outline-none focus:border-[#222222] text-[18px] font-medium'/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-5 left-3 text-[#686868]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                            {formik.touched.salaryMin && formik.errors.salaryMin && <span className='text-xs text-red-500'>{formik.errors.salaryMin}</span>}
                            </div>
                            <div className='relative'>
                            <input type='text' {...formik.getFieldProps('salaryMax')} placeholder={`₹12,00,000`} className='border-[1px] border-[#BCBCBC] w-[183px] h-[58px] rounded-[10px] pl-10 pr-3
                            focus:outline-none focus:border-[#222222] text-[18px] font-medium'/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-5 left-3 text-[#686868]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                            {formik.touched.salaryMax && formik.errors.salaryMax && <span className='text-xs text-red-500'>{formik.errors.salaryMax}</span>}
                            </div>
                        </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                        <div className='text-[20px] font-medium'><label>Application Deadline</label></div>
                            <div className={`flex border-[1px] w-full lg:w-[376px] h-[58px] rounded-[10px] px-3 relative
                            ${dropDown? 'border-[#222222]': 'border-[#BCBCBC]'}`}>
                                <button onClick={()=>setDateDropDown(!dateDropDown)} className={`w-full cursor-pointer flex ${formik.values.deadline? "justify-between":"justify-end"} items-center`}>
                                <span>{formik.values.deadline?formik.values.deadline.toLocaleDateString():""}</span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#686868]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                </span>
                                </button>
                                {dateDropDown && (
                               <div className="absolute z-10 mt-15 left-0 bg-white border rounded-md shadow-md p-1">
                               <DatePicker
                                selected={formik.values.deadline}
                                onChange={(date) => {
                                    formik.setFieldValue("deadline", date)
                                    setDateDropDown(false)
                                }
                                }
                                 inline
                               />
                                </div>
                                )}
                            </div>
                            {formik.touched.deadline && formik.errors.deadline && <span className='text-xs text-red-500'>{formik.errors.deadline}</span>}
                        </div>
                    </div>
                    <div>
                    <div className='flex gap-4 mt-4'>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='text-[20px] font-medium'><label>Job Description</label></div>
                            <textarea {...formik.getFieldProps('description')} placeholder='Please share a description to let the candidate know more about the job role' className='p-4 border-[1px] border-[#BCBCBC] rounded-[10px] w-full h-[169px]
                            focus:outline-none focus:border-[#222222]'/>
                            </div>
                        </div>
                        {formik.touched.description && formik.errors.description && <span className='text-xs text-red-500'>{formik.errors.description}</span>}
                    </div>
                    <div className='flex justify-between mt-10 text-[16px] md:text-[20px] font-medium'>
                        <div>
                        <button onClick={()=>setOpen(false)} className='cursor-pointer w-[150px] md:w-[232px] h-[59px] border-[1.5px] border-[#222222] rounded-[10px] flex gap-2 justify-center items-center'>
                               <span>Save Draft</span> 
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                                </svg>

                            </button>
                        </div>
                        <div>
                            <button onClick={()=>formik.handleSubmit()} type='submit' className='cursor-pointer w-[150px] md:w-[232px] h-[59px] bg-[#00AAFF] rounded-[10px] flex gap-2 justify-center items-center text-white'>
                               <span>Publish</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        )}
    </div>
  )
}

export default NavBar