import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        
        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
        
        if (result.success) {
            navigate('/dashboard');
        }
        
        setLoading(false);
    };

    // Styles
    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
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
        background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        animation: 'pulse 4s ease-in-out infinite'
    };

    const cardStyle = {
        maxWidth: '500px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        padding: '45px',
        borderRadius: '30px',
        boxShadow: '0 25px 70px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2) inset',
        position: 'relative',
        zIndex: 1,
        animation: 'slideUp 0.6s ease-out',
        transition: 'all 0.3s ease'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '35px'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
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
        marginBottom: '20px',
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
        borderRadius: '14px',
        background: 'white',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    };

    const passwordStrengthStyle = {
        marginTop: '8px',
        height: '4px',
        background: '#e2e8f0',
        borderRadius: '2px',
        overflow: 'hidden'
    };

    const passwordStrengthFillStyle = (strength) => ({
        height: '100%',
        width: `${strength}%`,
        background: strength < 30 ? '#ff4757' : strength < 60 ? '#ffa502' : '#00d68f',
        transition: 'width 0.3s ease'
    });

    const buttonStyle = {
        width: '100%',
        padding: '16px',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: 'white',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        border: 'none',
        borderRadius: '14px',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        opacity: loading ? 0.7 : 1,
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        marginTop: '20px'
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
        transition: 'all 0.3s ease'
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
        transition: 'color 0.3s ease',
        fontSize: '1.2rem'
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

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        @keyframes ripple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(4); opacity: 0; }
        }
    `;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Calculate password strength
    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 0) strength += 20;
        if (password.length >= 6) strength += 20;
        if (password.match(/[a-z]/)) strength += 20;
        if (password.match(/[A-Z]/)) strength += 20;
        if (password.match(/[0-9]/)) strength += 20;
        return strength;
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={containerStyle}>
                <div style={backgroundAnimationStyle}></div>
                
                {/* Floating orbs for background effect */}
                <div style={{
                    position: 'absolute',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                    top: '5%',
                    right: '10%',
                    animation: 'float 7s ease-in-out infinite'
                }}></div>
                
                <div style={{
                    position: 'absolute',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    bottom: '5%',
                    left: '5%',
                    animation: 'float 9s ease-in-out infinite reverse'
                }}></div>

                <div 
                    style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 35px 80px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.2) inset';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 25px 70px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2) inset';
                    }}
                >
                    <div style={headerStyle}>
                        <h1 style={titleStyle}>Join EventHub! 🎉</h1>
                        <p style={subtitleStyle}>Create your account and start discovering amazing events</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle} htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter your full name"
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#764ba2';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(118, 75, 162, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e2e8f0';
                                    e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                                }}
                            />
                        </div>

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
                                    placeholder="Create a password"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#764ba2';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(118, 75, 162, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                                    }}
                                />
                                <span 
                                    style={iconStyle}
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#764ba2'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </span>
                            </div>
                            {formData.password && (
                                <div style={passwordStrengthStyle}>
                                    <div style={passwordStrengthFillStyle(passwordStrength)}></div>
                                </div>
                            )}
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    style={{
                                        ...inputStyle,
                                        borderColor: formData.confirmPassword && formData.password !== formData.confirmPassword 
                                            ? '#ff4757' 
                                            : formData.confirmPassword && formData.password === formData.confirmPassword 
                                            ? '#00d68f' 
                                            : '#e2e8f0'
                                    }}
                                    placeholder="Confirm your password"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#667eea';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        if (formData.password !== formData.confirmPassword && formData.confirmPassword) {
                                            e.target.style.borderColor = '#ff4757';
                                        } else if (formData.password === formData.confirmPassword && formData.confirmPassword) {
                                            e.target.style.borderColor = '#00d68f';
                                        } else {
                                            e.target.style.borderColor = '#e2e8f0';
                                        }
                                        e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                                    }}
                                />
                                <span 
                                    style={iconStyle}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </span>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p style={{ color: '#ff4757', fontSize: '0.85rem', marginTop: '5px' }}>
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || (formData.password !== formData.confirmPassword)}
                            style={buttonStyle}
                            onMouseEnter={(e) => {
                                if (!loading && formData.password === formData.confirmPassword) {
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
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <div style={footerStyle}>
                            <p>
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
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
                                    Sign in
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

export default Register;