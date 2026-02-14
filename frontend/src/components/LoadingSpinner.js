import React from 'react';

const LoadingSpinner = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        width: '100%'
    };

    const spinnerStyle = {
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    const keyframesStyle = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={containerStyle}>
                <div style={spinnerStyle}></div>
            </div>
        </>
    );
};

export default LoadingSpinner;