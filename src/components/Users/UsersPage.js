import {useState, Suspense, useDeferredValue, } from "react";
import UsersList from "./UsersList";
import {useUser} from "./UserContext";
import PageSpinner from "../UI/Spinner";
import UserDetails from "./UserDetails";
import {useQueryClient} from "react-query";
import getData from "../../utils/api";

export default function UsersPage () {
  const [loggedInUser] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;
  const queryClient = useQueryClient();
  const deferredUser = useDeferredValue(user) || user;
  const isPending = deferredUser !== user;

  function switchUser (nextUser) {
    setSelectedUser(nextUser);
    
    // Prefetch the next user's details
    queryClient.prefetchQuery(
      ["user", nextUser.id],
      () => getData(`http://localhost:3001/users/${nextUser.id}`)
    );

    // Prefetch the next user's avatar
    queryClient.prefetchQuery(
      `http://localhost:3001/img/${nextUser.img}`,
      () => new Promise(resolve => {
        const img = new Image();
        img.src = `http://localhost:3001/img/${nextUser.img}`;
        img.onload = () => resolve(img);
      }
    ));

  }

  return user ? (
    <main className="users-page">
      <UsersList user={user} setUser={switchUser} isPending={isPending}/>

      <Suspense fallback={<PageSpinner/>}>
        <UserDetails userID={deferredUser.id} isPending={isPending}/>
      </Suspense>
    </main>
  ) : null;
}