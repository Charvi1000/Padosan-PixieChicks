import { Button } from '@/components/ui/button';
import { 
  Mail, 
  MessageSquare, 
  Shield, 
  Heart,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

export const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#" },
        { label: "Voice matching", href: "#" },
        { label: "Safety features", href: "#" },
        { label: "Pricing", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help center", href: "#" },
        { label: "Contact us", href: "#" },
        { label: "Safety guidelines", href: "#" },
        { label: "Community", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Blog", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms of service", href: "#" },
        { label: "Cookie policy", href: "#" },
        { label: "Data protection", href: "#" }
      ]
    }
  ];

  const quickActions = [
    { icon: MessageSquare, label: "Try Voice Demo", action: "demo" },
    { icon: Shield, label: "Family Mode", action: "family" },
    { icon: Heart, label: "See Sample Match", action: "match" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Quick Actions Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Try our interactive features and see how Padosan can help you find your perfect roommate.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 p-4 h-auto flex-col gap-2"
              >
                <action.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-voice-glow">Padosan</h2>
              <p className="text-white/70 text-sm mt-2">
                Voice-driven roommate matching for the next generation.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-success" />
                <span className="text-white/80">Verified & Safe</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-coral" />
                <span className="text-white/80">10k+ Happy Matches</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">Stay updated</h3>
              <p className="text-white/70 text-sm">
                Get the latest updates on new features and roommate matching tips.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <Button className="bg-white text-primary hover:bg-white/90 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            © 2024 Padosan. All rights reserved. Made with ❤️ for the next generation of renters.
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm">Follow us:</span>
            <div className="flex gap-3">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};