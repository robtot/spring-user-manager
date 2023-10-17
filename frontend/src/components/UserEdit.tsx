import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

function UserEdit() {
    let navigate = useNavigate();
    let [user, setUser] = React.useState({ name: '', email: '', username: '', phone: '', website: '', company: '', address: '', id: null });

    useEffect(() => {
        const pathNames = window.location.pathname.split('/');
        const id = pathNames[pathNames.length - 1];

        const fetchData = async () => {
            const response = await fetch(`/users/${id}`);
            const json = await response.json();
            setUser(json);
        }

        if (id !== 'new') {
            fetchData();
        }
    }, []);

    const handleChange = (event: any) => {
        const target = event.target;
        const value : string = target.value;
        const name : string = target.name;
        let updatedUser = {...user};
        (updatedUser as any)[name] = value;
        setUser(updatedUser);
    }

    const handleSubmit = async (event : any) => {
        event.preventDefault();
    
        await fetch('/users' + (user.id ? '/' + user.id : ''), {
            method: (user.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        navigate('/users');
    }

    const title = <h2>{user.id ? 'Edit Client' : 'Add User'}</h2>;

    return (
        <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={user.name || ''}
                                onChange={handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={user.email || ''}
                                onChange={handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value={user.username || ''}
                                onChange={handleChange} autoComplete="username"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="text" name="phone" id="phone" value={user.phone || ''}
                                onChange={handleChange} autoComplete="phone"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="website">Website</Label>
                        <Input type="text" name="website" id="website" value={user.website || ''}
                                onChange={handleChange} autoComplete="website"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="company">Company</Label>
                        <Input type="text" name="company" id="company" value={user.company || ''}
                                onChange={handleChange} autoComplete="company"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={user.address || ''}
                                onChange={handleChange} autoComplete="address"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/users">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default UserEdit;
