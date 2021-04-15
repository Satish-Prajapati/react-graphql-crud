import { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, Button, Container, CardContent, Card } from "@material-ui/core";
import { CardsProps } from "./acrds-component.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        minWidth: 280,
        maxWidth: 280,
        minHeight: 180
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
      optionBtn:{
          paddingTop: 10
      }
  })
);


export const Cards: FunctionComponent<CardsProps> = (
    props: CardsProps
) => {
    const classes = useStyles();
    console.log(props.data?.posts?.data)
    return (
        <>
        <Container maxWidth="lg">
        <Typography className={classes.titleStyle} variant="h5" align="center">
            GRAPHQL BLOG APP
        </Typography>
        <Grid container  spacing={0}>
            {props.data?.posts?.data.map((post: any) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={post.id} container spacing={0}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            {post.title}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Grid container className={classes.optionBtn} spacing={0}>
                        <Button variant="outlined" onClick={() => props.handleView(post.id)}>View</Button>
                        <Button variant="outlined" color="primary" onClick={() => props.handleEdit(post.id)} >Edit</Button>
                        <Button variant="outlined" color="secondary" onClick={() => props.handleDelete(post.id)}>Delete</Button>
                    </Grid>
                </Grid>
            ))}

        </Grid>
        </Container>
        </>
    )
}
