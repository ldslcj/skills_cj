import React from 'react'
import { useParams } from 'react-router'
import { Card } from 'semantic-ui-react'
import ErrorMessage from '../components/ErrorMessage'
import List from '../components/List'
import Spinner from '../components/Spinner'
import useAxiosOnMount from '../customHooks/useAxiosOnMount'

const SkillShow = () => {
    const {id} = useParams()
    const {data: data1, loading, error} = useAxiosOnMount(`/api/skills/${id}`)

    if(loading) return <Spinner />
    if(error) return <ErrorMessage error={error}/>

    console.log(data1)
    return (
        <div>
            <List 
            data = {data1.scores}
            name={`Scores for ${data1.skill.name}`}
            renderData={(userScore) => (
                <Card>
                <Card.Content>
                    <Card.Header>{userScore.user}</Card.Header>
                    <Card.Meta>{userScore.score}</Card.Meta>
                </Card.Content>
                </Card>
            )}
            />
        </div>
    )
}

export default SkillShow