import axios from 'axios'
import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import ErrorMessage from './ErrorMessage'
import StringifyJSON from './StringifyJSON'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

const GradeForm = ({ usersLoading,
    usersError,
    usersData,
    skillsError,
    skillsLoading,
    skillsData,
    addGrade
}) => {
    const [score, setScore] = useState('')
    const [skillID, setSkillID] = useState('')
    const [userID, setUserID] = useState('')

    const handleSubmit = async () => {
        console.log(score)
        console.log(userID)
        console.log(skillID)

        try{
        let res = await axios.post(`/api/grades`, 
            {score: score, user_id: userID, skill_id: skillID}
        )
        addGrade(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const userChanged = (e, { value }) => {
        console.log(value)
        setUserID(value)
    }

    const skillChanged = (e, { value }) => {
        console.log(value)
        setSkillID(value)
    }

    return (
        <div>
            <h1>Grade Form</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input
                        type='number'
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        fluid label='Score'
                        placeholder='Score'
                    />

                    <Form.Select
                        onChange={userChanged}
                        fluid
                        label='Users'
                        options={usersData}
                        placeholder='Users'
                    />

                    <Form.Select
                        onChange={skillChanged}
                        fluid
                        label='Skills'
                        options={skillsData}
                        placeholder='Skills'
                    />

                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
        </div>
    )

}

export default GradeForm