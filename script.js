// --- Mock Data ---
const flightData = [
    { id: 'SH101', origin: 'New York (JFK)', dest: 'London (LHR)', time: '08:00 AM', price: 450, status: 'On Time', type: 'Departure', date: '2024-05-20' },
    { id: 'SH204', origin: 'Tokyo (NRT)', dest: 'New York (JFK)', time: '09:30 AM', price: 800, status: 'Landed', type: 'Arrival', date: '2024-05-20' },
    { id: 'SH305', origin: 'New York (JFK)', dest: 'Paris (CDG)', time: '11:15 AM', price: 520, status: 'Delayed', type: 'Departure', date: '2024-05-20' },
    { id: 'SH112', origin: 'Dubai (DXB)', dest: 'New York (JFK)', time: '01:45 PM', price: 900, status: 'On Time', type: 'Arrival', date: '2024-05-20' },
    { id: 'SH404', origin: 'New York (JFK)', dest: 'Los Angeles (LAX)', time: '04:20 PM', price: 300, status: 'Scheduled', type: 'Departure', date: '2024-05-21' },
    { id: 'SH550', origin: 'Singapore (SIN)', dest: 'New York (JFK)', time: '06:00 PM', price: 1100, status: 'Scheduled', type: 'Arrival', date: '2024-05-21' },
    { id: 'SH601', origin: 'New York (JFK)', dest: 'Miami (MIA)', time: '08:00 PM', price: 150, status: 'Cancelled', type: 'Departure', date: '2024-05-21' },
];

const historyData = [
    { year: 1985, title: 'Foundation', desc: 'SkyHorizon was founded with a single propeller plane connecting islands.' },
    { year: 1995, title: 'International Expansion', desc: 'Launched first trans-atlantic flights to London and Paris.' },
    { year: 2010, title: 'Green Initiative', desc: 'Became the first airline to reduce carbon footprint by 20% using new engine tech.' },
    { year: 2023, title: 'Best Airline Award', desc: 'Voted #1 for customer satisfaction in the Global Aviation Awards.' }
];

// --- Router Logic ---
const app = document.getElementById('app');

function router(page) {
    // Update Active Nav
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav', 'text-blue-700'));
    const activeBtn = document.getElementById(`nav-${page}`);
    if(activeBtn) activeBtn.classList.add('active-nav', 'text-blue-700');

    // Hide Mobile Menu if open
    document.getElementById('mobile-menu').classList.add('hidden');

    // Render Page
    app.innerHTML = '';
    app.className = 'fade-in flex-grow'; // Reset class for animation

    switch(page) {
        case 'home':
            renderHome();
            break;
        case 'schedule':
            renderSchedule();
            break;
        case 'status':
            renderStatus();
            break;
        case 'history':
            renderHistory();
            break;
        default:
            renderHome();
    }
    window.scrollTo(0, 0);
}

// --- Page Render Functions ---

function renderHome() {
    app.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-bg h-[500px] flex items-center justify-center text-white text-center px-4">
            <div class="max-w-3xl">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">Discover the World with SkyHorizon</h1>
                <p class="text-lg md:text-xl mb-8 opacity-90">Experience comfort, luxury, and punctuality like never before.</p>
                <button onclick="router('schedule')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                    Book Your Flight
                </button>
            </div>
        </section>

        <!-- Features -->
        <section class="py-16 container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800">Why Fly With Us?</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <i class="fa-solid fa-couch text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Ultimate Comfort</h3>
                    <p class="text-gray-600">Extra legroom and premium seating in all classes.</p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <i class="fa-solid fa-tags text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Best Prices</h3>
                    <p class="text-gray-600">Competitive rates without compromising on quality.</p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <i class="fa-solid fa-clock text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Always On Time</h3>
                    <p class="text-gray-600">We value your time with industry-leading punctuality.</p>
                </div>
            </div>
        </section>
    `;
}

function renderSchedule() {
    // Filter only upcoming (Scheduled/Departure) suitable for booking
    const bookableFlights = flightData.filter(f => f.status !== 'Landed' && f.status !== 'Cancelled');

    let rows = bookableFlights.map(flight => `
        <div class="flight-card bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 transition duration-300">
            <div class="flex items-center gap-4 w-full md:w-auto">
                <div class="bg-gray-100 p-3 rounded-full">
                    <i class="fa-solid fa-plane-up text-blue-600 text-xl"></i>
                </div>
                <div>
                    <div class="font-bold text-lg">${flight.origin} <i class="fa-solid fa-arrow-right text-gray-400 mx-2"></i> ${flight.dest}</div>
                    <div class="text-sm text-gray-500">${flight.date} • ${flight.time} • Flight ${flight.id}</div>
                </div>
            </div>
            <div class="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div class="text-right">
                    <div class="text-2xl font-bold text-gray-800">$${flight.price}</div>
                    <div class="text-xs text-gray-500">per adult</div>
                </div>
                <button onclick="bookFlight('${flight.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition">
                    Select
                </button>
            </div>
        </div>
    `).join('');

    app.innerHTML = `
        <section class="bg-blue-600 py-12 text-white text-center">
            <h1 class="text-3xl font-bold">Flight Schedule & Booking</h1>
            <p class="opacity-80 mt-2">Find your next adventure</p>
        </section>
        <div class="container mx-auto px-6 py-10">
            <div class="space-y-4 max-w-4xl mx-auto">
                ${rows}
            </div>
        </div>
    `;
}

function renderStatus() {
    app.innerHTML = `
        <section class="bg-gray-800 py-12 text-white text-center">
            <h1 class="text-3xl font-bold">Arrivals & Departures Board</h1>
            <p class="opacity-80 mt-2">Live flight status updates</p>
        </section>
        
        <div class="container mx-auto px-6 py-10">
            <!-- Filters -->
            <div class="flex justify-center mb-8 gap-4">
                <button onclick="filterStatus('All')" class="status-filter active-filter px-6 py-2 rounded-full bg-blue-600 text-white shadow">All</button>
                <button onclick="filterStatus('Arrival')" class="status-filter px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 shadow">Arrivals</button>
                <button onclick="filterStatus('Departure')" class="status-filter px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 shadow">Departures</button>
            </div>

            <div class="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                            <th class="p-4 border-b">Flight</th>
                            <th class="p-4 border-b">Type</th>
                            <th class="p-4 border-b">Origin / Destination</th>
                            <th class="p-4 border-b">Time</th>
                            <th class="p-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody id="status-table-body">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    updateStatusTable(flightData);
}

function renderHistory() {
    let timeline = historyData.map((item, index) => `
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <!-- Icon -->
            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <i class="fa-solid fa-calendar text-white text-xs"></i>
            </div>
            <!-- Card -->
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div class="flex items-center justify-between space-x-2 mb-1">
                    <div class="font-bold text-gray-900">${item.title}</div>
                    <time class="font-caveat font-medium text-blue-600">${item.year}</time>
                </div>
                <div class="text-gray-500 text-sm">${item.desc}</div>
            </div>
        </div>
    `).join('');

    app.innerHTML = `
        <section class="bg-white py-12 text-center border-b">
            <h1 class="text-3xl font-bold text-gray-800">Our History</h1>
            <p class="text-gray-500 mt-2">The journey of SkyHorizon from 1985 to today.</p>
        </section>
        <div class="container mx-auto px-6 py-12">
             <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                ${timeline}
             </div>
        </div>
    `;
}

// --- Helper Functions ---

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function filterStatus(type) {
    // UI Toggle
    document.querySelectorAll('.status-filter').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
        if(btn.innerText.includes(type)) {
            btn.classList.remove('bg-white', 'text-gray-700');
            btn.classList.add('bg-blue-600', 'text-white');
        }
    });

    // Logic
    if(type === 'All') {
        updateStatusTable(flightData);
    } else {
        const filtered = flightData.filter(f => f.type === type);
        updateStatusTable(filtered);
    }
}

function updateStatusTable(data) {
    const tbody = document.getElementById('status-table-body');
    tbody.innerHTML = data.map(flight => {
        // Color code status
        let statusColor = 'text-gray-600 bg-gray-100';
        if(flight.status === 'On Time') statusColor = 'text-green-700 bg-green-100';
        if(flight.status === 'Delayed') statusColor = 'text-yellow-700 bg-yellow-100';
        if(flight.status === 'Cancelled') statusColor = 'text-red-700 bg-red-100';
        if(flight.status === 'Landed') statusColor = 'text-blue-700 bg-blue-100';

        return `
        <tr class="border-b hover:bg-gray-50 transition">
            <td class="p-4 font-mono font-bold text-gray-700">${flight.id}</td>
            <td class="p-4 text-sm">${flight.type === 'Arrival' ? '<i class="fa-solid fa-plane-arrival text-green-500 mr-2"></i>Arrival' : '<i class="fa-solid fa-plane-departure text-blue-500 mr-2"></i>Departure'}</td>
            <td class="p-4 font-medium">${flight.origin} <i class="fa-solid fa-arrow-right text-xs text-gray-400 mx-2"></i> ${flight.dest}</td>
            <td class="p-4">${flight.time}</td>
            <td class="p-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusColor}">${flight.status}</span>
            </td>
        </tr>
        `;
    }).join('');
}

function bookFlight(id) {
    const flight = flightData.find(f => f.id === id);
    if(confirm(`Would you like to book Flight ${flight.id} to ${flight.dest} for $${flight.price}?`)) {
        alert("Booking Successful! Thank you for choosing SkyHorizon.");
    }
}

// Initialize
window.onload = () => router('home');