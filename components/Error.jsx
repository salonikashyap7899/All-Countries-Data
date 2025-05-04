import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Something() {
    const error  = useRouteError()
    console.log(error);
    
  return (
    <div >Something went Wrong 404 not found{error.status}</div>
  )
}
