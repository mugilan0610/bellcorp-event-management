import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedEvents();
    }, []);

    const fetchFeaturedEvents = async () => {
        try {
            const response = await api.get('/events?limit=3');
            setFeaturedEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching featured events:', error);
        } finally {
            setLoading(false);
        }
    };

    const heroStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
    };

    const heroTitleStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
    };

    const heroTextStyle = {
        fontSize: '1.2rem',
        maxWidth: '600px',
        margin: '0 auto 30px',
        opacity: 0.95
    };

    const ctaButtonStyle = {
        background: 'white',
        color: '#667eea',
        border: 'none',
        padding: '15px 40px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        borderRadius: '50px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease'
    };

    const sectionStyle = {
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 20px'
    };

    const sectionTitleStyle = {
        fontSize: '2rem',
        color: '#2d3436',
        marginBottom: '40px',
        textAlign: 'center',
        fontWeight: '600'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
    };

    const statsSectionStyle = {
        background: 'white',
        padding: '60px 0',
        boxShadow: '0 -4px 15px rgba(0,0,0,0.05)'
    };

    const statsGridStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        textAlign: 'center'
    };

    const statNumberStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '10px'
    };

    const statLabelStyle = {
        fontSize: '1.1rem',
        color: '#636e72'
    };

    return (
        <div>
            {/* Hero Section */}
            <div style={heroStyle}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <h1 style={heroTitleStyle}>
                        Discover Amazing Events
                    </h1>
                    <p style={heroTextStyle}>
                        Find and register for the best events in your area. 
                        From tech conferences to networking meetups, we've got you covered.
                    </p>
                    <Link
                        to="/events"
                        style={ctaButtonStyle}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Browse All Events
                    </Link>
                </div>
            </div>

            {/* Featured Events */}
            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    Featured Events
                </h2>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div style={gridStyle}>
                        {featuredEvents.map(event => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <div style={statsSectionStyle}>
                <div style={statsGridStyle}>
                    <div>
                        <div style={statNumberStyle}>500+</div>
                        <div style={statLabelStyle}>Events Hosted</div>
                    </div>
                    <div>
                        <div style={statNumberStyle}>10,000+</div>
                        <div style={statLabelStyle}>Happy Attendees</div>
                    </div>
                    <div>
                        <div style={statNumberStyle}>50+</div>
                        <div style={statLabelStyle}>Cities Covered</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;