import { Suspense } from "react";
import { useQuery } from "react-query";
import getData from "../../utils/api";
import Avatar from "./Avatar";
import UserBookings from "./UserBookings";
import UserTodos from "./UserTodos";

export default function UserDetails({ userID }) {
  const { data: user } = useQuery(
    ["user", userID],
    () => getData(`http://localhost:3001/users/${userID}`),
    { suspense: true }
  );

  return (
    <div className="item user">
      <div className="item-header">
        <h2>{user.name}</h2>
      </div>

      <Avatar
        src={`http://localhost:3001/img/${user.img}`}
        fallbackSrc={`http://localhost:3001/img/avatar.gif`}
        alt={user.name}
      />

      <div className="item user">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>

      <Suspense fallback={<p>Loading user bookings...</p>}>
        <UserBookings id={userID} />
      </Suspense>

      <Suspense fallback={<p>Loading user todos...</p>}>
        <UserTodos id={userID} />
      </Suspense>
    </div>
  );
}
