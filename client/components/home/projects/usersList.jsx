export const UsersList = ({ users }) => {
  // console.log('users: ', users);
  return (
    <div className="flex-1">
      {users.map((user) => {
        return (
          <div key={`user_${user.id}`} className="border-2 rounded bg-gray-500 text-white">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
          </div>
        );
      })}
    </div>
  );
};
