import { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_POST, DELETE_POST } from "../graphql/query";
import { Cards } from "../components/cards-component";
import { HomeProps } from "./home.interface";

const Home: FunctionComponent<HomeProps> = (
    props: HomeProps
) => {
    const { data, error, loading, called } = useQuery(
        GET_ALL_POST,
        {
          variables: {
            "options": {
              "paginate": {
                "page": 1,
                "limit": 4
              }
            }
          }
        }
    );

    const [deletePost] = useMutation(DELETE_POST);
    const handleDelete = (id: number) => {
        deletePost({ variables: { "id": id }}).then(response => {
            if(response.data.deletePost) {
                alert(`Post Deleted. Response from server: ${JSON.stringify(response.data)}`)
                return
            }

            alert('Fail To Delete')

        }).catch(err => {
            alert('Fail To Delete')
        })
    } 
    return (
        <>
            {error && <Typography variant="h5" align="center">Error Loading Blogs</Typography>}
            {data && <Cards data={data} handleDelete={handleDelete} handleView={props.handleView} handleEdit={props.handleEdit}/> }  
        </>
    )
}

export default Home
