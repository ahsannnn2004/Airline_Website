// --- 1. DATA (Database of Flights & History) ---
const flightData = [
    { id: 'SK101', origin: 'Karachi (KHI)', dest: 'Dubai (DXB)', time: '04:00 AM', price: 250, discount: 10, status: 'On Time', type: 'Departure', date: '2024-06-10' },
    { id: 'SK102', origin: 'Delhi (DEL)', dest: 'Bangkok (BKK)', time: '06:30 AM', price: 320, discount: 0, status: 'Delayed', type: 'Departure', date: '2024-06-10' },
    { id: 'SK103', origin: 'Dhaka (DAC)', dest: 'Kuala Lumpur (KUL)', time: '08:15 AM', price: 280, discount: 15, status: 'On Time', type: 'Departure', date: '2024-06-10' },
    { id: 'SK104', origin: 'Mumbai (BOM)', dest: 'Singapore (SIN)', time: '09:00 AM', price: 400, discount: 0, status: 'Scheduled', type: 'Departure', date: '2024-06-10' },
    { id: 'SK105', origin: 'Colombo (CMB)', dest: 'Male (MLE)', time: '10:45 AM', price: 150, discount: 5, status: 'On Time', type: 'Departure', date: '2024-06-10' },
    { id: 'SK106', origin: 'Lahore (LHE)', dest: 'Jeddah (JED)', time: '11:30 AM', price: 380, discount: 0, status: 'Scheduled', type: 'Departure', date: '2024-06-10' },
    { id: 'SK107', origin: 'Kathmandu (KTM)', dest: 'Delhi (DEL)', time: '12:00 PM', price: 120, discount: 0, status: 'On Time', type: 'Departure', date: '2024-06-11' },
    { id: 'SK108', origin: 'Kabul (KBL)', dest: 'Islamabad (ISB)', time: '01:15 PM', price: 180, discount: 0, status: 'Delayed', type: 'Departure', date: '2024-06-11' },
    { id: 'SK109', origin: 'Tehran (IKA)', dest: 'Istanbul (IST)', time: '02:45 PM', price: 350, discount: 20, status: 'On Time', type: 'Departure', date: '2024-06-11' },
    { id: 'SK110', origin: 'Yangon (RGN)', dest: 'Hanoi (HAN)', time: '04:20 PM', price: 210, discount: 0, status: 'Scheduled', type: 'Departure', date: '2024-06-11' },
    { id: 'SK111', origin: 'Beijing (PEK)', dest: 'Tokyo (NRT)', time: '05:00 PM', price: 500, discount: 10, status: 'On Time', type: 'Departure', date: '2024-06-11' },
    { id: 'SK112', origin: 'Phnom Penh (PNH)', dest: 'Ho Chi Minh (SGN)', time: '06:10 PM', price: 110, discount: 0, status: 'Scheduled', type: 'Departure', date: '2024-06-12' },
    { id: 'SK113', origin: 'Vientiane (VTE)', dest: 'Bangkok (BKK)', time: '07:30 PM', price: 130, discount: 5, status: 'On Time', type: 'Departure', date: '2024-06-12' },
    { id: 'SK114', origin: 'Karachi (KHI)', dest: 'London (LHR)', time: '09:00 PM', price: 700, discount: 0, status: 'On Time', type: 'Departure', date: '2024-06-12' },
    { id: 'SK115', origin: 'Chennai (MAA)', dest: 'Colombo (CMB)', time: '10:15 PM', price: 100, discount: 0, status: 'Scheduled', type: 'Departure', date: '2024-06-12' },
    { id: 'SK116', origin: 'Male (MLE)', dest: 'Dubai (DXB)', time: '11:45 PM', price: 450, discount: 25, status: 'On Time', type: 'Departure', date: '2024-06-12' },
    { id: 'SK117', origin: 'Bangkok (BKK)', dest: 'Phuket (HKT)', time: '07:00 AM', price: 80, discount: 0, status: 'On Time', type: 'Departure', date: '2024-06-13' },
    { id: 'SK118', origin: 'Hanoi (HAN)', dest: 'Seoul (ICN)', time: '09:30 AM', price: 340, discount: 10, status: 'Scheduled', type: 'Departure', date: '2024-06-13' },
    { id: 'SK119', origin: 'Islamabad (ISB)', dest: 'Beijing (PEK)', time: '02:00 PM', price: 550, discount: 0, status: 'On Time', type: 'Departure', date: '2024-06-13' },
    { id: 'SK120', origin: 'Dhaka (DAC)', dest: 'Chittagong (CGP)', time: '05:00 PM', price: 60, discount: 0, status: 'On Time', type: 'Departure', date: '2024-06-13' }
];

const historyEvents = [
    { year: 1990, title: 'Asian Roots', desc: 'Started as a small charter service connecting Karachi and Dubai.' },
    { year: 2005, title: 'Expansion East', desc: 'Launched direct routes to Bangkok, Kuala Lumpur, and Singapore.' },
    { year: 2015, title: 'Digital First', desc: 'Became the first South Asian airline to offer full mobile booking.' },
    { year: 2024, title: 'Green Skies', desc: 'Introduced fuel-efficient Neo engines for all regional flights.' }
];

// --- 2. AUTH SERVICE (Handling Login/Signup/Storage) ---
const AppService = {
    getUsers: () => JSON.parse(localStorage.getItem('sh_users') || '[]'),
    getCurrentUser: () => JSON.parse(localStorage.getItem('sh_currentUser')),
    getReviews: () => JSON.parse(localStorage.getItem('sh_reviews') || '[]'),
    
    signup: (username, password) => {
        const users = AppService.getUsers();
        if(users.find(u => u.username === username)) return { success: false, msg: "Username taken!" };
        users.push({ username, password, bookings: [] });
        localStorage.setItem('sh_users', JSON.stringify(users));
        return { success: true, msg: "Account created!" };
    },

    login: (username, password) => {
        const user = AppService.getUsers().find(u => u.username === username && u.password === password);
        if(user) {
            localStorage.setItem('sh_currentUser', JSON.stringify(user));
            updateNav();
            return { success: true };
        }
        return { success: false, msg: "Invalid credentials." };
    },

    logout: () => {
        localStorage.removeItem('sh_currentUser');
        updateNav();
        router('home');
        showToast("Logged out successfully");
    },

    bookFlight: (flight) => {
        const user = AppService.getCurrentUser();
        if(!user) return false;
        user.bookings.push({ ...flight, bookedDate: new Date().toLocaleDateString() });
        
        const users = AppService.getUsers();
        const idx = users.findIndex(u => u.username === user.username);
        users[idx] = user;
        
        localStorage.setItem('sh_users', JSON.stringify(users));
        localStorage.setItem('sh_currentUser', JSON.stringify(user));
        return true;
    },

    addReview: (text, rating) => {
        const user = AppService.getCurrentUser();
        if(!user) return false;
        const reviews = AppService.getReviews();
        reviews.push({ user: user.username, text, rating, date: new Date().toLocaleDateString() });
        localStorage.setItem('sh_reviews', JSON.stringify(reviews));
        return true;
    }
};

// --- 3. ROUTER & NAVIGATION (Switching pages) ---
const app = document.getElementById('app');

function updateNav() {
    const user = AppService.getCurrentUser();
    const desktopNav = document.getElementById('desktop-nav');
    const mobileNav = document.getElementById('mobile-menu');

    const commonLinks = `
        <button onclick="router('home')" id="nav-home" class="nav-btn font-semibold hover:text-blue-600 transition">Home</button>
        <button onclick="router('schedule')" id="nav-schedule" class="nav-btn font-semibold hover:text-blue-600 transition">Flights</button>
        <button onclick="router('reviews')" id="nav-reviews" class="nav-btn font-semibold hover:text-blue-600 transition">Reviews</button>
        <button onclick="router('history')" id="nav-history" class="nav-btn font-semibold hover:text-blue-600 transition">History</button>
    `;

    let authLinks = user 
        ? `<span class="text-blue-600 font-bold px-2 border-l border-gray-300">Hi, ${user.username}</span>
           <button onclick="AppService.logout()" class="text-red-500 hover:text-red-700 font-medium">Logout</button>`
        : `<button onclick="router('login')" class="text-gray-600 hover:text-blue-600 font-medium">Login</button>
           <button onclick="router('signup')" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition shadow-md">Sign Up</button>`;

    desktopNav.innerHTML = commonLinks + authLinks;
    // Adapt for mobile (change button classes)
    mobileNav.innerHTML = (commonLinks + authLinks).replace(/<button/g, '<button class="block w-full text-left py-2 px-4 hover:bg-gray-100 rounded"');
}

function router(page) {
    document.getElementById('mobile-menu').classList.add('hidden');
    app.className = 'fade-in flex-grow';
    window.scrollTo(0,0);
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));
    const active = document.getElementById(`nav-${page}`);
    if(active) active.classList.add('active-nav');

    const routes = {
        'home': renderHome,
        'schedule': renderSchedule,
        'reviews': renderReviews,
        'history': renderHistory,
        'login': renderLogin,
        'signup': renderSignup
    };

    if(routes[page]) routes[page]();
    else renderHome();
}

// --- 4. RENDER FUNCTIONS (Drawing HTML for pages) ---

function renderHome() {
    app.innerHTML = `
        <section class="hero-bg h-[600px] flex items-center justify-center text-white text-center px-4">
            <div class="max-w-4xl bg-black/30 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                <span class="bg-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Asia's Premium Carrier</span>
                <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">Explore the Wonders of <span class="text-blue-400">South Asia</span></h1>
                <p class="text-xl mb-8 text-gray-200">From the beaches of Maldives to the mountains of Pakistan.</p>
                <div class="flex flex-col md:flex-row gap-4 justify-center">
                    <button onclick="router('schedule')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition transform hover:scale-105">Book Now</button>
                    <button onclick="router('history')" class="bg-white hover:bg-gray-100 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg transition">Our Story</button>
                </div>
            </div>
        </section>

        <div class="container mx-auto py-16 px-6">
            <h2 class="text-3xl font-bold text-slate-800 text-center mb-12">Popular Destinations</h2>
            <div class="grid md:grid-cols-4 gap-6">
                ${['Thailand', 'Pakistan', 'Vietnam', 'Maldives'].map((place) => `
                    <div class="relative group overflow-hidden rounded-2xl shadow-lg h-64 cursor-pointer">
                        <img src="https://source.unsplash.com/800x600/?${place},landscape" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                            <h3 class="text-white text-2xl font-bold">${place}</h3>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderSchedule() {
    app.innerHTML = `
        <div class="bg-slate-900 text-white py-12 px-6">
            <div class="container mx-auto max-w-5xl">
                <h1 class="text-3xl font-bold mb-6">Find Your Flight</h1>
                <div class="bg-white p-4 rounded-xl flex flex-col md:flex-row gap-4 shadow-xl">
                    <div class="flex-1 relative">
                        <i class="fa-solid fa-plane-departure absolute left-4 top-4 text-gray-400"></i>
                        <input type="text" id="search-origin" placeholder="From (e.g. Karachi)" class="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 text-slate-800 focus:outline-none focus:border-blue-500">
                    </div>
                    <div class="flex-1 relative">
                        <i class="fa-solid fa-location-dot absolute left-4 top-4 text-gray-400"></i>
                        <input type="text" id="search-dest" placeholder="To (e.g. Bangkok)" class="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 text-slate-800 focus:outline-none focus:border-blue-500">
                    </div>
                    <button onclick="filterFlights()" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition">Search</button>
                </div>
            </div>
        </div>
        <div class="container mx-auto px-6 py-10 max-w-5xl" id="flight-list"></div>
    `;
    filterFlights(); // Initial render
}

function renderHistory() {
    const user = AppService.getCurrentUser();
    const bookings = user ? user.bookings.reverse() : [];

    let userHistoryHTML = '';
    if(user) {
        userHistoryHTML = `
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <i class="fa-solid fa-passport text-blue-600"></i> Your Travel History
                </h2>
                ${bookings.length === 0 ? '<p class="text-gray-500 italic">No flights booked yet.</p>' : 
                    `<div class="grid md:grid-cols-2 gap-4">
                        ${bookings.map(b => `
                            <div class="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm hover:shadow-md transition">
                                <div class="flex justify-between mb-2">
                                    <span class="font-bold text-lg text-slate-800">${b.origin} <i class="fa-solid fa-arrow-right text-gray-400 text-sm mx-2"></i> ${b.dest}</span>
                                    <span class="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded">Confirmed</span>
                                </div>
                                <div class="text-sm text-gray-500 flex justify-between">
                                    <span><i class="fa-regular fa-calendar mr-2"></i> ${b.date}</span>
                                    <span>Booked: ${b.bookedDate}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>`
                }
            </div>
        `;
    } else {
        userHistoryHTML = `
            <div class="bg-blue-50 border border-blue-100 p-8 rounded-xl text-center mb-16">
                <i class="fa-solid fa-lock text-4xl text-blue-300 mb-4"></i>
                <h3 class="text-xl font-bold text-blue-900">Login to see your travel history</h3>
                <button onclick="router('login')" class="mt-4 text-blue-600 font-semibold hover:underline">Login Now</button>
            </div>
        `;
    }

    const companyTimeline = historyEvents.map((e, i) => `
        <div class="flex gap-4 mb-8 relative">
            <div class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 z-10 relative shadow-lg ring-4 ring-white">
                ${e.year.toString().substr(2)}
            </div>
            ${i !== historyEvents.length -1 ? '<div class="absolute left-6 top-12 bottom-[-32px] w-0.5 bg-gray-200"></div>' : ''}
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-grow">
                <h3 class="font-bold text-lg text-slate-800">${e.title}</h3>
                <p class="text-gray-600 mt-1">${e.desc}</p>
                <span class="text-xs font-bold text-blue-500 mt-2 block">${e.year}</span>
            </div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="container mx-auto px-6 py-12 max-w-4xl">
            ${userHistoryHTML}
            <h2 class="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <i class="fa-solid fa-landmark text-blue-600"></i> The SkyHorizon Legacy
            </h2>
            <div class="pl-2">
                ${companyTimeline}
            </div>
        </div>
    `;
}

function renderReviews() {
    const user = AppService.getCurrentUser();
    const reviews = AppService.getReviews().reverse();

    const formHTML = user ? `
        <div class="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
            <h3 class="text-lg font-bold mb-4">Write a Review</h3>
            <div class="mb-4 flex gap-2" id="star-rating">
                ${[1,2,3,4,5].map(n => `<i class="fa-regular fa-star text-2xl cursor-pointer hover:text-yellow-400 text-gray-300 transition" onclick="setRating(${n})"></i>`).join('')}
            </div>
            <textarea id="review-text" class="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 mb-4" rows="3" placeholder="Share your experience..."></textarea>
            <button onclick="submitReview()" class="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition">Post Review</button>
        </div>
    ` : `<div class="bg-gray-100 p-6 rounded-lg text-center mb-10">Please <a onclick="router('login')" class="text-blue-600 cursor-pointer font-bold">Login</a> to write a review.</div>`;

    const listHTML = reviews.length ? reviews.map(r => `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4">
            <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold uppercase">${r.user[0]}</div>
                    <div>
                        <div class="font-bold text-slate-800">${r.user}</div>
                        <div class="text-xs text-gray-400">${r.date}</div>
                    </div>
                </div>
                <div class="text-yellow-400 text-sm">
                    ${Array(5).fill(0).map((_, i) => `<i class="fa-solid fa-star ${i < r.rating ? '' : 'text-gray-200'}"></i>`).join('')}
                </div>
            </div>
            <p class="text-gray-600 leading-relaxed">${r.text}</p>
        </div>
    `).join('') : '<div class="text-center text-gray-500 py-10">No reviews yet. Be the first!</div>';

    app.innerHTML = `
        <div class="bg-blue-600 text-white py-10 text-center">
            <h1 class="text-3xl font-bold">Passenger Reviews</h1>
            <p class="opacity-90">What people say about SkyHorizon</p>
        </div>
        <div class="container mx-auto px-6 py-10 max-w-3xl">
            ${formHTML}
            <div class="space-y-4">${listHTML}</div>
        </div>
    `;
}

function renderLogin() {
    app.innerHTML = `
        <div class="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md slide-in border border-gray-100">
                <h2 class="text-3xl font-bold mb-6 text-center text-slate-800">Welcome Back</h2>
                <form onsubmit="handleLogin(event)">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input type="text" id="login-user" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none transition">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="login-pass" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none transition">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg">Login</button>
                </form>
                <p class="mt-6 text-center text-gray-600">Don't have an account? <span onclick="router('signup')" class="text-blue-600 cursor-pointer font-bold hover:underline">Sign up</span></p>
            </div>
        </div>
    `;
}

function renderSignup() {
    app.innerHTML = `
        <div class="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md slide-in border border-gray-100">
                <h2 class="text-3xl font-bold mb-6 text-center text-slate-800">Create Account</h2>
                <form onsubmit="handleSignup(event)">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input type="text" id="signup-user" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none transition">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="signup-pass" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none transition">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input type="password" id="signup-confirm" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none transition">
                    </div>
                    <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-lg">Sign Up</button>
                </form>
                <p class="mt-6 text-center text-gray-600">Already have an account? <span onclick="router('login')" class="text-blue-600 cursor-pointer font-bold hover:underline">Login</span></p>
            </div>
        </div>
    `;
}

// --- 5. EVENT HANDLERS (Click actions) ---

let currentRating = 0;
function setRating(n) {
    currentRating = n;
    const stars = document.getElementById('star-rating').children;
    for(let i=0; i<5; i++) {
        stars[i].classList.remove('fa-regular', 'fa-solid', 'text-yellow-400', 'text-gray-300');
        if(i < n) stars[i].className = 'fa-solid fa-star text-2xl cursor-pointer text-yellow-400 transition';
        else stars[i].className = 'fa-regular fa-star text-2xl cursor-pointer text-gray-300 transition';
    }
}

function submitReview() {
    const text = document.getElementById('review-text').value;
    if(!text || currentRating === 0) return showToast("Please add rating and text", "error");
    AppService.addReview(text, currentRating);
    showToast("Review Posted!");
    renderReviews();
}

function filterFlights() {
    const origin = document.getElementById('search-origin')?.value.toLowerCase() || '';
    const dest = document.getElementById('search-dest')?.value.toLowerCase() || '';
    
    const filtered = flightData.filter(f => 
        f.origin.toLowerCase().includes(origin) && 
        f.dest.toLowerCase().includes(dest)
    );

    const container = document.getElementById('flight-list');
    if(filtered.length === 0) {
        container.innerHTML = '<div class="text-center py-12 text-gray-500">No flights found matching your search.</div>';
        return;
    }

    container.innerHTML = filtered.map(f => {
        const discountedPrice = f.price - (f.price * (f.discount/100));
        return `
        <div class="flight-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 mb-4 relative overflow-hidden">
            ${f.discount > 0 ? `<div class="absolute top-0 right-0 discount-badge">${f.discount}% OFF</div>` : ''}
            <div class="flex items-center gap-5 w-full md:w-auto">
                <div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl shadow-sm">
                    <i class="fa-solid fa-plane-up"></i>
                </div>
                <div>
                    <div class="font-bold text-xl text-slate-800">${f.origin} <i class="fa-solid fa-arrow-right-long text-gray-300 mx-2 text-sm"></i> ${f.dest}</div>
                    <div class="text-sm text-gray-500 mt-1"><i class="fa-regular fa-clock mr-1"></i> ${f.date} • ${f.time} • ${f.id}</div>
                </div>
            </div>
            <div class="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div class="text-right">
                    ${f.discount > 0 ? `<div class="text-xs text-red-400 line-through">$${f.price}</div>` : ''}
                    <div class="text-2xl font-bold text-slate-800">$${f.discount > 0 ? Math.round(discountedPrice) : f.price}</div>
                </div>
                <button onclick="bookFlight('${f.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform active:scale-95">Select</button>
            </div>
        </div>
    `}).join('');
}

function handleSignup(e) {
    e.preventDefault();
    const u = document.getElementById('signup-user').value;
    const p = document.getElementById('signup-pass').value;
    const c = document.getElementById('signup-confirm').value;

    if(p !== c) return showToast("Passwords do not match", "error");
    
    const res = AppService.signup(u, p);
    if(res.success) { showToast(res.msg); router('login'); }
    else showToast(res.msg, 'error');
}

function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;
    
    const res = AppService.login(u, p);
    if(res.success) { showToast("Welcome back!"); router('home'); }
    else showToast(res.msg, 'error');
}

function bookFlight(id) {
    const user = AppService.getCurrentUser();
    if(!user) { showToast("Please Login First", "error"); return router('login'); }

    const f = flightData.find(x => x.id === id);
    if(confirm(`Book flight from ${f.origin} to ${f.dest}?`)) {
        AppService.bookFlight(f);
        showToast("Booking Confirmed!");
        setTimeout(() => router('history'), 500);
    }
}

function showToast(msg, type='success') {
    const t = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = `${type === 'success' ? 'bg-green-600' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg mb-3 slide-in flex items-center gap-3`;
    el.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-circle-exclamation'}"></i> ${msg}`;
    t.appendChild(el);
    setTimeout(() => { el.style.opacity='0'; setTimeout(()=>el.remove(),300) }, 3000);
}

// Make toggleMobileMenu global so HTML can see it
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Start the app when files load
window.onload = () => { updateNav(); router('home'); };