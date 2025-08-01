import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, User } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isActive: boolean;
}

export const Chat = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', name: 'Priya Sharma', avatar: '', lastMessage: 'Hey! Are you still looking for a roommate?', isActive: true },
    { id: '2', name: 'Rahul Kumar', avatar: '', lastMessage: 'The apartment looks perfect! When can we meet?', isActive: false },
    { id: '3', name: 'Anjali Patel', avatar: '', lastMessage: 'Thanks for the details. I\'ll get back to you soon!', isActive: false },
  ]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! Are you still looking for a roommate?', sender: 'Priya Sharma', timestamp: new Date(), isOwn: false },
    { id: '2', text: 'Yes, I am! Are you interested in the 2BHK in Koramangala?', sender: 'You', timestamp: new Date(), isOwn: true },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: newMessage, sender: 'You', timestamp: new Date(), isOwn: true }]);
    setNewMessage('');
    toast({ title: 'Message sent!' });
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: 'Thanks for your message! I will reply soon.', sender: selectedConversation.name, timestamp: new Date(), isOwn: false }]);
    }, 1500);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Please log in to access Chat.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Navigation />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"><MessageCircle className="h-6 w-6 text-white" /></div><div><h1 className="text-3xl font-bold text-foreground">Chat</h1><p className="text-muted-foreground">Connect with your matches</p></div></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <div className="lg:col-span-1"><Card className="h-full"><CardHeader><CardTitle>Conversations</CardTitle></CardHeader><CardContent className="p-0"><div className="space-y-1">{conversations.map(conv => (<div key={conv.id} className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`} onClick={() => setSelectedConversation(conv)}><div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><div className="flex-1 min-w-0"><div className="flex items-center justify-between"><h3 className="font-semibold text-foreground truncate">{conv.name}</h3></div><p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p></div></div></div>))}</div></CardContent></Card></div>
          <div className="lg:col-span-2"><Card className="h-full flex flex-col">{selectedConversation ? (<><CardHeader className="border-b"><div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><div><h3 className="font-semibold text-foreground">{selectedConversation.name}</h3></div></div></CardHeader><div className="flex-1 overflow-y-auto p-4 space-y-4">{messages.map(msg => (<div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}><div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-gray-100 text-foreground'} rounded-lg p-3`}><p className="text-sm">{msg.text}</p></div></div>))}<div ref={messagesEndRef} /></div><div className="border-t p-4"><div className="flex items-center gap-2"><Input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." className="pr-20" /><Button onClick={sendMessage} disabled={!newMessage.trim()}><Send className="h-4 w-4" /></Button></div></div></>):(<div className="flex-1 flex items-center justify-center"><div className="text-center"><MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3><p className="text-muted-foreground">Choose a conversation to start messaging</p></div></div>)}</Card></div>
        </div>
      </div>
    </div>
  );
}; 