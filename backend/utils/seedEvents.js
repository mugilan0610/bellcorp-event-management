const mongoose = require('mongoose');
const EventModel = require('../models/Event');
require('dotenv').config();

const events = [
    // ============ PAST EVENTS (January - Early February 2026) ============
    {
        name: 'New Year Tech Conference 2026',
        organizer: 'Tech Innovators India',
        location: 'Convention Centre, Delhi',
        date: new Date('2026-01-05T09:00:00'),
        description: 'Kickstart 2026 with the latest in AI, ML, and tech innovations. Featured speakers from Google and Microsoft.',
        capacity: 800,
        availableSeats: 0,
        category: 'Conference',
        image: 'newyear-tech.jpg'
    },
    {
        name: 'Winter Music Festival',
        organizer: 'Live Entertainment',
        location: 'Marine Drive, Mumbai',
        date: new Date('2026-01-10T18:00:00'),
        description: 'Three days of amazing music with top Bollywood singers and international DJs.',
        capacity: 5000,
        availableSeats: 0,
        category: 'Social',
        image: 'winter-music.jpg'
    },
    {
        name: 'Startup Pitch Competition',
        organizer: 'TiE Mumbai',
        location: 'WeWork, BKC, Mumbai',
        date: new Date('2026-01-12T10:00:00'),
        description: 'Early-stage startups pitch to top VCs for funding opportunities.',
        capacity: 150,
        availableSeats: 0,
        category: 'Networking',
        image: 'startup-pitch.jpg'
    },
    {
        name: 'Yoga Wellness Retreat',
        organizer: 'Art of Living',
        location: 'Bengaluru Ashram, Karnataka',
        date: new Date('2026-01-15T06:00:00'),
        description: 'Week-long yoga and meditation retreat for mind-body wellness.',
        capacity: 200,
        availableSeats: 0,
        category: 'Workshop',
        image: 'yoga-retreat.jpg'
    },
    {
        name: 'Digital Marketing Summit',
        organizer: 'Google India',
        location: 'Hyderabad International Convention Centre',
        date: new Date('2026-01-18T09:30:00'),
        description: 'Learn latest digital marketing trends from industry experts.',
        capacity: 400,
        availableSeats: 0,
        category: 'Seminar',
        image: 'digital-marketing.jpg'
    },
    {
        name: 'Chennai Classical Dance Festival',
        organizer: 'Kalakshetra Foundation',
        location: 'Kalakshetra Campus, Chennai',
        date: new Date('2026-01-20T18:00:00'),
        description: 'Bharatanatyam and other classical dance performances.',
        capacity: 600,
        availableSeats: 0,
        category: 'Social',
        image: 'chennai-dance.jpg'
    },
    {
        name: 'AI in Healthcare Workshop',
        organizer: 'MedTech Association',
        location: 'IMS, Bhubaneswar',
        date: new Date('2026-01-22T10:00:00'),
        description: 'Hands-on workshop on AI applications in healthcare.',
        capacity: 100,
        availableSeats: 0,
        category: 'Workshop',
        image: 'ai-healthcare.jpg'
    },
    {
        name: 'Jaipur Literature Festival',
        organizer: 'Teamwork Arts',
        location: 'Diggi Palace, Jaipur',
        date: new Date('2026-01-24T09:00:00'),
        description: 'World\'s largest free literary festival with authors from 30+ countries.',
        capacity: 2000,
        availableSeats: 0,
        category: 'Conference',
        image: 'jaipur-lit.jpg'
    },
    {
        name: 'Pune Startup Networking Night',
        organizer: 'Startup Pune',
        location: 'The Corinthian, Pune',
        date: new Date('2026-01-25T19:00:00'),
        description: 'Evening networking with founders, investors, and tech professionals.',
        capacity: 250,
        availableSeats: 0,
        category: 'Networking',
        image: 'pune-networking.jpg'
    },
    {
        name: 'Kolkata Book Fair 2026',
        organizer: 'Publishers Guild',
        location: 'Central Park, Kolkata',
        date: new Date('2026-01-28T11:00:00'),
        description: 'Asia\'s largest book fair with thousands of publishers.',
        capacity: 20000,
        availableSeats: 0,
        category: 'Social',
        image: 'kolkata-book.jpg'
    },
    {
        name: 'Gujarat Global Summit',
        organizer: 'Government of Gujarat',
        location: 'Mahatma Mandir, Gandhinagar',
        date: new Date('2026-02-01T09:00:00'),
        description: 'International business summit with delegates from 50+ countries.',
        capacity: 5000,
        availableSeats: 0,
        category: 'Conference',
        image: 'gujarat-summit.jpg'
    },
    {
        name: 'Goa Beach Festival',
        organizer: 'Goa Tourism',
        location: 'Calangute Beach, Goa',
        date: new Date('2026-02-03T16:00:00'),
        description: 'Beach party with water sports, music, and seafood festival.',
        capacity: 3000,
        availableSeats: 0,
        category: 'Social',
        image: 'goa-beach.jpg'
    },
    {
        name: 'Women Entrepreneurship Summit',
        organizer: 'WE Foundation',
        location: 'Leela Palace, Bengaluru',
        date: new Date('2026-02-05T09:30:00'),
        description: 'Celebrating women entrepreneurs and leaders in business.',
        capacity: 400,
        availableSeats: 0,
        category: 'Conference',
        image: 'women-summit.jpg'
    },
    {
        name: 'Lucknow Food Festival',
        organizer: 'UP Tourism',
        location: 'Janeshwar Park, Lucknow',
        date: new Date('2026-02-07T12:00:00'),
        description: 'Awadhi cuisine festival with 200+ food stalls.',
        capacity: 5000,
        availableSeats: 0,
        category: 'Social',
        image: 'lucknow-food.jpg'
    },
    {
        name: 'Bhopal Lake Festival',
        organizer: 'MP Tourism',
        location: 'Upper Lake, Bhopal',
        date: new Date('2026-02-08T15:00:00'),
        description: 'Boating, cultural events, and food at beautiful Upper Lake.',
        capacity: 2000,
        availableSeats: 0,
        category: 'Social',
        image: 'bhopal-lake.jpg'
    },
    {
        name: 'Cyber Security Conference',
        organizer: 'Data Security Council',
        location: 'HICC, Hyderabad',
        date: new Date('2026-02-10T09:00:00'),
        description: 'Latest trends in cybersecurity and data protection.',
        capacity: 500,
        availableSeats: 0,
        category: 'Conference',
        image: 'cyber-security.jpg'
    },
    {
        name: 'Ranchi Tribal Art Exhibition',
        organizer: 'Jharkhand Tourism',
        location: 'Rock Garden, Ranchi',
        date: new Date('2026-02-11T10:00:00'),
        description: 'Exhibition of authentic tribal paintings and handicrafts.',
        capacity: 800,
        availableSeats: 0,
        category: 'Social',
        image: 'ranchi-art.jpg'
    },
    {
        name: 'Patna Business Summit',
        organizer: 'Bihar Industries',
        location: 'Bihar Museum, Patna',
        date: new Date('2026-02-12T09:30:00'),
        description: 'Investment opportunities in Eastern India.',
        capacity: 300,
        availableSeats: 0,
        category: 'Conference',
        image: 'patna-summit.jpg'
    },

    // ============ CURRENT EVENTS (14th February 2026 - Today) ============
    {
        name: 'Valentine\'s Day Special Music Night',
        organizer: 'Live Events India',
        location: 'Jawaharlal Nehru Stadium, Delhi',
        date: new Date('2026-02-14T19:00:00'),
        description: 'Romantic evening with live performances by Arijit Singh and Shreya Ghoshal. Special Valentine\'s Day celebration.',
        capacity: 5000,
        availableSeats: 1234,
        category: 'Social',
        image: 'valentine-music.jpg'
    },
    {
        name: 'Tech Job Fair 2026',
        organizer: 'NASSCOM',
        location: 'BIEC, Bengaluru',
        date: new Date('2026-02-14T09:00:00'),
        description: '50+ tech companies hiring for 1000+ positions. On-the-spot interviews.',
        capacity: 3000,
        availableSeats: 856,
        category: 'Networking',
        image: 'tech-jobfair.jpg'
    },
    {
        name: 'Valentine\'s Day Couple Workshop',
        organizer: 'Love & Relationships',
        location: 'The Park, Kolkata',
        date: new Date('2026-02-14T15:00:00'),
        description: 'Relationship building workshop for couples with expert counselors.',
        capacity: 100,
        availableSeats: 34,
        category: 'Workshop',
        image: 'couple-workshop.jpg'
    },
    {
        name: 'Morning Yoga Session',
        organizer: 'Yoga Alliance',
        location: 'Marine Drive, Mumbai',
        date: new Date('2026-02-14T06:30:00'),
        description: 'Sunrise yoga session by the sea. Special Valentine\'s Day flow.',
        capacity: 200,
        availableSeats: 67,
        category: 'Workshop',
        image: 'morning-yoga.jpg'
    },
    {
        name: 'Startup Demo Day',
        organizer: 'IIM Ahmedabad',
        location: 'IIM Ahmedabad Campus',
        date: new Date('2026-02-14T10:00:00'),
        description: '20 early-stage startups pitch to top investors.',
        capacity: 300,
        availableSeats: 89,
        category: 'Networking',
        image: 'startup-demo.jpg'
    },
    {
        name: 'Food Truck Festival',
        organizer: 'Street Food Association',
        location: 'Phoenix Marketcity, Chennai',
        date: new Date('2026-02-14T12:00:00'),
        description: '50+ food trucks serving cuisines from around the world.',
        capacity: 2000,
        availableSeats: 567,
        category: 'Social',
        image: 'food-truck.jpg'
    },
    {
        name: 'Photography Workshop',
        organizer: 'National Geographic',
        location: 'Sanskriti Bhawan, Bhopal',
        date: new Date('2026-02-14T09:30:00'),
        description: 'Learn professional photography from NatGeo photographers.',
        capacity: 80,
        availableSeats: 23,
        category: 'Workshop',
        image: 'photography.jpg'
    },
    {
        name: 'Valentine\'s Day Paint Night',
        organizer: 'Art Café',
        location: 'Kala Ghoda, Mumbai',
        date: new Date('2026-02-14T17:00:00'),
        description: 'Couples painting session with wine and music.',
        capacity: 60,
        availableSeats: 18,
        category: 'Workshop',
        image: 'paint-night.jpg'
    },
    {
        name: 'Chess Tournament',
        organizer: 'All India Chess Federation',
        location: 'Nehru Centre, Mumbai',
        date: new Date('2026-02-14T10:00:00'),
        description: 'Open chess tournament with cash prizes.',
        capacity: 200,
        availableSeats: 45,
        category: 'Other',
        image: 'chess.jpg'
    },
    {
        name: 'Meditation Camp',
        organizer: 'Vipassana Centre',
        location: 'Igatpuri, Maharashtra',
        date: new Date('2026-02-14T04:00:00'),
        description: 'One-day meditation and mindfulness retreat.',
        capacity: 150,
        availableSeats: 56,
        category: 'Workshop',
        image: 'meditation.jpg'
    },

    // ============ UPCOMING EVENTS (15th February - March 2026) ============
    {
        name: 'International Film Festival',
        organizer: 'Ministry of Information',
        location: 'Siri Fort Auditorium, Delhi',
        date: new Date('2026-02-15T10:00:00'),
        description: 'Films from 40+ countries with special screenings and director interactions.',
        capacity: 1000,
        availableSeats: 750,
        category: 'Social',
        image: 'film-fest.jpg'
    },
    {
        name: 'Blockchain Summit 2026',
        organizer: 'Crypto Alliance',
        location: 'JW Marriott, Mumbai',
        date: new Date('2026-02-16T09:00:00'),
        description: 'Explore blockchain technology and cryptocurrency trends.',
        capacity: 500,
        availableSeats: 320,
        category: 'Conference',
        image: 'blockchain.jpg'
    },
    {
        name: 'Pune Literature Festival',
        organizer: 'Pune Lit Fest',
        location: 'FTI, Pune',
        date: new Date('2026-02-17T09:30:00'),
        description: 'Three days of literary discussions and book launches.',
        capacity: 800,
        availableSeats: 450,
        category: 'Conference',
        image: 'pune-lit.jpg'
    },
    {
        name: 'Robotics Workshop for Kids',
        organizer: 'STEM India',
        location: 'Innovation Centre, Bengaluru',
        date: new Date('2026-02-18T10:00:00'),
        description: 'Hands-on robotics workshop for children aged 10-15.',
        capacity: 100,
        availableSeats: 67,
        category: 'Workshop',
        image: 'robotics-kids.jpg'
    },
    {
        name: 'South Indian Dance Festival',
        organizer: 'Natya Tarangini',
        location: 'Music Academy, Chennai',
        date: new Date('2026-02-19T18:00:00'),
        description: 'Classical dance performances by renowned artists.',
        capacity: 600,
        availableSeats: 320,
        category: 'Social',
        image: 'south-dance.jpg'
    },
    {
        name: 'Agri-Tech Conference',
        organizer: 'ICAR',
        location: 'PUSA Campus, Delhi',
        date: new Date('2026-02-20T09:00:00'),
        description: 'Latest innovations in agricultural technology.',
        capacity: 400,
        availableSeats: 210,
        category: 'Conference',
        image: 'agri-tech.jpg'
    },
    {
        name: 'Kochi Biennale',
        organizer: 'Kochi Foundation',
        location: 'Fort Kochi, Kerala',
        date: new Date('2026-02-21T10:00:00'),
        description: 'Contemporary art exhibition featuring international artists.',
        capacity: 3000,
        availableSeats: 1800,
        category: 'Social',
        image: 'kochi-art.jpg'
    },
    {
        name: 'Digital India Summit',
        organizer: 'MeitY',
        location: 'Pragati Maidan, Delhi',
        date: new Date('2026-02-22T09:30:00'),
        description: 'Government initiative on digital transformation.',
        capacity: 2000,
        availableSeats: 1200,
        category: 'Conference',
        image: 'digital-india.jpg'
    },
    {
        name: 'Varanasi Classical Music Festival',
        organizer: 'UP Culture',
        location: 'Assi Ghat, Varanasi',
        date: new Date('2026-02-23T17:00:00'),
        description: 'Evening of Hindustani classical music by the Ganges.',
        capacity: 1500,
        availableSeats: 890,
        category: 'Social',
        image: 'varanasi-music.jpg'
    },
    {
        name: 'HR Conclave 2026',
        organizer: 'SHRM India',
        location: 'The Leela, Bengaluru',
        date: new Date('2026-02-24T09:00:00'),
        description: 'Future of work and HR practices.',
        capacity: 300,
        availableSeats: 145,
        category: 'Conference',
        image: 'hr-conclave.jpg'
    },
    {
        name: 'Ahmedabad Textile Expo',
        organizer: 'GCCI',
        location: 'HEM Exhibitions, Ahmedabad',
        date: new Date('2026-02-25T10:00:00'),
        description: 'India\'s largest textile exhibition.',
        capacity: 4000,
        availableSeats: 2500,
        category: 'Other',
        image: 'textile-expo.jpg'
    },
    {
        name: 'Mumbai Marathon 2026',
        organizer: 'Mumbai Runners',
        location: 'CST to Bandra, Mumbai',
        date: new Date('2026-02-26T05:30:00'),
        description: 'Annual Mumbai Marathon with full and half marathon.',
        capacity: 10000,
        availableSeats: 4500,
        category: 'Social',
        image: 'marathon.jpg'
    },
    {
        name: 'Shimla Winter Carnival',
        organizer: 'HP Tourism',
        location: 'The Ridge, Shimla',
        date: new Date('2026-02-27T10:00:00'),
        description: 'Snow festival with cultural performances and food.',
        capacity: 2000,
        availableSeats: 1200,
        category: 'Social',
        image: 'shimla-carnival.jpg'
    },
    {
        name: 'Women in Tech Conference',
        organizer: 'Google Women Techmakers',
        location: 'Google Office, Hyderabad',
        date: new Date('2026-02-28T09:00:00'),
        description: 'Empowering women in technology careers.',
        capacity: 400,
        availableSeats: 230,
        category: 'Conference',
        image: 'women-tech.jpg'
    },
    {
        name: 'Nagpur Orange Festival',
        organizer: 'Maharashtra Tourism',
        location: 'Seminary Hill, Nagpur',
        date: new Date('2026-03-01T10:00:00'),
        description: 'Celebration of Nagpur\'s famous oranges.',
        capacity: 3000,
        availableSeats: 1800,
        category: 'Social',
        image: 'nagpur-orange.jpg'
    },
    {
        name: 'Surat Diamond Workshop',
        organizer: 'Surat Diamond Association',
        location: 'Sarthana Park, Surat',
        date: new Date('2026-03-02T11:00:00'),
        description: 'Learn diamond cutting and jewelry design.',
        capacity: 100,
        availableSeats: 65,
        category: 'Workshop',
        image: 'surat-diamond.jpg'
    },
    {
        name: 'Guwahati Tea Festival',
        organizer: 'Tea Board India',
        location: 'Tea Auction Centre, Guwahati',
        date: new Date('2026-03-03T10:00:00'),
        description: 'Tea tasting and auction workshop.',
        capacity: 200,
        availableSeats: 120,
        category: 'Social',
        image: 'guwahati-tea.jpg'
    },
    {
        name: 'Mysore Yoga Retreat',
        organizer: 'Sri Patanjali Yog Peeth',
        location: 'Mysore Palace Road, Mysore',
        date: new Date('2026-03-04T06:00:00'),
        description: 'Week-long yoga and meditation retreat.',
        capacity: 150,
        availableSeats: 90,
        category: 'Workshop',
        image: 'mysore-yoga.jpg'
    },
    {
        name: 'Bhubaneswar Dance Festival',
        organizer: 'Odisha Tourism',
        location: 'Mukteshwar Temple, Bhubaneswar',
        date: new Date('2026-03-05T18:00:00'),
        description: 'Odissi classical dance performances.',
        capacity: 800,
        availableSeats: 450,
        category: 'Social',
        image: 'bhubaneswar-dance.jpg'
    },
    {
        name: 'Indore Startup Meetup',
        organizer: 'TiE Indore',
        location: 'Indore Marriott',
        date: new Date('2026-03-06T18:00:00'),
        description: 'Networking event for startups and investors.',
        capacity: 200,
        availableSeats: 110,
        category: 'Networking',
        image: 'indore-startup.jpg'
    },
    {
        name: 'Amritsar Sikh Heritage Seminar',
        organizer: 'SGPC',
        location: 'GNDU, Amritsar',
        date: new Date('2026-03-07T10:00:00'),
        description: 'Seminar on Sikh history and culture.',
        capacity: 300,
        availableSeats: 180,
        category: 'Seminar',
        image: 'amritsar-seminar.jpg'
    },
    {
        name: 'Raipur Food Festival',
        organizer: 'Chhattisgarh Tourism',
        location: 'Science College Ground, Raipur',
        date: new Date('2026-03-08T11:00:00'),
        description: 'Chhattisgarh cuisine and cultural programs.',
        capacity: 1500,
        availableSeats: 900,
        category: 'Social',
        image: 'raipur-food.jpg'
    },
    {
        name: 'Thiruvananthapuram Job Fair',
        organizer: 'Technopark',
        location: 'Technopark Phase 1, Trivandrum',
        date: new Date('2026-03-09T09:00:00'),
        description: '50+ IT companies hiring for 1000+ positions.',
        capacity: 2000,
        availableSeats: 1200,
        category: 'Networking',
        image: 'trivandrum-job.jpg'
    },
    {
        name: 'Shillong Spring Festival',
        organizer: 'Meghalaya Tourism',
        location: 'Ward\'s Lake, Shillong',
        date: new Date('2026-03-10T10:00:00'),
        description: 'Celebrate spring in Scotland of the East.',
        capacity: 1000,
        availableSeats: 600,
        category: 'Social',
        image: 'shillong-spring.jpg'
    },
    {
        name: 'Vizag Beach Festival',
        organizer: 'AP Tourism',
        location: 'RK Beach, Visakhapatnam',
        date: new Date('2026-03-11T16:00:00'),
        description: 'Beach games, music, and seafood festival.',
        capacity: 3000,
        availableSeats: 1800,
        category: 'Social',
        image: 'vizag-beach.jpg'
    }
];

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        await EventModel.deleteMany({});
        console.log('✅ Cleared existing events');

        const result = await EventModel.insertMany(events);
        console.log(`✅ Successfully seeded ${result.length} events`);

        // Count events by status
        const now = new Date('2026-02-14'); // Today's date
        const pastEvents = events.filter(e => new Date(e.date) < now).length;
        const currentEvents = events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.toDateString() === now.toDateString();
        }).length;
        const upcomingEvents = events.filter(e => new Date(e.date) > now).length;

        console.log('\n📊 Event Distribution:');
        console.log(`   Past Events (before 14/02/2026): ${pastEvents}`);
        console.log(`   Current Events (14/02/2026): ${currentEvents}`);
        console.log(`   Upcoming Events (after 14/02/2026): ${upcomingEvents}`);
        console.log(`   Total Events: ${result.length}`);

        // Category distribution
        const categoryCount = {};
        events.forEach(event => {
            categoryCount[event.category] = (categoryCount[event.category] || 0) + 1;
        });
        console.log('\n📊 Category Distribution:');
        Object.entries(categoryCount).forEach(([category, count]) => {
            console.log(`   ${category}: ${count}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding events:', error.message);
        process.exit(1);
    }
};

seedEvents();