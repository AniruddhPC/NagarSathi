import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useUserContext } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import {
    Home,
    MapPin,
    PlusCircle,
    User,
    LayoutDashboard,
    Menu,
    X,
    Sun,
    Moon
} from 'lucide-react';
import { useState } from 'react';

/**
 * Navigation Bar Component
 * Responsive with mobile menu
 */
const Navbar = () => {
    const location = useLocation();
    const { isAdmin, user } = useUserContext();
    const { toggleTheme, isDark } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/map', label: 'Map', icon: MapPin },
        { path: '/report', label: 'Report Issue', icon: PlusCircle, authRequired: true },
        { path: '/profile', label: 'Profile', icon: User, authRequired: true },
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">N</span>
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">
                            Nagar<span className="text-primary-400">Sathi</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            if (link.authRequired) {
                                return (
                                    <SignedIn key={link.path}>
                                        <Link
                                            to={link.path}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(link.path)
                                                ? 'bg-primary-600 text-white'
                                                : 'text-dark-300 hover:text-white hover:bg-dark-700'
                                                }`}
                                        >
                                            <link.icon size={18} />
                                            <span>{link.label}</span>
                                        </Link>
                                    </SignedIn>
                                );
                            }
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(link.path)
                                        ? 'bg-primary-600 text-white'
                                        : 'text-dark-300 hover:text-white hover:bg-dark-700'
                                        }`}
                                >
                                    <link.icon size={18} />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Admin Link */}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/admin')
                                    ? 'bg-primary-600 text-white'
                                    : 'text-amber-400 hover:text-amber-300 hover:bg-dark-700'
                                    }`}
                            >
                                <LayoutDashboard size={18} />
                                <span>Admin</span>
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-all duration-200"
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <SignedOut>
                            <Link to="/sign-in" className="btn-ghost text-sm">
                                Sign In
                            </Link>
                            <Link to="/sign-up" className="btn-primary text-sm">
                                Get Started
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            <div className="hidden md:flex items-center space-x-3">
                                {user && (
                                    <span className="text-dark-400 text-sm">
                                        Hi, {user.name?.split(' ')[0]}
                                    </span>
                                )}
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-9 h-9',
                                        },
                                    }}
                                />
                            </div>
                        </SignedIn>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-dark-300 hover:text-white"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-dark-700 animate-slide-down">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => {
                                if (link.authRequired) {
                                    return (
                                        <SignedIn key={link.path}>
                                            <Link
                                                to={link.path}
                                                onClick={closeMobileMenu}
                                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive(link.path)
                                                    ? 'bg-primary-600 text-white'
                                                    : 'text-dark-300 hover:bg-dark-700'
                                                    }`}
                                            >
                                                <link.icon size={20} />
                                                <span>{link.label}</span>
                                            </Link>
                                        </SignedIn>
                                    );
                                }
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={closeMobileMenu}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive(link.path)
                                            ? 'bg-primary-600 text-white'
                                            : 'text-dark-300 hover:bg-dark-700'
                                            }`}
                                    >
                                        <link.icon size={20} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${isActive('/admin')
                                        ? 'bg-primary-600 text-white'
                                        : 'text-amber-400 hover:bg-dark-700'
                                        }`}
                                >
                                    <LayoutDashboard size={20} />
                                    <span>Admin Dashboard</span>
                                </Link>
                            )}

                            <SignedIn>
                                <div className="flex items-center space-x-3 px-4 py-3 border-t border-dark-700 mt-2 pt-4">
                                    <UserButton />
                                    {user && (
                                        <span className="text-dark-300">{user.name}</span>
                                    )}
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
