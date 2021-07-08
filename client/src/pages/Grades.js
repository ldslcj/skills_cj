import React, {useState} from 'react'
import ErrorMessage from '../components/ErrorMessage'
import List from '../components/List'
import Spinner from '../components/Spinner'
import useAxiosOnMount from '../customHooks/useAxiosOnMount'
import useAxios from 'axios-hooks'
import GradeForm from '../components/GradeForm'
import Users from './Users'

const Grades = () => {
    // about the useState hook
    const {data,loading,error, setData} = useAxiosOnMount('/api/grades')
    const [showGradeForm, setShowGradeForm] = useState(false)
    // const {data,loading,error} = useAxiosOnMount('https://rasdfeqres.in/api/users?delay=3')

    const [{ data: usersData, loading: usersLoading, error: usersError}, 
        getUsersData
        ] = useAxios(
        {
            url: "/api/users",
            method: "get"
        },
        { manual: true }
    );

    const [{ data: skillsData, loading: skillsLoading, error: skillsError}, 
        getSkillsData
        ] = useAxios(
        {
            url: "/api/skills",
            method: "get"
        },
        { manual: true }
    );

    console.log(usersData)


    const showGradeUI = async () => {
        setShowGradeForm(!showGradeForm)
        getUsersData()
        getSkillsData()
    }
    
    const formantUsersData = () => {
        if (!usersData) return []
        return usersData.map(u => {
            return {key: u.id, text: u.name, value: u.id}
        })
    }

    const formantSkillsData = () => {
        if (!skillsData) return []
        return skillsData.map(u => {
            return {key: u.id, text: u.name, value: u.id}
        })
    }

    const addGrade = (grade) => {
        console.log(grade)
        console.log('working')
        setData([...data, grade])
    }

    if(loading) return <Spinner />
    if(error) return <ErrorMessage error={error}/>

    return (
        <div>

            <div onClick={showGradeUI}>Add Grade</div>
            {showGradeForm && <GradeForm 
                            addGrade={addGrade}
                            usersLoading={usersLoading}
                            usersError={usersError}
                            usersData={formantUsersData()}
                            skillsLoading={skillsLoading}
                            skillsError={skillsError}
                            skillsData={formantSkillsData()}
                            />}
            <List
                renderData={(g) => {
                    return (
                    <div>
                        <p>{g.userName} got {g.score} on {g.skillName}</p>
                    </div>)
                }}
                data={data} 
                name='Grades' />
        </div>
    )
}

export default Grades