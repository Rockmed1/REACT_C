import { Children, createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

// OPTIMIZE CONTEXT IN CASE 3 ARE TRUE AT ALL TIME:
//1)state in the context need to change all the time
//2)the context has many consumers
//3)the app is acutally slow and laggy
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//1) CREATE A NEW CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);

  return (
    //2)Proide value to child components
    <PostContext.Provider
      // the provider value object will have a different id each re-render and will cause all child components to re-render so we need to memoize it.
      value={value}
    >
      {/* this is good for optimization because these children will not automatically re-render   (as they were alreary created before being passed to the provider component) if children is not an option then memoizing all the decendents of the provider is the other alternative*/}
      {children}
    </PostContext.Provider>
  );
}

//3)export to CONSUME the values
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
