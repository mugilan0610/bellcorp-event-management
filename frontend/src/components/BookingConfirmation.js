import React from 'react';
import { format } from 'date-fns';

const BookingConfirmation = ({ event, user, onClose }) => {
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    const containerStyle = {
        maxWidth: '500px',
        width: '90%',
        margin: '20px',
        padding: '30px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        position: 'relative',
        animation: 'slideIn 0.3s ease'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#718096'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '30px'
    };

    const iconStyle = {
        fontSize: '4rem',
        marginBottom: '15px'
    };

    const titleStyle = {
        color: '#28a745',
        fontSize: '1.8rem',
        marginBottom: '10px',
        fontWeight: 'bold'
    };

    const subtitleStyle = {
        color: '#718096',
        fontSize: '1rem'
    };

    const eventDetailsStyle = {
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px'
    };

    const detailRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #e9ecef'
    };

    const labelStyle = {
        fontWeight: '600',
        color: '#495057'
    };

    const valueStyle = {
        color: '#212529',
        fontWeight: '500'
    };

    const userInfoStyle = {
        background: '#e3f2fd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
    };

    const userEmailStyle = {
        color: '#1976d2',
        fontWeight: '600',
        wordBreak: 'break-all'
    };

    const footerStyle = {
        textAlign: 'center',
        marginTop: '25px'
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
    };

    const noteStyle = {
        marginTop: '15px',
        fontSize: '0.9rem',
        color: '#718096'
    };

    const keyframesStyle = `
        @keyframes slideIn {
            from {
                transform: translateY(-30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;

    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={overlayStyle} onClick={onClose}>
                <div style={containerStyle} onClick={e => e.stopPropagation()}>
                    <button style={closeButtonStyle} onClick={onClose}>×</button>
                    
                    <div style={headerStyle}>
                        <div style={iconStyle}>🎉</div>
                        <h2 style={titleStyle}>Booking Confirmed!</h2>
                        <p style={subtitleStyle}>Your registration was successful</p>
                    </div>

                    <div style={userInfoStyle}>
                        <div style={{ marginBottom: '5px' }}>Confirmation sent to:</div>
                        <div style={userEmailStyle}>{user?.email}</div>
                    </div>

                    <div style={eventDetailsStyle}>
                        <h3 style={{ marginBottom: '15px', color: '#2d3436' }}>Event Details</h3>
                        
                        <div style={detailRowStyle}>
                            <span style={labelStyle}>Event:</span>
                            <span style={valueStyle}>{event.name}</span>
                        </div>
                        
                        <div style={detailRowStyle}>
                            <span style={labelStyle}>Date:</span>
                            <span style={valueStyle}>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                        </div>
                        
                        <div style={detailRowStyle}>
                            <span style={labelStyle}>Time:</span>
                            <span style={valueStyle}>{format(new Date(event.date), 'h:mm a')}</span>
                        </div>
                        
                        <div style={detailRowStyle}>
                            <span style={labelStyle}>Location:</span>
                            <span style={valueStyle}>{event.location}</span>
                        </div>
                        
                        <div style={detailRowStyle}>
                            <span style={labelStyle}>Organizer:</span>
                            <span style={valueStyle}>{event.organizer}</span>
                        </div>
                        
                        <div style={detailRowStyle}>
                            <span style={labelStyle}>Booking ID:</span>
                            <span style={valueStyle}>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                    </div>

                    <div style={footerStyle}>
                        <button
                            style={buttonStyle}
                            onClick={onClose}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Great, Thanks!
                        </button>
                        
                        <p style={noteStyle}>
                            📧 A confirmation email has been sent to your inbox<br/>
                            You can view and manage your bookings in the Dashboard
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingConfirmation;