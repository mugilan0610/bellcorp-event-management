import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingConfirmation from '../components/BookingConfirmation';
import toast from 'react-hot-toast';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [checkingRegistration, setCheckingRegistration] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        fetchEvent();
    }, [id]);

    useEffect(() => {
        if (isAuthenticated && event) {
            checkRegistration();
        } else {
            setCheckingRegistration(false);
        }
    }, [isAuthenticated, event]);

    const fetchEvent = async () => {
        try {
            const response = await api.get(`/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching event:', error);
            toast.error('Event not found');
            navigate('/events');
        } finally {
            setLoading(false);
        }
    };

    const checkRegistration = async () => {
        try {
            const response = await api.get('/dashboard/registrations');
            const registered = response.data.upcoming.some(
                reg => reg.event._id === id
            );
            setIsRegistered(registered);
        } catch (error) {
            console.error('Error checking registration:', error);
        } finally {
            setCheckingRegistration(false);
        }
    };

    const handleRegister = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to register for events');
            navigate('/login');
            return;
        }

        setRegistering(true);
        try {
            await api.post(`/events/${id}/register`);
            setIsRegistered(true);
            setEvent(prev => ({
                ...prev,
                availableSeats: prev.availableSeats - 1
            }));
            setShowConfirmation(true);
            toast.success('Successfully registered for event!', {
                duration: 4000,
                icon: '🎉'
            });
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
        } finally {
            setRegistering(false);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to cancel your registration?')) {
            return;
        }
        
        setRegistering(true);
        try {
            await api.delete(`/events/${id}/register`);
            setIsRegistered(false);
            setEvent(prev => ({
                ...prev,
                availableSeats: prev.availableSeats + 1
            }));
            toast.success('Registration cancelled successfully', {
                icon: '✅'
            });
        } catch (error) {
            const message = error.response?.data?.message || 'Cancellation failed';
            toast.error(message);
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    const eventDate = new Date(event.date);
    const isUpcoming = eventDate > new Date();
    const seatsAvailable = event.availableSeats > 0;
    const seatsPercentage = Math.round((event.availableSeats / event.capacity) * 100);

    const containerStyle = {
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '0 20px'
    };

    const cardStyle = {
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    };

    const imageStyle = {
        height: '300px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const contentStyle = {
        padding: '40px'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        color: '#2d3436',
        margin: 0,
        fontWeight: '700'
    };

    const statusBadgeStyle = {
        padding: '8px 20px',
        borderRadius: '30px',
        fontSize: '1rem',
        fontWeight: '600',
        background: isUpcoming ? '#d4edda' : '#f8d7da',
        color: isUpcoming ? '#155724' : '#721c24'
    };

    const descriptionStyle = {
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: '#4a5568',
        marginBottom: '30px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
    };

    const infoCardStyle = {
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
    };

    const infoLabelStyle = {
        fontSize: '0.9rem',
        color: '#718096',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const infoValueStyle = {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#2d3436'
    };

    const registrationCardStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '12px',
        color: 'white'
    };

    const seatsStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '5px'
    };

    const seatsLabelStyle = {
        fontSize: '1rem',
        opacity: 0.9,
        marginBottom: '20px'
    };

    const progressBarStyle = {
        width: '100%',
        height: '10px',
        background: 'rgba(255,255,255,0.3)',
        borderRadius: '5px',
        marginBottom: '20px',
        overflow: 'hidden'
    };

    const progressFillStyle = {
        width: `${100 - seatsPercentage}%`,
        height: '100%',
        background: '#ff4757',
        borderRadius: '5px'
    };

    const registerButtonStyle = {
        width: '100%',
        padding: '15px',
        fontSize: '1.1rem',
        fontWeight: '600',
        border: 'none',
        borderRadius: '8px',
        cursor: registering ? 'not-allowed' : 'pointer',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        marginBottom: '10px',
        background: 'white',
        color: '#667eea',
        opacity: registering ? 0.7 : 1
    };

    const cancelButtonStyle = {
        ...registerButtonStyle,
        background: '#ff4757',
        color: 'white'
    };

    const soldOutStyle = {
        background: 'rgba(255,255,255,0.2)',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '1.1rem',
        fontWeight: '600'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={imageStyle}>
                    <span style={{ fontSize: '4rem' }}>🎪</span>
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '30px',
                        backdropFilter: 'blur(5px)'
                    }}>
                        🏷️ {event.category}
                    </div>
                </div>
                
                <div style={contentStyle}>
                    <div style={headerStyle}>
                        <h1 style={titleStyle}>{event.name}</h1>
                        <span style={statusBadgeStyle}>
                            {isUpcoming ? '✨ Upcoming Event' : '📅 Past Event'}
                        </span>
                    </div>

                    <p style={descriptionStyle}>{event.description}</p>

                    <div style={gridStyle}>
                        <div style={infoCardStyle}>
                            <div style={infoLabelStyle}>Organizer</div>
                            <div style={infoValueStyle}>👤 {event.organizer}</div>
                        </div>
                        <div style={infoCardStyle}>
                            <div style={infoLabelStyle}>Location</div>
                            <div style={infoValueStyle}>📍 {event.location}</div>
                        </div>
                        <div style={infoCardStyle}>
                            <div style={infoLabelStyle}>Date & Time</div>
                            <div style={infoValueStyle}>
                                📅 {format(eventDate, 'MMMM dd, yyyy')}
                                <br />
                                ⏰ {format(eventDate, 'h:mm a')}
                            </div>
                        </div>
                        <div style={infoCardStyle}>
                            <div style={infoLabelStyle}>Category</div>
                            <div style={infoValueStyle}>🏷️ {event.category}</div>
                        </div>
                    </div>

                    <div style={registrationCardStyle}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={seatsStyle}>{event.availableSeats}</div>
                            <div style={seatsLabelStyle}>
                                Seats Available out of {event.capacity}
                            </div>

                            <div style={progressBarStyle}>
                                <div style={progressFillStyle}></div>
                            </div>

                            {isUpcoming ? (
                                seatsAvailable ? (
                                    isRegistered ? (
                                        <>
                                            <div style={{
                                                background: 'rgba(255,255,255,0.2)',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                marginBottom: '15px',
                                                fontWeight: '600'
                                            }}>
                                                ✓ You're registered for this event!
                                            </div>
                                            <button
                                                onClick={handleCancel}
                                                disabled={registering}
                                                style={cancelButtonStyle}
                                                onMouseEnter={(e) => {
                                                    if (!registering) {
                                                        e.target.style.transform = 'scale(1.02)';
                                                        e.target.style.opacity = '0.9';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!registering) {
                                                        e.target.style.transform = 'scale(1)';
                                                        e.target.style.opacity = '1';
                                                    }
                                                }}
                                            >
                                                {registering ? 'Processing...' : 'Cancel Registration'}
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleRegister}
                                            disabled={registering || checkingRegistration}
                                            style={registerButtonStyle}
                                            onMouseEnter={(e) => {
                                                if (!registering && !checkingRegistration) {
                                                    e.target.style.transform = 'scale(1.02)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!registering && !checkingRegistration) {
                                                    e.target.style.transform = 'scale(1)';
                                                }
                                            }}
                                        >
                                            {registering ? 'Registering...' : 
                                             checkingRegistration ? 'Checking...' : 
                                             'Register Now →'}
                                        </button>
                                    )
                                ) : (
                                    <div style={soldOutStyle}>
                                        ❌ Event Sold Out
                                    </div>
                                )
                            ) : (
                                <div style={soldOutStyle}>
                                    This event has ended
                                </div>
                            )}

                            {!isAuthenticated && (
                                <p style={{ marginTop: '15px' }}>
                                    Please <a href="/login" style={{ color: 'white', fontWeight: 'bold' }}>login</a> to register
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {showConfirmation && (
                <BookingConfirmation 
                    event={event} 
                    user={user} 
                    onClose={() => setShowConfirmation(false)}
                />
            )}
        </div>
    );
};

export default EventDetails;