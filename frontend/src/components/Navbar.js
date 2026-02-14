import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navbarStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const logoStyle = {
        color: 'white',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        letterSpacing: '1px'
    };

    const navLinksStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '30px'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'color 0.3s ease'
    };

    const userInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    };

    const userNameStyle = {
        color: 'white',
        fontSize: '0.95rem',
        background: 'rgba(255,255,255,0.2)',
        padding: '5px 12px',
        borderRadius: '20px'
    };

    const logoutButtonStyle = {
        background: '#ff4757',
        color: 'white',
        border: 'none',
        padding: '8px 20px',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'background 0.3s ease'
    };

    const authButtonStyle = {
        background: 'white',
        color: '#667eea',
        border: 'none',
        padding: '8px 20px',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        textDecoration: 'none',
        marginLeft: '10px',
        transition: 'transform 0.3s ease'
    };

    return (
        <nav style={navbarStyle}>
            <div style={containerStyle}>
                <Link to="/" style={logoStyle}>
                    🎪 EventHub
                </Link>

                <div style={navLinksStyle}>
                    <Link to="/events" style={linkStyle}>
                        Browse Events
                    </Link>
                    
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" style={linkStyle}>
                                Dashboard
                            </Link>
                            <div style={userInfoStyle}>
                                <span style={userNameStyle}>
                                    👤 {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={logoutButtonStyle}
                                    onMouseEnter={(e) => e.target.style.background = '#ff6b81'}
                                    onMouseLeave={(e) => e.target.style.background = '#ff4757'}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div>
                            <Link
                                to="/login"
                                style={authButtonStyle}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                style={{...authButtonStyle, background: '#28a745', color: 'white'}}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;