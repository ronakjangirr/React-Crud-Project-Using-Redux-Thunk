import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Style.module.css";
import { deleteUser, fetchUsers, updateUser } from "../../../redux/slices/userSlice";
import EditUserModal from "../../../crud/edit/EditUserModal";

const UsersTable = () => {
  const dispatch = useDispatch();

const [editOpen, setEditOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
  
const { users, loading, error, success } = useSelector((state) => state.users);

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const role = loggedUser?.role; 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Reload users after creating a user
  useEffect(() => {
    if (success) {
      dispatch(fetchUsers());
    }
  }, [success, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id)).then(() => {
        dispatch(fetchUsers());
      });
    }
  };

  const handleUpdateUser = (data) => {
    dispatch(updateUser({ id: selectedUser.id, data })).then(() => {
      setEditOpen(false);
      dispatch(fetchUsers());
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2>Users Management</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.city}</td>
              <td>
                {role === "admin" && (
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                )}

                {role === "user" && (
                  <button onClick={() => {
                    setSelectedUser(user);
                    setEditOpen(true);
                  }}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditUserModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={selectedUser}
        onSave={handleUpdateUser}
      />
    </div>
  );
};

export default UsersTable;
