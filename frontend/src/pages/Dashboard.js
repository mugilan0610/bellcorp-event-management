import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [registrationsRes, summaryRes] = await Promise.all([
                api.get('/dashboard/registrations'),
                api.get('/dashboard/summary')
            ]);

            setUpcomingEvents(registrationsRes.data.upcoming || []);
            setPastEvents(registrationsRes.data.past || []);
            setSummary(summaryRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (eventId, eventName) => {
        if (window.confirm(`Are you sure you want to cancel registration for "${eventName}"?`)) {
            try {
                await api.delete(`/events/${eventId}/register`);
                toast.success('Registration cancelled successfully');
                fetchDashboardData();
            } catch (error) {
                const message = error.response?.data?.message || 'Cancellation failed';
                toast.error(message);
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    const containerStyle = {
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 20px'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        color: '#2d3436',
        marginBottom: '10px',
        fontWeight: '700'
    };

    const welcomeStyle = {
        fontSize: '1.2rem',
        color: '#667eea',
        marginBottom: '40px',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '20px'
    };

    const summaryGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '25px',
        marginBottom: '50px'
    };

    const summaryCardStyle = {
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
        cursor: 'default'
    };

    const summaryNumberStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '10px',
        lineHeight: '1'
    };

    const summaryLabelStyle = {
        fontSize: '1.1rem',
        color: '#718096',
        fontWeight: '500'
    };

    const nextEventStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '35px',
        marginBottom: '50px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '25px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
    };

    const nextEventTitleStyle = {
        fontSize: '1.2rem',
        opacity: 0.9,
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    const nextEventNameStyle = {
        fontSize: '2.2rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        lineHeight: '1.3'
    };

    const nextEventDetailsStyle = {
        display: 'flex',
        gap: '25px',
        fontSize: '1.1rem',
        opacity: 0.9,
        flexWrap: 'wrap'
    };

    const viewButtonStyle = {
        background: 'white',
        color: '#667eea',
        padding: '14px 35px',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    };

    const sectionTitleStyle = {
        fontSize: '1.8rem',
        color: '#2d3436',
        marginBottom: '25px',
        fontWeight: '600',
        position: 'relative',
        paddingBottom: '10px'
    };

    const eventCardStyle = {
        background: 'white',
        borderRadius: '16px',
        padding: '25px',
        marginBottom: '15px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        transition: 'all 0.3s ease',
        border: '1px solid #f0f0f0'
    };

    const eventInfoStyle = {
        flex: 1
    };

    const eventNameStyle = {
        fontSize: '1.3rem',
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: '12px'
    };

    const eventMetaStyle = {
        display: 'flex',
        gap: '20px',
        fontSize: '0.95rem',
        color: '#718096',
        flexWrap: 'wrap'
    };

    const eventMetaItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: '#f8f9fa',
        padding: '5px 12px',
        borderRadius: '20px'
    };

    const actionButtonsStyle = {
        display: 'flex',
        gap: '12px'
    };

    const viewDetailButtonStyle = {
        background: '#667eea',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '10px',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        border: 'none',
        cursor: 'pointer'
    };

    const cancelButtonStyle = {
        background: '#ff4757',
        color: 'white',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'all 0.3s ease'
    };

    const emptyStateStyle = {
        background: 'white',
        borderRadius: '20px',
        padding: '60px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    };

    const emptyIconStyle = {
        fontSize: '5rem',
        marginBottom: '25px'
    };

    const emptyTextStyle = {
        fontSize: '1.3rem',
        color: '#718096',
        marginBottom: '25px'
    };

    const browseButtonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '50px',
        textDecoration: 'none',
        display: 'inline-block',
        fontWeight: '600',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Welcome back, {user?.name}! 👋</h1>
            <p style={welcomeStyle}>Here's what's happening with your events</p>

            {/* Summary Cards with Hover Effects */}
            {summary && (
                <div style={summaryGridStyle}>
                    <div 
                        style={summaryCardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                        }}
                    >
                        <div style={summaryNumberStyle}>{summary.totalRegistrations || 0}</div>
                        <div style={summaryLabelStyle}>Total Registrations</div>
                    </div>
                    <div 
                        style={summaryCardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                        }}
                    >
                        <div style={summaryNumberStyle}>{summary.upcomingCount || 0}</div>
                        <div style={summaryLabelStyle}>Upcoming Events</div>
                    </div>
                    <div 
                        style={summaryCardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                        }}
                    >
                        <div style={summaryNumberStyle}>{summary.pastCount || 0}</div>
                        <div style={summaryLabelStyle}>Past Events</div>
                    </div>
                </div>
            )}

            {/* Next Event Highlight */}
            {summary?.nextEvent && (
                <div 
                    style={nextEventStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                    }}
                >
                    <div>
                        <div style={nextEventTitleStyle}>🎯 YOUR NEXT EVENT</div>
                        <div style={nextEventNameStyle}>{summary.nextEvent.name}</div>
                        <div style={nextEventDetailsStyle}>
                            <span>📅 {format(new Date(summary.nextEvent.date), 'EEEE, MMMM dd, yyyy')}</span>
                            <span>⏰ {format(new Date(summary.nextEvent.date), 'h:mm a')}</span>
                            <span>📍 {summary.nextEvent.location.split(',').pop().trim()}</span>
                        </div>
                    </div>
                    <Link
                        to={`/event/${summary.nextEvent._id}`}
                        style={viewButtonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                        }}
                    >
                        View Details →
                    </Link>
                </div>
            )}

            {/* Upcoming Events Section */}
            <div style={{ marginBottom: '50px' }}>
                <h2 style={sectionTitleStyle}>
                    📅 Upcoming Events ({upcomingEvents.length})
                </h2>
                {upcomingEvents.length === 0 ? (
                    <div style={emptyStateStyle}>
                        <div style={emptyIconStyle}>🎪</div>
                        <p style={emptyTextStyle}>You haven't registered for any upcoming events yet</p>
                        <Link
                            to="/events"
                            style={browseButtonStyle}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                            }}
                        >
                            Browse Events
                        </Link>
                    </div>
                ) : (
                    upcomingEvents.map(({ event }) => (
                        <div 
                            key={event._id} 
                            style={eventCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = '#667eea';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                e.currentTarget.style.borderColor = '#f0f0f0';
                            }}
                        >
                            <div style={eventInfoStyle}>
                                <h3 style={eventNameStyle}>{event.name}</h3>
                                <div style={eventMetaStyle}>
                                    <span style={eventMetaItemStyle}>📅 {format(new Date(event.date), 'MMM dd, yyyy')}</span>
                                    <span style={eventMetaItemStyle}>⏰ {format(new Date(event.date), 'h:mm a')}</span>
                                    <span style={eventMetaItemStyle}>📍 {event.location.split(',').pop().trim()}</span>
                                    <span style={eventMetaItemStyle}>👤 {event.organizer}</span>
                                    <span style={eventMetaItemStyle}>🎫 {event.availableSeats} seats left</span>
                                </div>
                            </div>
                            <div style={actionButtonsStyle}>
                                <Link
                                    to={`/event/${event._id}`}
                                    style={viewDetailButtonStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#5a67d8';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#667eea';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleCancel(event._id, event.name)}
                                    style={cancelButtonStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#ff6b81';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#ff4757';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
                <div>
                    <h2 style={sectionTitleStyle}>
                        📜 Past Events ({pastEvents.length})
                    </h2>
                    {pastEvents.map(({ event }) => (
                        <div 
                            key={event._id} 
                            style={{...eventCardStyle, opacity: 0.8, background: '#fafafa'}}
                        >
                            <div style={eventInfoStyle}>
                                <h3 style={{...eventNameStyle, color: '#718096'}}>{event.name}</h3>
                                <div style={eventMetaStyle}>
                                    <span style={eventMetaItemStyle}>📅 {format(new Date(event.date), 'MMM dd, yyyy')}</span>
                                    <span style={eventMetaItemStyle}>📍 {event.location.split(',').pop().trim()}</span>
                                    <span style={eventMetaItemStyle}>👤 {event.organizer}</span>
                                </div>
                            </div>
                            <Link
                                to={`/event/${event._id}`}
                                style={{...viewDetailButtonStyle, background: '#718096'}}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#5a6268';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#718096';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                View Memories
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;