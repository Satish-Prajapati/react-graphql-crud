import {FunctionComponent} from 'react'
import {Typography, TextField, Container, Button, TextareaAutosize, Grid} from '@material-ui/core';
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST } from "../graphql/query";
import { EditProps } from "./edit.interface";
import { EDIT_POST } from "../graphql/query";

const Edit: FunctionComponent<EditProps> = (
    props: EditProps
) => {
    const { data, error, loading, called } = useQuery(
        GET_POST,
        {
            variables: { id: props.id }
        }
    );
    const [editPost] = useMutation(EDIT_POST);
    const handleForm = (e:any) => {
        e.preventDefault()
        const title = e.target.elements.title.value
        const body = e.target.elements.body.value
        
        editPost({ variables:
            { 
                "id": props.id,
                "input": {
                    "title": title,
                    "body": body
                }
            }
        }).then(response => {
            if(response.data) {
                alert(`Post Edit. Response from server: ${JSON.stringify(response.data)}`)
                return
            }

            alert('Fail To Edit')

        }).catch(err => {
            alert('Fail To Edit')
        })
    }
    return (
        <div>
            {data?.post && <Container maxWidth="lg">
                <Typography variant="h5" align="center">
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
                                <TextField required name="title" label="Enter Post Title" defaultValue={data.post.title} />
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
                                <TextareaAutosize required name='body' rowsMin={3} placeholder="Enter Post Body" defaultValue={data.post.body} />
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
                                <Button variant="outlined" color="primary" type="submit">Edit Post</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Typography>
            </Container>}
        </div>
    )
}

export default Edit
