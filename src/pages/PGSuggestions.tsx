import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, MapPin, Users, Bed, CheckCircle, Phone, Share2, Calendar, Filter, Search, Building2 } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PGListing {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  amenities: string[];
  description: string;
  distance: string;
  availableRooms: number;
  gender: 'Male' | 'Female' | 'Unisex';
  isFavorite: boolean;
}

export const PGSuggestions = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [listings, setListings] = useState<PGListing[]>([
    { id: '1', name: 'Student Haven PG', location: 'Koramangala', price: 8500, rating: 4.5, reviews: 127, amenities: ['WiFi', 'Food', 'Parking', 'Security'], description: 'Modern PG with all amenities, perfect for students and working professionals.', distance: '0.8 km from IT Park', availableRooms: 3, gender: 'Unisex', isFavorite: false },
    { id: '2', name: 'Cozy Corner PG', location: 'HSR Layout', price: 7500, rating: 4.2, reviews: 89, amenities: ['WiFi', 'Food', 'Security'], description: 'Comfortable accommodation with home-cooked meals. Great location near metro station.', distance: '1.2 km from Metro', availableRooms: 2, gender: 'Female', isFavorite: true },
    { id: '3', name: 'Premium Living PG', location: 'Indiranagar', price: 12000, rating: 4.8, reviews: 203, amenities: ['WiFi', 'Food', 'Parking', 'Security', 'Gym'], description: 'Luxury PG with premium amenities including gym access. Perfect for professionals.', distance: '0.5 km from Commercial Street', availableRooms: 1, gender: 'Unisex', isFavorite: false },
  ]);
  const [filters, setFilters] = useState({ location: '' });
  const [selectedListing, setSelectedListing] = useState<PGListing | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const toggleFavorite = (id: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
    toast({ title: 'Favorite updated!' });
  };
  const handleBookNow = (listing: PGListing) => { setSelectedListing(listing); setShowBooking(true); };
  const confirmBooking = () => { setShowBooking(false); setSelectedListing(null); toast({ title: 'Booking request sent!' }); };

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Please log in to access PG Suggestions.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Navigation />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center"><Building2 className="h-6 w-6 text-white" /></div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">PG Suggestions</h1>
            <p className="text-muted-foreground">Find the perfect accommodation for your stay</p>
          </div>
        </div>
        <div className="mb-8"><Card><CardContent className="p-6"><div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by location..." className="pl-10" value={filters.location} onChange={e => setFilters(prev => ({ ...prev, location: e.target.value }))} /></div><Button className="bg-gradient-to-r from-purple-500 to-purple-600"><Filter className="h-4 w-4 mr-2" />Apply Filters</Button></div></CardContent></Card></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {listings.filter(l => l.location.toLowerCase().includes(filters.location.toLowerCase())).map(listing => (
            <Card key={listing.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3"><div className="flex items-start justify-between"><div className="flex-1"><CardTitle className="text-lg">{listing.name}</CardTitle><div className="flex items-center gap-2 text-sm text-muted-foreground mt-1"><MapPin className="h-4 w-4" /><span>{listing.location}</span></div></div><Button variant="ghost" size="sm" onClick={() => toggleFavorite(listing.id)} className={`${listing.isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}><Heart className={`h-5 w-5 ${listing.isFavorite ? 'fill-current' : ''}`} /></Button></div></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-2xl font-bold text-foreground">₹{listing.price}</span><span className="text-sm text-muted-foreground">/month</span></div><div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500 fill-current" /><span className="font-semibold">{listing.rating}</span><span className="text-sm text-muted-foreground">({listing.reviews})</span></div></div>
                <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                <div className="flex flex-wrap gap-2">{listing.amenities.map(a => <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>)}</div>
                <div className="grid grid-cols-2 gap-4 text-sm"><div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>{listing.gender}</span></div><div className="flex items-center gap-2"><Bed className="h-4 w-4 text-muted-foreground" /><span>{listing.availableRooms} rooms</span></div><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><span>{listing.distance}</span></div><div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span>Available</span></div></div>
                <div className="flex gap-2 pt-2"><Button onClick={() => handleBookNow(listing)} className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">Book Now<Calendar className="h-4 w-4 ml-2" /></Button><Button variant="outline" size="sm"><Phone className="h-4 w-4" /></Button><Button variant="outline" size="sm"><Share2 className="h-4 w-4" /></Button></div>
              </CardContent>
            </Card>
          ))}
        </div>
        {showBooking && selectedListing && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><Card className="w-full max-w-md bg-white/95 backdrop-blur-md"><CardHeader><CardTitle>Book {selectedListing.name}</CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><div className="flex justify-between"><span className="text-sm text-muted-foreground">Monthly Rent:</span><span className="font-semibold">₹{selectedListing.price}</span></div><div className="flex justify-between"><span className="text-sm text-muted-foreground">Location:</span><span className="font-semibold">{selectedListing.location}</span></div></div><div className="pt-4 space-y-2"><Button onClick={confirmBooking} className="w-full bg-gradient-to-r from-purple-500 to-purple-600"><Calendar className="h-4 w-4 mr-2" />Confirm Booking</Button><Button variant="outline" onClick={() => setShowBooking(false)} className="w-full">Cancel</Button></div></CardContent></Card></div>}
      </div>
    </div>
  );
}; 