import React, { useEffect } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

function UserList() {

    let [users, setUsers] = React.useState([]);

    useEffect(() => {
        fetch("users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const remove = async (id : any) => {
        await fetch(`/users/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setUsers(users.filter((user : any) => user.id !== id));
        });
    }
        
    const userList = users.map((user : any) => {
        return <tr key={user.id}>
            <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.company}</td>
            <td>{user.address}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/users/" + user.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(user.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className="float-right mt-4">
                    <Button color="success" tag={Link} to={"/users/new"}>Add User</Button>
                </div>
                <h3>Users</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Company</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default UserList;
