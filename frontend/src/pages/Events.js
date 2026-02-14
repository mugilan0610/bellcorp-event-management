import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        location: 'all',
        date: 'all'
    });
    const [categories] = useState([
        'all', 'Conference', 'Workshop', 'Seminar', 'Networking', 'Social', 'Other'
    ]);
    const [locations, setLocations] = useState(['all']);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalEvents: 0
    });

    useEffect(() => {
        fetchEvents();
    }, [filters, pagination.currentPage]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: pagination.currentPage,
                limit: 9
            });

            if (filters.search) params.append('search', filters.search);
            if (filters.category !== 'all') params.append('category', filters.category);
            if (filters.location !== 'all') params.append('location', filters.location);
            if (filters.date !== 'all') params.append('date', filters.date);

            const response = await api.get(`/events?${params}`);
            setEvents(response.data.events);
            setPagination({
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalEvents: response.data.totalEvents
            });

            // Extract unique locations
            const uniqueLocations = [...new Set(response.data.events.map(e => 
                e.location.split(',').pop().trim()
            ))];
            setLocations(['all', ...uniqueLocations]);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEvents();
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            category: 'all',
            location: 'all',
            date: 'all'
        });
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        color: '#2d3436',
        marginBottom: '30px',
        fontWeight: '600'
    };

    const filterContainerStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '25px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    };

    const filterGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 15px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease'
    };

    const selectStyle = {
        ...inputStyle,
        background: 'white',
        cursor: 'pointer'
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const applyButtonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease'
    };

    const resetButtonStyle = {
        background: 'none',
        border: 'none',
        color: '#667eea',
        fontSize: '1rem',
        cursor: 'pointer',
        textDecoration: 'underline'
    };

    const resultsHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    };

    const resultCountStyle = {
        color: '#636e72',
        fontSize: '1.1rem'
    };

    const highlightStyle = {
        color: '#667eea',
        fontWeight: 'bold'
    };

    const filterTagStyle = {
        background: '#e3f2fd',
        color: '#1976d2',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.9rem'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '60px 20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    };

    const emptyTitleStyle = {
        fontSize: '1.5rem',
        color: '#2d3436',
        marginBottom: '15px'
    };

    const emptyTextStyle = {
        color: '#636e72',
        marginBottom: '20px'
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '40px'
    };

    const pageButtonStyle = (isActive) => ({
        padding: '10px 15px',
        border: '1px solid #e0e0e0',
        background: isActive ? '#667eea' : 'white',
        color: isActive ? 'white' : '#2d3436',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minWidth: '40px'
    });

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Browse Events</h1>

            {/* Filters */}
            <div style={filterContainerStyle}>
                <form onSubmit={handleSearch}>
                    <div style={filterGridStyle}>
                        <input
                            type="text"
                            name="search"
                            placeholder="🔍 Search events..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                        
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            style={selectStyle}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>

                        <select
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            style={selectStyle}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        >
                            {locations.map(loc => (
                                <option key={loc} value={loc}>
                                    {loc === 'all' ? 'All Locations' : loc}
                                </option>
                            ))}
                        </select>

                        <select
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            style={selectStyle}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        >
                            <option value="all">All Dates</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                        </select>
                    </div>

                    <div style={buttonContainerStyle}>
                        <button
                            type="submit"
                            style={applyButtonStyle}
                            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                            Apply Filters
                        </button>
                        
                        <button
                            type="button"
                            onClick={resetFilters}
                            style={resetButtonStyle}
                            onMouseEnter={(e) => e.target.style.color = '#5a67d8'}
                            onMouseLeave={(e) => e.target.style.color = '#667eea'}
                        >
                            Clear Filters
                        </button>
                    </div>
                </form>
            </div>

            {/* Results */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div style={resultsHeaderStyle}>
                        <p style={resultCountStyle}>
                            Found <span style={highlightStyle}>{pagination.totalEvents}</span> events
                            {filters.category !== 'all' && (
                                <span style={filterTagStyle}> • {filters.category}</span>
                            )}
                        </p>
                    </div>

                    {events.length === 0 ? (
                        <div style={emptyStateStyle}>
                            <h3 style={emptyTitleStyle}>No events found</h3>
                            <p style={emptyTextStyle}>
                                Try adjusting your filters or search criteria
                            </p>
                            <button
                                onClick={resetFilters}
                                style={applyButtonStyle}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div style={gridStyle}>
                                {events.map(event => (
                                    <EventCard key={event._id} event={event} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div style={paginationStyle}>
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={pagination.currentPage === 1}
                                        style={pageButtonStyle(false)}
                                        onMouseEnter={(e) => {
                                            if (!e.target.disabled) {
                                                e.target.style.background = '#f0f0f0';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!e.target.disabled) {
                                                e.target.style.background = 'white';
                                            }
                                        }}
                                    >
                                        ←
                                    </button>
                                    
                                    {[...Array(pagination.totalPages)].map((_, i) => {
                                        const pageNum = i + 1;
                                        if (
                                            pageNum === 1 ||
                                            pageNum === pagination.totalPages ||
                                            Math.abs(pageNum - pagination.currentPage) <= 2
                                        ) {
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    style={pageButtonStyle(pagination.currentPage === pageNum)}
                                                    onMouseEnter={(e) => {
                                                        if (pagination.currentPage !== pageNum) {
                                                            e.target.style.background = '#f0f0f0';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (pagination.currentPage !== pageNum) {
                                                            e.target.style.background = 'white';
                                                        }
                                                    }}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        } else if (
                                            pageNum === 2 ||
                                            pageNum === pagination.totalPages - 1
                                        ) {
                                            return <span key={pageNum}>...</span>;
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={pagination.currentPage === pagination.totalPages}
                                        style={pageButtonStyle(false)}
                                        onMouseEnter={(e) => {
                                            if (!e.target.disabled) {
                                                e.target.style.background = '#f0f0f0';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!e.target.disabled) {
                                                e.target.style.background = 'white';
                                            }
                                        }}
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Events;