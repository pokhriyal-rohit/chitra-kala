import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Palette,
  Search,
  Bell,
  Home,
  Compass,
  Swords,
  Users,
  Upload,
  ChevronDown,
  Menu,
  X,
  Star,
  Flame,
} from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore", icon: Compass },
    { path: "/challenges", label: "Challenges", icon: Swords },
    { path: "/artists", label: "Artists", icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d14]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-white hidden sm:block" style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
              Draw<span className="text-violet-400">Verse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                  isActive(path)
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={`relative hidden sm:flex items-center transition-all duration-300 ${searchOpen ? "w-52" : "w-9"}`}>
              {searchOpen ? (
                <div className="flex items-center w-full bg-white/10 rounded-xl border border-white/10 px-3 py-2 gap-2">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        navigate(`/explore?q=${searchQuery}`);
                        setSearchOpen(false);
                      }
                      if (e.key === "Escape") setSearchOpen(false);
                    }}
                    placeholder="Search art, artists..."
                    className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500"
                  />
                  <button onClick={() => setSearchOpen(false)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* Upload */}
            <button
              onClick={() => navigate("/upload")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl text-white text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
            >
              <Upload className="w-4 h-4" />
              Post Art
            </button>

            {/* Avatar */}
            <button className="w-9 h-9 rounded-full overflow-hidden border-2 border-violet-500/40 hover:border-violet-400 transition-colors">
              <img
                src="https://images.unsplash.com/photo-1624091844772-554661d10173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-4 h-4 text-gray-400" /> : <Menu className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d14] border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                isActive(path)
                  ? "bg-violet-500/20 text-violet-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
          <button
            onClick={() => { navigate("/upload"); setMenuOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-sm bg-gradient-to-r from-violet-600 to-pink-600 text-white"
          >
            <Upload className="w-5 h-5" />
            Post Your Art
          </button>
        </div>
      )}
    </nav>
  );
}
