import React from 'react'

export default function Book({title, author, genre, year}) {
  return (
    <div className='flex'>
        <div className=' w-24'>{title}</div>
        <div className=' w-24'>{author}</div>
        <div className=' w-24'>{genre}</div>
        <div className=' w-24'>{year}</div>
    </div>
  )
}
