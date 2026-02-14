const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { protect } = require('../middleware/auth');

// @route   GET /api/events/categories
// @desc    Get all unique categories
// @access  Public
router.get('/categories', async (req, res) => {
    try {
        const categories = await Event.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/events
// @desc    Get all events with search and filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, category, location, date, page = 1, limit = 9 } = req.query;
        
        let query = {};

        // Search by event name, description, organizer, or location
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { organizer: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category && category !== 'all') {
            query.category = category;
        }

        // Filter by location
        if (location && location !== 'all') {
            query.location = { $regex: location, $options: 'i' };
        }

        // Filter by date
        if (date && date !== 'all') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            
            const nextMonth = new Date(today);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            
            switch(date) {
                case 'today':
                    query.date = {
                        $gte: today,
                        $lt: tomorrow
                    };
                    break;
                case 'tomorrow':
                    const dayAfterTomorrow = new Date(tomorrow);
                    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
                    query.date = {
                        $gte: tomorrow,
                        $lt: dayAfterTomorrow
                    };
                    break;
                case 'this-week':
                    query.date = {
                        $gte: today,
                        $lt: nextWeek
                    };
                    break;
                case 'this-month':
                    query.date = {
                        $gte: today,
                        $lt: nextMonth
                    };
                    break;
                default:
                    // If date is 'all' or invalid, don't add date filter
                    break;
            }
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Get total count for pagination
        const total = await Event.countDocuments(query);
        
        // Get events
        const events = await Event.find(query)
            .sort({ date: 1 })
            .limit(parseInt(limit))
            .skip(skip);

        // Get unique locations for filter (from all events, not just paginated)
        const allEvents = await Event.find({});
        const uniqueLocations = [...new Set(allEvents.map(e => e.location.split(',').pop().trim()))];

        res.json({
            events,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalEvents: total,
            locations: uniqueLocations
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Private
router.post('/:id/register', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if event date has passed
        if (new Date(event.date) < new Date()) {
            return res.status(400).json({ message: 'Cannot register for past events' });
        }

        // Check if seats are available
        if (event.availableSeats <= 0) {
            return res.status(400).json({ message: 'No seats available' });
        }

        // Check if user is already registered
        const existingRegistration = await Registration.findOne({
            user: req.user._id,
            event: event._id,
            status: 'confirmed'
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Create registration
        const registration = await Registration.create({
            user: req.user._id,
            event: event._id,
            status: 'confirmed'
        });

        // Update available seats
        event.availableSeats -= 1;
        await event.save();

        // Populate event details for response
        await registration.populate('event');

        res.status(201).json({
            message: 'Successfully registered for event',
            registration
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/events/:id/register
// @desc    Cancel event registration
// @access  Private
router.delete('/:id/register', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if event date has passed
        if (new Date(event.date) < new Date()) {
            return res.status(400).json({ message: 'Cannot cancel registration for past events' });
        }

        // Find and delete registration
        const registration = await Registration.findOneAndDelete({
            user: req.user._id,
            event: event._id,
            status: 'confirmed'
        });

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Update available seats
        event.availableSeats += 1;
        await event.save();

        res.json({ message: 'Registration cancelled successfully' });
    } catch (error) {
        console.error('Cancellation error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/events/locations/all
// @desc    Get all unique locations
// @access  Public
router.get('/locations/all', async (req, res) => {
    try {
        const events = await Event.find({});
        const locations = [...new Set(events.map(e => e.location.split(',').pop().trim()))];
        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;