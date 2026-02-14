const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { protect } = require('../middleware/auth');

// @route   GET /api/dashboard/registrations
// @desc    Get user's registered events (upcoming and past)
// @access  Private
router.get('/registrations', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ 
            user: req.user._id,
            status: 'confirmed'
        }).populate('event');

        const now = new Date();
        const upcoming = [];
        const past = [];

        registrations.forEach(reg => {
            if (reg.event) {
                if (new Date(reg.event.date) >= now) {
                    upcoming.push(reg);
                } else {
                    past.push(reg);
                }
            }
        });

        // Sort upcoming by date ascending (nearest first)
        upcoming.sort((a, b) => new Date(a.event.date) - new Date(b.event.date));
        
        // Sort past by date descending (most recent first)
        past.sort((a, b) => new Date(b.event.date) - new Date(a.event.date));

        res.json({
            success: true,
            upcoming,
            past,
            totalUpcoming: upcoming.length,
            totalPast: past.length,
            totalRegistrations: registrations.length
        });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching registrations' 
        });
    }
});

// @route   GET /api/dashboard/summary
// @desc    Get dashboard summary statistics
// @access  Private
router.get('/summary', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ 
            user: req.user._id,
            status: 'confirmed'
        }).populate('event');

        const now = new Date();
        
        const upcoming = registrations.filter(reg => {
            return reg.event && new Date(reg.event.date) >= now;
        });
        
        const past = registrations.filter(reg => {
            return reg.event && new Date(reg.event.date) < now;
        });

        // Sort upcoming to find the next event
        upcoming.sort((a, b) => new Date(a.event.date) - new Date(b.event.date));
        
        // Get the next upcoming event (if any)
        const nextEvent = upcoming.length > 0 ? upcoming[0].event : null;

        // Calculate additional stats
        const totalSeats = registrations.reduce((sum, reg) => sum + (reg.event?.capacity || 0), 0);
        const averageCapacity = registrations.length > 0 
            ? Math.round(totalSeats / registrations.length) 
            : 0;

        res.json({
            success: true,
            totalRegistrations: registrations.length,
            upcomingCount: upcoming.length,
            pastCount: past.length,
            nextEvent,
            statistics: {
                totalSeats,
                averageCapacity,
                hasEvents: registrations.length > 0
            }
        });
    } catch (error) {
        console.error('Error fetching summary:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching summary' 
        });
    }
});

// @route   GET /api/dashboard/registrations/:eventId
// @desc    Check if user is registered for a specific event
// @access  Private
router.get('/registrations/:eventId', protect, async (req, res) => {
    try {
        const registration = await Registration.findOne({
            user: req.user._id,
            event: req.params.eventId,
            status: 'confirmed'
        }).populate('event');

        res.json({
            success: true,
            isRegistered: !!registration,
            registration: registration || null
        });
    } catch (error) {
        console.error('Error checking registration:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while checking registration' 
        });
    }
});

// @route   GET /api/dashboard/stats/monthly
// @desc    Get monthly registration statistics
// @access  Private
router.get('/stats/monthly', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ 
            user: req.user._id,
            status: 'confirmed'
        }).populate('event');

        // Group registrations by month
        const monthlyStats = {};
        
        registrations.forEach(reg => {
            if (reg.event) {
                const date = new Date(reg.event.date);
                const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
                
                if (!monthlyStats[monthYear]) {
                    monthlyStats[monthYear] = {
                        month: monthYear,
                        total: 0,
                        upcoming: 0,
                        past: 0
                    };
                }
                
                monthlyStats[monthYear].total += 1;
                
                if (date >= new Date()) {
                    monthlyStats[monthYear].upcoming += 1;
                } else {
                    monthlyStats[monthYear].past += 1;
                }
            }
        });

        // Convert to array and sort by date
        const statsArray = Object.values(monthlyStats).sort((a, b) => {
            const dateA = new Date(a.month);
            const dateB = new Date(b.month);
            return dateB - dateA;
        });

        res.json({
            success: true,
            monthlyStats: statsArray
        });
    } catch (error) {
        console.error('Error fetching monthly stats:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching monthly statistics' 
        });
    }
});

// @route   GET /api/dashboard/upcoming/next
// @desc    Get only the next upcoming event
// @access  Private
router.get('/upcoming/next', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ 
            user: req.user._id,
            status: 'confirmed'
        }).populate('event');

        const now = new Date();
        
        const upcoming = registrations
            .filter(reg => reg.event && new Date(reg.event.date) >= now)
            .sort((a, b) => new Date(a.event.date) - new Date(b.event.date));

        const nextEvent = upcoming.length > 0 ? upcoming[0].event : null;

        res.json({
            success: true,
            hasNextEvent: !!nextEvent,
            nextEvent
        });
    } catch (error) {
        console.error('Error fetching next event:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching next event' 
        });
    }
});

// @route   GET /api/dashboard/past/recent
// @desc    Get recent past events (last 5)
// @access  Private
router.get('/past/recent', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ 
            user: req.user._id,
            status: 'confirmed'
        }).populate('event');

        const now = new Date();
        
        const past = registrations
            .filter(reg => reg.event && new Date(reg.event.date) < now)
            .sort((a, b) => new Date(b.event.date) - new Date(a.event.date))
            .slice(0, 5); // Get only the 5 most recent

        res.json({
            success: true,
            recentPastEvents: past.map(reg => reg.event)
        });
    } catch (error) {
        console.error('Error fetching recent past events:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching recent past events' 
        });
    }
});

module.exports = router;