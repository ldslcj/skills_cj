import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Things = () => {
    // about the useState hook
    const [things, setThings] = useState([])

    // about the use hook
    useEffect(()=>{
        getThings()
    },[])

    // maybe about async await
    const getThings = async() => {
      // about try catch
      try {
         let res = await axios.get('/api/things')
         console.log(res)
         setThings(res.data)
      } catch(err){
          console.log(err)
         alert('err')
      }
    }
    return (
        <div>
            <h1>Things</h1>
        </div>
    )
} 

export default Things