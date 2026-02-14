const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add event name'],
        trim: true
    },
    organizer: {
        type: String,
        required: [true, 'Please add organizer name'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please add location'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Please add date and time']
    },
    description: {
        type: String,
        required: [true, 'Please add description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    capacity: {
        type: Number,
        required: [true, 'Please add total capacity']
    },
    availableSeats: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please add category'],
        enum: ['Conference', 'Workshop', 'Seminar', 'Networking', 'Social', 'Other']
    },
    image: {
        type: String,
        default: 'default-event.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);