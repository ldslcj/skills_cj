import React from 'react'
import {useParams} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import List from '../components/List';
import Spinner from '../components/Spinner';
import useAxiosOnMount from '../customHooks/useAxiosOnMount';
import { Card } from 'semantic-ui-react'

const UserShow = () => {

    const { id } = useParams()
    const { data, error, loading } = useAxiosOnMount(`/api/users/${id}`)

    if(loading) return <Spinner />
    if(error) return <ErrorMessage error={error}/>

    return (
        <div>
            <List 
            name={`Scores for ${data.user.name}`} 
            data={data.scores}
            renderData = {(grade) => (
                <Card>
                <Card.Content>
                    <Card.Header>{grade.skill}</Card.Header>
                    <Card.Meta>{grade.score}</Card.Meta>
                </Card.Content>
                </Card>
            )} 
            />
        </div>
    )
}

export default UserShow