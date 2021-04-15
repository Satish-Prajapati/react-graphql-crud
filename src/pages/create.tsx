import {FunctionComponent} from 'react'
import {Typography, TextField, Container, Button, TextareaAutosize, Grid} from '@material-ui/core';
import { CREATE_POST } from "../graphql/query";
import { useMutation } from "@apollo/client";

const Create: FunctionComponent = () => {
    const [createPost] = useMutation(CREATE_POST);
    const handleForm = (e: any) => {
        e.preventDefault()
        const title = e.target.elements.title.value
        const body = e.target.elements.body.value
        
        createPost({ variables:
            { 
                "input": {
                    "title": title,
                    "body": body
                }
            }
        }).then(response => {
            if(response.data) {
                console.log('Created')
                alert(`Post Created. Response from server: ${JSON.stringify(response.data)}`)
                return
            }

            alert('Fail To Create Post')

        }).catch(err => {
            alert('Fail To Create Post')
        })
    }
    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h5" align="center">Create Post</Typography>
                    <form onSubmit={handleForm} >
                        <Grid container spacing={3}>
                            <Grid
                                item
                                xs={12}
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                            >
                                <TextField required name="title" label="Enter Post Title"  />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                            >
                                <TextareaAutosize required name='body' rowsMin={3} placeholder="Enter Post Body" />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                            >
                                <Button variant="outlined" color="primary" type="submit">Create Post</Button>
                            </Grid>
                        </Grid>
                    </form>
                
            </Container>
        </>
    )
}

export default Create
