import React, { useState, useEffect } from 'react';
import { Eye, X, Users, Globe, Clock, Monitor, MapPin, Shield, Settings, Wifi, Battery, Smartphone, Laptop, Tablet, AlertTriangle } from 'lucide-react';

const ImprovedVisitorTracker = () => {
  const [visitors, setVisitors] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [gpsStatus, setGpsStatus] = useState('requesting');
  const [locationError, setLocationError] = useState(null);

  const ADMIN_PASSWORD = 'myportfolio2024';

  // Improved GPS location with better error handling and accuracy analysis
  const requestGPSLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      setGpsStatus('requesting');
      console.log("🔍 Requesting high-accuracy GPS location...");
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const accuracy = Math.round(position.coords.accuracy);
          console.log("✅ GPS location obtained:", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: `±${accuracy}m`,
            quality: accuracy < 100 ? 'Excellent' : accuracy < 1000 ? 'Good' : 'Poor'
          });
          
          setGpsStatus('granted');
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: accuracy,
            quality: accuracy < 100 ? 'Excellent' : accuracy < 1000 ? 'Good' : 'Poor',
            altitude: position.coords.altitude,
            speed: position.coords.speed,
            heading: position.coords.heading,
            timestamp: position.timestamp,
            available: true
          });
        },
        (error) => {
          console.log("❌ GPS location failed:", error.message);
          setLocationError(error.message);
          
          let status = 'denied';
          let errorExplanation = '';
          
          switch(error.code) {
            case 1: // PERMISSION_DENIED
              status = 'denied';
              errorExplanation = 'User denied location access';
              break;
            case 2: // POSITION_UNAVAILABLE
              status = 'unavailable';
              errorExplanation = 'Location unavailable (GPS/WiFi issue)';
              break;
            case 3: // TIMEOUT
              status = 'timeout';
              errorExplanation = 'Location request timed out';
              break;
            default:
              errorExplanation = error.message;
          }
          
          console.log(`🚫 GPS Error (Code ${error.code}): ${errorExplanation}`);
          setGpsStatus(status);
          
          resolve({
            available: false,
            error: errorExplanation,
            errorCode: error.code
          });
        },
        {
          enableHighAccuracy: true, // Use GPS satellites when possible
          timeout: 20000, // 20 seconds - longer for better accuracy
          maximumAge: 300000 // 5 minutes cache
        }
      );
    });
  };

  // Improved visitor information gathering
  const getVisitorInfo = async () => {
    try {
      console.log("🔍 Starting visitor info collection...");
      
      // Get IP address using ipify (reliable and has CORS enabled)
      let ipData = { ip: 'Unknown' };
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        ipData = await ipResponse.json();
        console.log("📍 IP obtained:", ipData.ip);
      } catch (error) {
        console.error('IP fetch error:', error);
      }

      // Try getting location data (with better error handling)
      let locationData = {
        country: 'Unknown',
        city: 'Unknown', 
        region: 'Unknown',
        isp: 'Unknown',
        accuracy: 'Failed',
        service: 'None'
      };

      // Use ipapi.co as primary service (most reliable)
      try {
        console.log("🌍 Fetching location data...");
        const response = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const data = await response.json();
        
        if (data.city && !data.error) {
          locationData = {
            country: data.country_name || data.country,
            city: data.city,
            region: data.region,
            isp: data.org,
            accuracy: data.accuracy ? `${data.accuracy}km` : 'Unknown',
            service: 'ipapi.co',
            postal: data.postal,
            latitude: data.latitude,
            longitude: data.longitude
          };
          console.log("✅ Location data:", locationData);
        } else {
          console.log("⚠️ Location service returned error:", data);
        }
      } catch (error) {
        console.error('Location fetch error:', error);
      }

      // Request GPS location (this is what you need to understand)
      console.log("📍 Requesting GPS location...");
      const browserLocation = await requestGPSLocation();

      // Device detection
      const getDeviceType = () => {
        const ua = navigator.userAgent.toLowerCase();
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua)) return 'Tablet';
        if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'Mobile';
        return 'Desktop';
      };

      // Operating system detection
      const getOS = () => {
        const ua = navigator.userAgent;
        if (ua.includes('Windows NT 10.0')) return 'Windows 10/11';
        if (ua.includes('Windows NT 6.3')) return 'Windows 8.1';
        if (ua.includes('Windows NT 6.2')) return 'Windows 8';
        if (ua.includes('Windows NT 6.1')) return 'Windows 7';
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac OS X')) {
          const match = ua.match(/Mac OS X (\d+_\d+)/);
          if (match) {
            const version = match[1].replace('_', '.');
            return `macOS ${version}`;
          }
          return 'macOS';
        }
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) {
          const match = ua.match(/Android (\d+\.?\d*)/);
          return match ? `Android ${match[1]}` : 'Android';
        }
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
      };

      // Browser detection
      const getBrowser = () => {
        const ua = navigator.userAgent;
        if (ua.includes('Edg/')) {
          const version = ua.match(/Edg\/(\d+)/)?.[1];
          return { name: 'Edge', version };
        }
        if (ua.includes('Chrome/') && !ua.includes('Edg')) {
          const version = ua.match(/Chrome\/(\d+)/)?.[1];
          return { name: 'Chrome', version };
        }
        if (ua.includes('Firefox/')) {
          const version = ua.match(/Firefox\/(\d+)/)?.[1];
          return { name: 'Firefox', version };
        }
        if (ua.includes('Safari/') && !ua.includes('Chrome')) {
          const version = ua.match(/Version\/(\d+)/)?.[1];
          return { name: 'Safari', version };
        }
        return { name: 'Unknown', version: '' };
      };

      const browser = getBrowser();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const deviceType = getDeviceType();
      const os = getOS();

      const visitorInfo = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ip: ipData.ip,
        timestamp: new Date().toISOString(),
        
        // Location (IP-based - may be inaccurate)
        country: locationData.country,
        city: locationData.city,
        region: locationData.region,
        isp: locationData.isp,
        locationAccuracy: locationData.accuracy,
        locationService: locationData.service,
        ipLocation: locationData.latitude && locationData.longitude ? {
          lat: locationData.latitude,
          lng: locationData.longitude
        } : null,
        
        // GPS location (accurate if user grants permission)
        gpsLocation: browserLocation.available ? {
          lat: browserLocation.latitude,
          lng: browserLocation.longitude,
          accuracy: browserLocation.accuracy
        } : null,
        gpsError: browserLocation.error,
        
        // Device info
        deviceType,
        os,
        browser: browser.name,
        browserVersion: browser.version,
        
        // Screen info
        screenSize: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
        colorDepth: screen.colorDepth,
        
        // System info
        timezone,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,
        onlineStatus: navigator.onLine,
        
        // Hardware (limited info available in browsers for privacy)
        cores: navigator.hardwareConcurrency,
        memory: navigator.deviceMemory ? `~${navigator.deviceMemory}GB` : 'Unknown',
        
        // Network info
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt
        } : null,
        
        // Page info
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct visit',
        page: window.location.pathname + window.location.search,
        url: window.location.href,
        
        visitDuration: 0
      };

      console.log("✅ Complete visitor info:", visitorInfo);
      return visitorInfo;

    } catch (error) {
      console.error('Error getting visitor info:', error);
      return null;
    }
  };

  const recordVisit = (visitorInfo) => {
    // Check if this is a duplicate visit (same IP within last 30 minutes)
    const now = new Date().getTime();
    const isDuplicate = visitors.some(v => 
      v.ip === visitorInfo.ip && 
      (now - new Date(v.timestamp).getTime()) < 30 * 60 * 1000 // 30 minutes
    );

    if (!isDuplicate) {
      setVisitors(prev => {
        const updated = [visitorInfo, ...prev].slice(0, 100); // Keep last 100
        return updated;
      });
      
      if (isAdmin) {
        setCurrentVisitor(visitorInfo);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 10000);
      }
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowDashboard(false);
  };

  useEffect(() => {
    const initTracking = async () => {
      const visitorInfo = await getVisitorInfo();
      if (visitorInfo) {
        recordVisit(visitorInfo);
      }
    };

    initTracking();
  }, [isAdmin]);

  // Keyboard shortcut for admin access
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (!isAdmin) {
          setShowAdminLogin(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isAdmin]);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const visited = new Date(timestamp);
    const diffInMinutes = Math.floor((now - visited) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'Mobile': return <Smartphone className="w-3 h-3" />;
      case 'Tablet': return <Tablet className="w-3 h-3" />;
      default: return <Laptop className="w-3 h-3" />;
    }
  };

  const getLocationString = (visitor) => {
    if (visitor.gpsLocation) {
      const accuracy = visitor.gpsLocation.accuracy;
      const quality = accuracy < 100 ? '🎯' : accuracy < 1000 ? '🟡' : '🔴';
      const qualityText = accuracy < 100 ? 'Excellent' : accuracy < 1000 ? 'Good' : 'Poor';
      
      return `${quality} ${visitor.gpsLocation.lat.toFixed(6)}, ${visitor.gpsLocation.lng.toFixed(6)} (GPS ±${accuracy}m - ${qualityText})`;
    }
    if (visitor.ipLocation) {
      return `📍 ${visitor.ipLocation.lat.toFixed(4)}, ${visitor.ipLocation.lng.toFixed(4)} (IP-based estimate)`;
    }
    return `🌍 ${visitor.city}, ${visitor.region}, ${visitor.country}`;
  };

  // GPS Permission Status Component
  const GPSStatus = () => {
    if (gpsStatus === 'granted') {
      return (
        <div className="flex items-center text-green-600 text-xs">
          <MapPin className="w-3 h-3 mr-1" />
          GPS Access Granted
        </div>
      );
    }
    if (gpsStatus === 'denied') {
      return (
        <div className="flex items-center text-red-600 text-xs">
          <AlertTriangle className="w-3 h-3 mr-1" />
          GPS Access Denied
        </div>
      );
    }
    if (gpsStatus === 'requesting') {
      return (
        <div className="flex items-center text-blue-600 text-xs">
          <Clock className="w-3 h-3 mr-1 animate-spin" />
          Requesting GPS Access...
        </div>
      );
    }
    return null;
  };

  if (!isAdmin) {
    return (
      <>
        <div className="fixed bottom-4 right-4 pointer-events-auto z-50">
          <GPSStatus />
        </div>
        
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Admin Access</h3>
              </div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Hint: Press Ctrl+Shift+A to access this panel
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Notification Toast */}
      {showNotification && currentVisitor && (
        <div className="absolute top-6 right-6 pointer-events-auto">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-xl p-4 max-w-md animate-slide-in border border-green-400">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm flex items-center">
                    New Visitor - {currentVisitor.city}, {currentVisitor.country}
                  </h3>
                  <div className="text-xs text-green-100 mt-1 space-y-1">
                    <div className="flex items-center space-x-1">
                      <Globe className="w-3 h-3" />
                      <span>{currentVisitor.ip}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getDeviceIcon(currentVisitor.deviceType)}
                      <span>{currentVisitor.deviceType} • {currentVisitor.os}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Monitor className="w-3 h-3" />
                      <span>{currentVisitor.browser} {currentVisitor.browserVersion}</span>
                    </div>
                    {currentVisitor.gpsLocation && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-green-200">GPS: ±{currentVisitor.gpsLocation.accuracy}m</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <div className="bg-white rounded-lg shadow-xl border-2 border-blue-200 overflow-hidden">
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="flex items-center space-x-2 p-3 w-full hover:bg-blue-50 transition-colors"
          >
            <div className="bg-blue-100 rounded-full p-2">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm text-gray-900 flex items-center">
                {visitors.length} Visitors
                <Shield className="w-3 h-3 ml-1 text-blue-600" />
              </div>
              <div className="text-xs text-gray-500">
                Enhanced Analytics
              </div>
            </div>
            <GPSStatus />
          </button>

          {showDashboard && (
            <div className="border-t border-gray-200 bg-gray-50">
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">Visitor Details</h4>
                  <button
                    onClick={handleAdminLogout}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {visitors.map((visitor, index) => (
                    <div key={visitor.id || index} className="bg-white rounded-lg p-3 text-xs border shadow-sm">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{visitor.ip}</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                            {visitor.locationService}
                          </span>
                          {visitor.gpsLocation && (
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                              GPS
                            </span>
                          )}
                        </div>
                        <span className="text-gray-500">{timeAgo(visitor.timestamp)}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="mb-2 p-2 bg-blue-50 rounded">
                        <div className="flex items-center space-x-1 mb-1">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span className="font-medium text-blue-900">
                            {getLocationString(visitor)}
                          </span>
                        </div>
                        <div className="text-blue-700 text-xs">
                          ISP: {visitor.isp} • {visitor.timezone}
                        </div>
                        {visitor.gpsError && (
                          <div className="text-red-600 text-xs mt-1">
                            GPS Error: {visitor.gpsError}
                          </div>
                        )}
                      </div>
                      
                      {/* Device Info */}
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {getDeviceIcon(visitor.deviceType)}
                          <span>{visitor.deviceType}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Monitor className="w-3 h-3" />
                          <span>{visitor.os}</span>
                        </div>
                      </div>
                      
                      {/* Browser */}
                      <div className="mb-2">
                        <span className="font-medium">Browser:</span> {visitor.browser} {visitor.browserVersion}
                      </div>
                      
                      {/* Hardware */}
                      {visitor.cores && (
                        <div className="mb-2">
                          <span className="font-medium">Hardware:</span> {visitor.cores} cores
                          {visitor.memory !== 'Unknown' && <span>, {visitor.memory} RAM</span>}
                        </div>
                      )}
                      
                      {/* Screen Info */}
                      <div className="mb-2">
                        <span className="font-medium">Screen:</span> {visitor.screenSize}
                        {visitor.devicePixelRatio && ` (${visitor.devicePixelRatio}x DPR)`}
                      </div>
                      
                      {/* Connection */}
                      {visitor.connection && (
                        <div className="mb-2 flex items-center space-x-1">
                          <Wifi className="w-3 h-3" />
                          <span>
                            {visitor.connection.effectiveType}
                            {visitor.connection.downlink && ` (${visitor.connection.downlink} Mbps)`}
                          </span>
                        </div>
                      )}
                      
                      {/* Page */}
                      <div className="mb-1">
                        <span className="font-medium">Page:</span> {visitor.page}
                      </div>
                      
                      {visitor.referrer !== 'Direct visit' && (
                        <div className="text-blue-600 text-xs truncate">
                          <span className="font-medium">From:</span> {visitor.referrer}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {visitors.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No visitors yet
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{visitors.length}</div>
                      <div className="text-gray-500">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {visitors.filter(v => v.gpsLocation).length}
                      </div>
                      <div className="text-gray-500">GPS</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {visitors.filter(v => {
                          const now = new Date();
                          const visited = new Date(v.timestamp);
                          return (now - visited) < 24 * 60 * 60 * 1000;
                        }).length}
                      </div>
                      <div className="text-gray-500">Today</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {new Set(visitors.map(v => v.country)).size}
                      </div>
                      <div className="text-gray-500">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ImprovedVisitorTracker;