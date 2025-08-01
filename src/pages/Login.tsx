import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Shield, User, Phone, Mail, CreditCard, CheckCircle, Sparkles, Zap, Heart, Star } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<'login' | 'verification'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadharNumber: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Hide welcome animation after 3 seconds
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Track completed fields for progress
    if (value.trim()) {
      setCompletedFields(prev => new Set([...prev, field]));
    } else {
      setCompletedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(field);
        return newSet;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNumber.replace(/\D/g, ''))) {
      newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const demoOTP = '123456'; // Demo OTP for testing
      toast({
        title: "OTP Sent! 📱",
        description: `A 6-digit verification code has been sent to ${formData.phone}. Demo OTP: ${demoOTP}`,
        duration: 5000,
      });
      setStep('verification');
    }, 2000);
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.otp.trim()) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    if (formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      login({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        aadharNumber: formData.aadharNumber
      });
      toast({
        title: "Welcome to Padosan! 🎉",
        description: "Your account has been successfully verified and created.",
        duration: 5000,
      });
      navigate('/');
    }, 2000);
  };

  const formatAadharNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleaned;
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{5})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
    return cleaned;
  };

  const progressPercentage = (completedFields.size / 4) * 100;

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Welcome Animation */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-voice-primary via-accent to-coral">
          <div className="text-center text-white">
            <div className="mb-4">
              <Heart className="h-16 w-16 mx-auto animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome to Padosan</h1>
            <p className="text-xl opacity-90">Find your perfect roommate</p>
            <div className="flex justify-center mt-4 space-x-1">
              <Star className="h-5 w-5 animate-bounce" style={{ animationDelay: '0s' }} />
              <Star className="h-5 w-5 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <Star className="h-5 w-5 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 opacity-30 float">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-voice-primary to-accent animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-16 opacity-25 float" style={{ animationDelay: '2s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-coral to-lavender animate-pulse" />
        </div>
        <div className="absolute top-1/3 left-8 opacity-20 float" style={{ animationDelay: '4s' }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-voice-primary animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-8 opacity-15 float" style={{ animationDelay: '6s' }}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-lavender to-coral animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 text-foreground hover:text-primary transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Progress Indicator */}
        {step === 'login' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Profile Completion</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-voice-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <Card className="backdrop-blur-md bg-white/95 border-white/30 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-r from-voice-primary via-accent to-coral flex items-center justify-center shadow-lg">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">
              {step === 'login' ? 'Join Padosan' : 'Verify Your Identity'}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              {step === 'login' 
                ? 'Create your account with secure Aadhar verification'
                : 'Enter the OTP sent to your registered mobile number'
              }
            </CardDescription>
            
            {/* Step Indicator */}
            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className={`w-3 h-3 rounded-full ${step === 'login' ? 'bg-voice-primary' : 'bg-green-500'}`} />
              <div className={`w-3 h-3 rounded-full ${step === 'verification' ? 'bg-voice-primary' : 'bg-gray-300'}`} />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-voice-primary transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-12 bg-white/80 border-2 border-gray-200 text-foreground placeholder:text-muted-foreground focus:border-voice-primary focus:ring-2 focus:ring-voice-primary/20 transition-all"
                      disabled={isLoading}
                    />
                    {completedFields.has('name') && (
                      <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.name && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200">
                      <AlertDescription className="text-red-700">{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-voice-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-12 bg-white/80 border-2 border-gray-200 text-foreground placeholder:text-muted-foreground focus:border-voice-primary focus:ring-2 focus:ring-voice-primary/20 transition-all"
                      disabled={isLoading}
                    />
                    {completedFields.has('email') && (
                      <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.email && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200">
                      <AlertDescription className="text-red-700">{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-voice-primary transition-colors" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))}
                      className="pl-12 bg-white/80 border-2 border-gray-200 text-foreground placeholder:text-muted-foreground focus:border-voice-primary focus:ring-2 focus:ring-voice-primary/20 transition-all"
                      disabled={isLoading}
                    />
                    {completedFields.has('phone') && (
                      <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.phone && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200">
                      <AlertDescription className="text-red-700">{errors.phone}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="aadharNumber" className="text-foreground font-medium">Aadhar Number</Label>
                  <div className="relative group">
                    <CreditCard className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-voice-primary transition-colors" />
                    <Input
                      id="aadharNumber"
                      type="text"
                      placeholder="XXXX-XXXX-XXXX"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', formatAadharNumber(e.target.value))}
                      className="pl-12 bg-white/80 border-2 border-gray-200 text-foreground placeholder:text-muted-foreground focus:border-voice-primary focus:ring-2 focus:ring-voice-primary/20 transition-all"
                      disabled={isLoading}
                      maxLength={14}
                    />
                    {completedFields.has('aadharNumber') && (
                      <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.aadharNumber && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200">
                      <AlertDescription className="text-red-700">{errors.aadharNumber}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-voice-primary to-accent text-white hover:from-voice-primary/90 hover:to-accent/90 text-lg font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Continue to Verification
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerification} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="otp" className="text-foreground font-medium">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl font-mono bg-white/80 border-2 border-gray-200 text-foreground placeholder:text-muted-foreground focus:border-voice-primary focus:ring-2 focus:ring-voice-primary/20 transition-all"
                    disabled={isLoading}
                    maxLength={6}
                  />
                  {errors.otp && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200">
                      <AlertDescription className="text-red-700">{errors.otp}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="text-center text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <Phone className="inline h-4 w-4 mr-1" />
                  OTP sent to {formData.phone}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-voice-primary to-accent text-white hover:from-voice-primary/90 hover:to-accent/90 text-lg font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Verify & Complete
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-foreground hover:bg-gray-50 border-gray-300"
                  onClick={() => setStep('login')}
                  disabled={isLoading}
                >
                  Back to Login
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-500" />
              <span>Aadhar Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-500" />
              <span>Privacy First</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 