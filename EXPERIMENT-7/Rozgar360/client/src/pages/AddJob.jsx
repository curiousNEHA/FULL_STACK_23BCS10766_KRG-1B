import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
const AddJob = () => {
  const [title,setTitle] = useState('')
  const [location,setLocation] = useState('')
  const [category,setCategory] = useState('')
  const [level,setLevel] = useState('')
  const [salary,setSalary] = useState('')
const editorRef = React.useRef(null);
const quillRef = React.useRef(null);
useEffect(() => {
if(!quillRef.current && editorRef.current){
  quillRef.current = new quill(editorRef.current, {
    theme: 'snow',

})}},[]);

  return (
    <form className='container p-4 flex flex-col w-full items-start gap-3'>
 <div className='w-full'>
    <p className='mb-2'>Job Title</p>
    <input type = "text" placeholder='Type here' onChange={e => setTitle(e.target.value)} value={title} 
    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
    required/>
    </div>
<div className='w-full max-w-lg'>
  <p className='my-2'>Job Description</p>
  <div ref = {editorRef}>

  </div>
</div>


<div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
  <div>
<p className='mb-2'>Job Category</p>
<select className = "w-full px-3 py-2 border-2 border-gray-300 rounded" onChange =  {e=>setCategory(e.target.value)} value={category} required>
{
JobCategories.map((category,index)=>(
  <option key = {index} value = {category}>{category}</option>
))


}
</select>
  </div>


 <div>
<p className='mb-2'>Job Location</p>
<select className = "w-full px-3 py-2 border-2 border-gray-300 rounded" onChange =  {e=>setLocation(e.target.value)} value={category} required>
{
JobLocations.map((location,index)=>(
  <option key = {index} value = {location}>{location}</option>
))


}
</select>
  </div>


<div>
<p className='mb-2'>Job Level</p>
<select className = "w-full px-3 py-2 border-2 border-gray-300 rounded" onChange =  {e=>setLevel(e.target.value)} value={category} required>
  <option value = "Beginner level">eginner level</option>
   <option value = "Intermediate level">Intermediate level</option>
    <option value = "Senior level">Seniorlevel</option>
</select>
  </div>
</div>
<div>
<p className='mb-2'>Job Salary</p>
<input min = {0} className = 'w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' onChange = {e=>setSalary(e.target.value)} value={salary} type = "number" placeholder='2500' required/>


</div>
<button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>

    </form>
   
  )
}

export default AddJob
