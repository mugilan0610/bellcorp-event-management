import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            navigate('/dashboard');
        }
        
        setLoading(false);
    };

    // Styles
    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
    };

    const backgroundAnimationStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        animation: 'pulse 4s ease-in-out infinite'
    };

    const cardStyle = {
        maxWidth: '450px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset',
        position: 'relative',
        zIndex: 1,
        animation: 'slideUp 0.6s ease-out',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '40px'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '10px',
        animation: 'fadeIn 0.8s ease-out'
    };

    const subtitleStyle = {
        color: '#718096',
        fontSize: '1rem'
    };

    const inputGroupStyle = {
        marginBottom: '25px',
        position: 'relative'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        color: '#4a5568',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'color 0.3s ease'
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 18px',
        fontSize: '1rem',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        background: 'white',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    };

    const buttonStyle = {
        width: '100%',
        padding: '16px',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: 'white',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '12px',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        opacity: loading ? 0.7 : 1,
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    };

    const buttonGlowStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '150%',
        height: '150%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%) scale(0)',
        transition: 'transform 0.5s ease',
        pointerEvents: 'none'
    };

    const linkStyle = {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        position: 'relative'
    };

    const footerStyle = {
        textAlign: 'center',
        marginTop: '25px',
        color: '#718096',
        fontSize: '0.95rem'
    };

    const iconStyle = {
        position: 'absolute',
        top: '50%',
        right: '15px',
        transform: 'translateY(-50%)',
        color: '#a0aec0',
        cursor: 'pointer',
        transition: 'color 0.3s ease'
    };

    const keyframesStyle = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={containerStyle}>
                <div style={backgroundAnimationStyle}></div>
                
                {/* Floating orbs for background effect */}
                <div style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                    top: '10%',
                    left: '5%',
                    animation: 'float 6s ease-in-out infinite'
                }}></div>
                
                <div style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                    bottom: '10%',
                    right: '5%',
                    animation: 'float 8s ease-in-out infinite reverse'
                }}></div>

                <div 
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 30px 70px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.2) inset';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset';
                    }}
                >
                    <div style={headerStyle}>
                        <h1 style={titleStyle}>Welcome Back! 👋</h1>
                        <p style={subtitleStyle}>Sign in to continue your journey</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle} htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter your email"
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#667eea';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e2e8f0';
                                    e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                                }}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle} htmlFor="password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="Enter your password"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#667eea';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                                    }}
                                />
                                <span 
                                    style={iconStyle}
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </span>
                            </div>
                        </div>

                        <div style={{ marginTop: '35px' }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={buttonStyle}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                                    }
                                }}
                            >
                                <span style={buttonGlowStyle}></span>
                                {loading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <span style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '3px solid rgba(255,255,255,0.3)',
                                            borderTopColor: 'white',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }}></span>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>

                        <div style={footerStyle}>
                            <p>
                                Don't have an account?{' '}
                                <Link 
                                    to="/register" 
                                    style={linkStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = '#764ba2';
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = '#667eea';
                                        e.target.style.textDecoration = 'none';
                                    }}
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>

                    <style>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </div>
        </>
    );
};

export default Login;