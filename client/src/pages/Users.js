import React from 'react'
import ErrorMessage from '../components/ErrorMessage'
import List from '../components/List'
import Spinner from '../components/Spinner'
import StringifyJSON from '../components/StringifyJSON'
import useAxiosOnMount from '../customHooks/useAxiosOnMount'

const Users = () => {
    // about the useState hook
    const {data,loading,error} = useAxiosOnMount('/api/users')
    // const {data,loading,error} = useAxiosOnMount('https://rasdfeqres.in/api/users?delay=3')

    if(loading) return <Spinner />
    if(error) return <ErrorMessage error={error}/>
    return (
        <div>
            <List
                renderData={(u) => {
                    return (
                    <div>
                        <h1>{u.name}</h1>
                    </div>)
                }}
                data={data} 
                name='Users' />
        </div>
    )
}

export default Users