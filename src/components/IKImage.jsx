import React from 'react'
import {Image} from '@imagekit/react'

function IKImage({src,className,alt,w,h}) {
  if(!src) return
  return (
        <Image urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} src={src} className={className} alt={alt} width={w} height={h}
   loading="lazy"
   lqip={{active:true,quality:20}}
   transformation={[
       {
           width:w,
           height:h
       }
   ]
   }
   />
  )
}

export default IKImage