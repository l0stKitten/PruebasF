import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuOptions = [
    { id: 0, name: "Home", color: "inherit", variant: "text", navigate: "/" },
    { id: 3, name: "Clientes", color: "inherit", variant: "text", navigate: "/clientes" },
];

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeRoute, setActiveRoute] = React.useState(location.pathname);

    React.useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location]);

    const handleNavigate = (route) => {
        navigate(route);
        setActiveRoute(route);
    };

    return (
        <AppBar position="static" color="transparent" sx={{ boxShadow: 0 }}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                {menuOptions.map((option) => (
                    <Button
                        color={option.navigate === activeRoute ? "primary" : option.color}
                        variant={option.navigate === activeRoute ? "outlined" : option.variant}
                        sx={{ margin: 1 }}
                        key={option.id}
                        onClick={() => handleNavigate(option.navigate)}
                    >
                        {option.name}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}
