import React from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import List from '../components/List'
import Spinner from '../components/Spinner'
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
                renderData={(user) => {
                    return (
                    <Link key={user.id} to={`/users/${user.id}`}>
                        <h1>{user.name}</h1>
                    </Link>)
                }}
                data={data} 
                name='Users' />
        </div>
    )
}

export default Users