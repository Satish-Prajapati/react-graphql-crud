import { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useQuery } from "@apollo/client";
import { GET_POST } from "../graphql/query";
import { PostProps } from "./post.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        minWidth: 280,
        maxWidth: 280
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      titleStyle: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6)
      },
  })
);

const Post:FunctionComponent<PostProps> = (
    props: PostProps
) => {
    const { data, error, loading, called } = useQuery(
        GET_POST,
        {
            variables: { id: props.id }
        }
    );
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="lg">
                <Typography className={classes.titleStyle} variant="h5" align="center">
                    {data?.post.title}
                </Typography>
                <Typography variant="h6" align="justify">
                    {data?.post.body}
                </Typography>
            </Container>
        </div>
    )
}

export default Post
