import { FunctionComponent, useState } from "react";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { Button } from "@material-ui/core";
import Home from "./pages/home";
import Post from "./pages/post";
import Edit from "./pages/edit";
import Create from "./pages/create";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graphqlzero.almansi.me/api'
})

const App: FunctionComponent = () => {
  const [showPost, setShowPost] = useState(0)
  const [showEdit, setEditPost] = useState(0)
  const [showCreate, setCreatePost] = useState(true)
  const handleView = (id: number) => {
    // postId = id
    setShowPost(id)
    setEditPost(0)
    setCreatePost(false)
  }
  const handleEdit = (id: number) => {
    setEditPost(id)
    setShowPost(0)
    setCreatePost(false)
  }
  return (
    <ApolloProvider client={client}>
        <Home handleView={handleView} handleEdit={handleEdit}/>
        {showPost && showEdit && <Button variant="outlined">Close</Button>}
        {showPost && <Post id={showPost}/>}
        {showEdit && <Edit id={showEdit}/>}
        {showCreate && <Create/>}
    </ApolloProvider>
  );
}

export default App;
