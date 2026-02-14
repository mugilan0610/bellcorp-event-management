import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date);
    const isUpcoming = eventDate > new Date();
    const isAlmostSoldOut = event.availableSeats < 10 && event.availableSeats > 0;

    const getCategoryColor = (category) => {
        const colors = {
            'Conference': { bg: '#e6f7ff', color: '#0077b6', border: '#b3e0ff' },
            'Workshop': { bg: '#f0f4ff', color: '#3a5f8f', border: '#d1d9ff' },
            'Seminar': { bg: '#f1f8e9', color: '#2e7d32', border: '#c8e6c9' },
            'Networking': { bg: '#fff3e0', color: '#f57c00', border: '#ffe0b2' },
            'Social': { bg: '#fce4ec', color: '#c2185b', border: '#f8bbd0' },
            'Other': { bg: '#f5f5f5', color: '#616161', border: '#e0e0e0' }
        };
        return colors[category] || colors['Other'];
    };

    const categoryStyle = getCategoryColor(event.category);

    const cardStyle = {
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    };

    const imageStyle = {
        height: '180px',
        background: 'linear-gradient(135deg, #74b9ff 0%, #a29bfe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    };

    const soldOutBadgeStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#ff4757',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        zIndex: 1
    };

    const contentStyle = {
        padding: '20px',
        flex: 1
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
    };

    const titleStyle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#2d3436',
        margin: 0,
        flex: 1
    };

    const statusBadgeStyle = {
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        background: isUpcoming ? '#d4edda' : '#f8d7da',
        color: isUpcoming ? '#155724' : '#721c24'
    };

    const descriptionStyle = {
        color: '#636e72',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        marginBottom: '15px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    };

    const detailsStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '15px'
    };

    const detailItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        color: '#636e72'
    };

    const seatsStyle = {
        fontWeight: 'bold',
        color: isAlmostSoldOut ? '#ff4757' : '#00b894'
    };

    const categoryTagStyle = {
        background: categoryStyle.bg,
        color: categoryStyle.color,
        border: `1px solid ${categoryStyle.border}`,
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
        display: 'inline-block'
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '8px',
        width: '100%',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
        transition: 'opacity 0.3s ease'
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
        >
            <div style={imageStyle}>
                <span style={{ fontSize: '3rem' }}>🎪</span>
                {isAlmostSoldOut && (
                    <span style={soldOutBadgeStyle}>Almost Sold Out!</span>
                )}
            </div>
            
            <div style={contentStyle}>
                <div style={headerStyle}>
                    <h3 style={titleStyle}>{event.name}</h3>
                    <span style={statusBadgeStyle}>
                        {isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                </div>

                <p style={descriptionStyle}>{event.description}</p>

                <div style={detailsStyle}>
                    <div style={detailItemStyle}>
                        <span style={{ fontSize: '1.1rem' }}>👤</span>
                        <span>{event.organizer}</span>
                    </div>
                    <div style={detailItemStyle}>
                        <span style={{ fontSize: '1.1rem' }}>📍</span>
                        <span>{event.location.split(',').pop().trim()}</span>
                    </div>
                    <div style={detailItemStyle}>
                        <span style={{ fontSize: '1.1rem' }}>📅</span>
                        <span>{format(eventDate, 'MMM dd, yyyy')}</span>
                    </div>
                    <div style={detailItemStyle}>
                        <span style={{ fontSize: '1.1rem' }}>🎫</span>
                        <span>
                            <span style={seatsStyle}>{event.availableSeats}</span> / {event.capacity} seats
                        </span>
                    </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <span style={categoryTagStyle}>
                        {event.category}
                    </span>
                </div>

                <Link
                    to={`/event/${event._id}`}
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default EventCard;