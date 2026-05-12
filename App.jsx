import React, { useState } from 'react'

const Navbar = ({ currentView, setCurrentView, setActiveCategory, isLoggedIn, setIsLoggedIn, setShowAuthModal, searchQuery, setSearchQuery, handleSearch }) => (
  <nav className="flex justify-between items-center px-6 py-4 fixed top-0 w-full bg-white z-[100] border-b shadow-sm">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1 text-[#e60023] font-bold text-2xl cursor-pointer" onClick={() => {setCurrentView("home"); setActiveCategory("All")}}>
        <span className="bg-[#e60023] text-white w-9 h-9 rounded-full flex items-center justify-center">P</span>
        <span className="hidden sm:inline">MY Pinterest</span>
      </div>
      <button onClick={() => setCurrentView("explore")} className={`font-semibold ${currentView === 'explore' ? 'text-black underline' : 'text-gray-700'}`}>Explore</button>
    </div>

    {/* Search Bar with Button */}
    <div className="flex-grow max-w-md mx-4 relative group">
      <input 
        type="text" 
        placeholder="Search for anything..." 
        className="w-full bg-[#efefef] hover:bg-[#e1e1e1] px-4 py-2 pr-12 rounded-full outline-none border-none text-sm h-10 transition-all focus:bg-white focus:ring-2 focus:ring-blue-100"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button 
        onClick={handleSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1.5 rounded-full transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
    </div>
    
    <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-800">
      <button onClick={() => setCurrentView("about")} className={`hover:text-black ${currentView === 'about' ? 'text-black border-b-2 border-black' : ''}`}>About</button>
      <button onClick={() => setCurrentView("business")} className={`hover:text-black ${currentView === 'business' ? 'text-black border-b-2 border-black' : ''}`}>Businesses</button>
      <button onClick={() => setCurrentView("create")} className={`hover:text-black ${currentView === 'create' ? 'text-black border-b-2 border-black' : ''}`}>Create</button>
      <button onClick={() => setCurrentView("news")} className={`hover:text-black ${currentView === 'news' || currentView === 'newsDetail' ? 'text-black border-b-2 border-black' : ''}`}>News</button>
    </div>

    <div className="flex gap-4">
      {!isLoggedIn ? (
        <button onClick={() => setShowAuthModal(true)} className="bg-[#e60023] text-white px-5 py-2 rounded-full font-bold hover:bg-[#ad081b]">Log in</button>
      ) : (
        <button onClick={() => setIsLoggedIn(false)} className="text-gray-500 font-bold hover:text-black">Logout</button>
      )}
    </div>
  </nav>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState("home"); 
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setCurrentView("explore");
      const livePhotos = Array.from({ length: 50 }, (_, i) => 
        `https://loremflickr.com/400/600/${searchQuery.replace(/\s+/g, ',')}?lock=${i + 1}`
      );
      setSearchResults(livePhotos);
    }
  };

  const photoDatabase = {
    "All": [
      "https://img.freepik.com/free-photo/closeup-shot-european-squirrel-eating-peanut_181624-29250.jpg",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg",
      "https://images7.alphacoders.com/412/412733.jpg",
      "https://w0.peakpx.com/wallpaper/123/401/HD-wallpaper-spiderman-in-action-8k-spiderman-superheroes.jpg"
    ],
    "Animals": [
      "https://img.freepik.com/free-photo/closeup-shot-european-squirrel-eating-peanut_181624-29250.jpg",
      "https://www.hdwallpapers.in/download/animal_sheep_4k_hd_animals-3840x2160.jpg",
      "https://wallpaperaccess.com/full/654026.jpg",
      "https://img.freepik.com/free-photo/green-iguana-closeup-wood-animal-closeup-reptile-closeup_488145-2581.jpg"
    ],
    "Art": [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg",
      "https://rukminim2.flixcart.com/image/480/480/xif0q/poster/g/2/i/medium-ballet-dancer-on-fine-art-paper-hd-quality-wallpaper-original-imah33zbc8w6bfac.jpeg",
      "https://steemitimages.com/DQmVdieLLZ6QyDMDjK29mfkCVJwdR7t6cce1ZVAfLdYs7G1/5621_Digital-art-beautiful-zebra-free-HD-wallpaper.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC8XYC64DIpCExw5L22vSgXwoHhM9b3nq64Q&s"
    ],
    "Design": [
      "https://m.media-amazon.com/images/I/61VehuCbkXL._AC_UF1000,1000_QL80_.jpg",
      "https://images7.alphacoders.com/412/412733.jpg",
      "https://static.vecteezy.com/system/thumbnails/006/713/674/small/design-word-cloud-innovation-idea-creativity-and-design-concept-photo.jpg",
      "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/1/Geometric-Elegance_0_1200.jpg.webp"
    ],
    "Action": [
      "https://w0.peakpx.com/wallpaper/123/401/HD-wallpaper-spiderman-in-action-8k-spiderman-superheroes.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgxKsnRWP3_ol7DcWKK3i9j5ldN-HWyUFLNg&s",
      "https://images.alphacoders.com/971/thumb-1920-971650.jpg",
      "https://img.freepik.com/free-photo/apocalyptic-destruction-war-zone-landscape_23-2150985678.jpg"
    ]
  };

  const categoriesData = [
    { name: "Animals", img: photoDatabase["Animals"][0] },
    { name: "Art", img: photoDatabase["Art"][0] },
    { name: "Design", img: photoDatabase["Design"][1] },
    { name: "Action", img: photoDatabase["Action"][0] }
  ];

  const newsArticles = [
    { id: 1, title: "Pinterest’s latest campaign wants you to live your life, not just scroll it", categories: "Ads, Company", image: "https://media.gettyimages.com/id/1398823691/video/women-at-home-relaxing-taking-picture-with-dog.jpg?s=640x640&k=20&c=VEYzKG90tSVxtipCOLGI1RRpufdCckJkUQgzOkxaY18=" },
    { id: 2, title: "Pinterest Wedding Trends Report 2026: Maximum romance, modern individuality", categories: "Trends", image: "https://california-times-brightspot.s3.amazonaws.com/ef/92/df06243e48c894e04fa7f5d0ed1c/indian-wedding-down-the-aisle.jpg" },
    { id: 3, title: "Introducing tvScientific by Pinterest: Pinterest Audiences now available for Connected TV", categories: "Product, Company, Ads", image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:146,cw:876,ch:657,q:75,w:876/n6Hy2yZDqY75hEiktw7vcd.png" },
    { id: 4, title: "Pinterest brings a phone-free festival experience to Coachella", categories: "Company, Trends", image: "https://wallpapers.com/images/featured/4k-phone-ps7xz3jfe8x4zpje.jpg" }
  ];

  const handleNewsClick = (article) => {
    setSelectedArticle(article);
    setCurrentView("newsDetail");
  };

  const Footer = () => (
    <footer className="bg-black text-white py-20 px-10 md:px-20 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold italic">MY Pinterest</h2>
          <p className="mt-20 text-gray-400 text-sm">© 2026 MY Pinterest</p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg">Quick links</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-white cursor-pointer">Help Centre</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Impact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg">Policies</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Privacy & Cookies</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg">Follow MY Pinterest</h4>
          <div className="flex gap-4 text-2xl">
             <span>📸</span> <span>🐦</span> <span>👤</span>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#111] flex flex-col">
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        setActiveCategory={setActiveCategory}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowAuthModal={setShowAuthModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {currentView === "newsDetail" && selectedArticle && (
        <div className="pt-24 animate-in fade-in duration-500 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-3xl shadow-sm mt-8">
            <button onClick={() => setCurrentView("news")} className="text-gray-500 hover:text-black font-bold flex items-center gap-2 mb-8 transition-colors">
              <span>←</span> Back to Newsroom
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{selectedArticle.title}</h1>
            <p className="text-sm font-bold text-[#e60023] mb-8">{selectedArticle.categories}</p>
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full rounded-[32px] shadow-md mb-10 object-cover" />
            <div className="text-lg text-gray-700 leading-relaxed space-y-6">
              <p>Detailed news story content.</p>
            </div>
          </div>
        </div>
      )}

      {currentView === "news" && (
        <div className="pt-24 animate-in fade-in duration-500">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-5xl font-bold mb-4">Newsroom</h1>
            <div className="flex gap-6 text-gray-500 font-semibold mb-12 border-b pb-4 overflow-x-auto whitespace-nowrap">
                <span className="text-black border-b-2 border-black cursor-pointer">All news</span>
                <span className="hover:text-black cursor-pointer">Ads</span>
                <span className="hover:text-black cursor-pointer">Company</span>
                <span className="hover:text-black cursor-pointer">Creators</span>
                <span className="hover:text-black cursor-pointer">Product</span>
                <span className="hover:text-black cursor-pointer">Trends</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
              {newsArticles.map((article) => (
                <div key={article.id} onClick={() => handleNewsClick(article)} className="group cursor-pointer">
                  <div className="bg-gray-100 rounded-[32px] aspect-video mb-4 overflow-hidden">
                     <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={article.title} />
                  </div>
                  <p className="text-sm font-bold text-gray-500 mb-2">{article.categories}</p>
                  <h3 className="text-2xl font-bold group-hover:underline">{article.title}</h3>
                </div>
              ))}
            </div>
            {/* CEO Section */}
            <div className="mt-24 bg-[#F0F0F0] rounded-[48px] overflow-hidden flex flex-col md:flex-row items-center">
                <div className="flex-1 p-12 md:p-20">
                   <h2 className="text-4xl font-bold mb-6">A word from our CEO</h2>
                   <p className="text-lg text-gray-700 mb-8">Pinterest CEO Uttam Raj shares why age verification is essential.</p>
                   <button className="bg-black text-white px-8 py-3 rounded-full font-bold">Read the story</button>
                </div>
                <div className="flex-1 w-full h-[500px]">
                   <img src="https://i.postimg.cc/pLzBTqzb/Whats-App-Image-2026-05-10-at-12-25-04.jpg" className="w-full h-full object-cover" alt="CEO" />
                </div>
            </div>
          </div>
          <Footer />
        </div>
      )}

      {currentView === "create" && (
        <div className="pt-24 animate-in fade-in duration-500">
           <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                 <h1 className="text-6xl font-bold leading-tight">Where your content can thrive</h1>
                 <p className="text-xl text-gray-700">On MY Pinterest, create with ease and grow your brand.</p>
                 <button className="bg-[#e60023] text-white px-8 py-4 rounded-full font-bold text-lg">Get started</button>
              </div>
              <div className="flex-1">
                 <img src="https://images.ctfassets.net/jis2uwrnn1pu/4IlBqlG1cGKIBrwmNKEwxK/3ae8e87cf17723d4c929bf632c5f1b66/pinterest-for-creators.jpg?fm=webp&q=85" className="rounded-[40px] shadow-xl w-full" alt="Create" />
              </div>
           </div>
           <Footer />
        </div>
      )}

      {currentView === "about" && (
        <div className="pt-24 animate-in fade-in duration-500">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 italic">MY Pinterest is your space to find what you actually like</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Explore what you love, not just what gets likes. Save Pins, shop what you love, and follow your taste.
            </p>
            <button className="bg-[#e60023] text-white px-8 py-4 rounded-full font-bold text-lg">Sign up</button>
          </div>
          <Footer />
        </div>
      )}

      {currentView === "business" && (
        <div className="pt-24 animate-in fade-in duration-500 bg-[#fffaf0]">
          <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[#111]">Grow your business on MY Pinterest</h1>
              <p className="text-xl text-gray-700">Reach the people looking for ideas to try and buy.</p>
              <button className="bg-[#e60023] text-white px-8 py-4 rounded-full font-bold">Sign up</button>
            </div>
            <div className="flex-1">
              <img src="https://images.ctfassets.net/h67z7i6sbjau/7D0WciFj4YMR9fi0I07zZk/3e8847ff5d228347cfd3fc3658920cc3/biz-homepage-adprop.png?fm=webp&q=85" alt="Business" className="rounded-[40px] shadow-2xl w-full" />
            </div>
          </div>
          <Footer />
        </div>
      )}

      {currentView === "home" && !isLoggedIn && (
        <>
          <div className="pt-24 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-center mt-10 mb-12 max-w-3xl px-4">
              Create the life you love on MY Pinterest
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10 max-w-6xl mb-20">
              {photoDatabase["All"].map((url, i) => (
                <div key={i} className={`overflow-hidden rounded-[32px] shadow-lg ${i % 2 !== 0 ? 'mt-14' : ''}`}>
                  <img src={url} className="w-full h-[400px] object-cover" alt="Home Grid" />
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}

      {(currentView === "explore" || isLoggedIn) && (
        <div className="pt-24 px-6 md:px-12 max-w-[1400px] mx-auto flex-grow">
          <h1 className="text-4xl font-bold mb-8">
            {searchResults.length > 0 ? `Results for "${searchQuery}"` : "Explore Categories"}
          </h1>
          
          {searchResults.length === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {categoriesData.map((cat) => (
                <div key={cat.name} onClick={() => setActiveCategory(cat.name)} className={`relative h-48 rounded-[24px] overflow-hidden cursor-pointer transition-all border-4 ${activeCategory === cat.name ? 'border-red-500 scale-105' : 'border-transparent'}`}>
                  <img src={cat.img} className="w-full h-full object-cover" alt="cat" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl uppercase">{cat.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="columns-2 md:columns-4 lg:columns-5 gap-6 space-y-6 pb-20">
            {(searchResults.length > 0 ? searchResults : photoDatabase[activeCategory] || photoDatabase["All"]).map((url, i) => (
              <div key={i} className="relative group break-inside-avoid">
                <img 
                  src={url} 
                  className="w-full rounded-[24px] shadow-sm hover:brightness-90 transition cursor-zoom-in" 
                  alt="pin"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=400"; }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[420px] p-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Welcome to MY Pinterest</h2>
            <button onClick={() => {setIsLoggedIn(true); setShowAuthModal(false);}} className="w-full bg-[#e60023] text-white py-3 rounded-full font-bold text-lg">Log in</button>
            <button onClick={() => setShowAuthModal(false)} className="mt-4 font-bold text-gray-500 hover:text-black">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import ReactDOM from 'react-dom/client'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
