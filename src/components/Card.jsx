import React from 'react'
import experienceLogo from '../assets/experienceLogo.png'
import buildingLogo from '../assets/buildingLogo.png'
import salaryLogo from '../assets/salaryLogo.png'
import {format,register} from 'timeago.js'
import IKImage from './IKImage'

function Card({details}) {
    const customLocale = (number, index,) => {
        return [
            ["just now", "in a moment"],
            ["%ss Ago", "in %s seconds"],
            ["1m Ago", "in 1 minute"],
            ["%sm Ago", "in %s minutes"],
            ["1h Ago", "in 1 hour"],
            ["%sh Ago", "in %s hours"],
            ["1d Ago", "in 1 day"],
            ["%sd Ago", "in %s days"],
            ["1w Ago", "in 1 week"],
            ["%sw Ago", "in %s weeks"],
            ["1 month Ago", "in 1 month"],
            ["%s months Ago", "in %s months"],
            ["1 year Ago", "in 1 year"],
            ["%s years Ago", "in %s years"],
        ][index];
      };
    register("custom-en", customLocale);
    const desc = details?.description.split("\n")
  return (
    <div className='flex gap-5 h-[388px] flex-col rounded-[12px] bg-white shadow-xs py-4 px-4'>
        <div className='flex justify-between'>
            <div className='h-[82px] w-[82px] bg-linear-to-t from-[#F1F1F1] to-[#FEFEFD] rounded-[13px] flex justify-center items-center
            border-[1px] border-white shadow-md'>
            <IKImage src={details?.image} className={'w-[65px] h-[65px]'}/>
            </div>
        <div className='text-center mt-[2px]'>
        <span className='bg-[#B0D9FF] py-[6px] px-[10px] rounded-[10px] text-[14px]'>{format(details?.createdAt,'custom-en')}</span>
        </div>
        </div>
        <div className=''>
            <span className='text-[20px] font-semibold'>{details?.title}</span>
        </div>
        <div className='flex text-[#5A5A5A] text-[16px] gap-4'>
            <div className='flex items-center gap-1'>
                <div className='w-[18px]'>
                    <img src={experienceLogo} alt=''/>
                </div>
                <span className='text-nowrap'>1-3 yr Exp</span></div>
            <div className='flex items-center gap-1'>
                <div className='w-[18px]'>
                    <img src={buildingLogo} alt=''/>
                </div>
                <span>Onsite</span></div>
            <div className='flex items-center gap-1'>
                <div className='w-[18px]'>
                    <img src={salaryLogo} alt=''/>
                </div>
                <span className='text-nowrap'>{details?.salary? details.salary[1]/100000 : 12} LPA</span></div>
        </div>
        <div className='text-[#555555] font-normal text-[14px]'>
            <ul className='list-disc pl-5'>
                {desc && desc.map(item=>(
                    <li>{item}</li>
                ))}
            </ul>
        </div>
        <div className='text-center text-white'>
            <button className='bg-[#00AAFF] rounded-[10px] py-4 px-[10px] w-full cursor-pointer'>Apply Now</button>
        </div>
    </div>
  )
}

export default Card