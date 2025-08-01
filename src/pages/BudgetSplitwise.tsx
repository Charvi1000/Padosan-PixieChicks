import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, DollarSign, Users, Plus, CheckCircle, Clock } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  category: string;
  date: string;
  status: 'pending' | 'settled';
}

interface Budget {
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

export const BudgetSplitwise = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', title: 'Rent', amount: 12000, paidBy: 'You', splitBetween: ['You', 'Amit'], category: 'Rent', date: '2024-07-01', status: 'settled' },
    { id: '2', title: 'Groceries', amount: 2000, paidBy: 'Amit', splitBetween: ['You', 'Amit'], category: 'Food', date: '2024-07-05', status: 'pending' },
    { id: '3', title: 'Internet', amount: 800, paidBy: 'You', splitBetween: ['You', 'Amit'], category: 'Utilities', date: '2024-07-03', status: 'settled' },
  ]);
  const [budgets] = useState<Budget[]>([
    { category: 'Rent', allocated: 12000, spent: 12000, color: 'from-blue-500 to-blue-600' },
    { category: 'Food', allocated: 4000, spent: 2000, color: 'from-green-500 to-green-600' },
    { category: 'Utilities', allocated: 2000, spent: 800, color: 'from-orange-500 to-orange-600' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: '' });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingAmount = expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount / e.splitBetween.length, 0);

  const handleAdd = () => {
    if (!newExpense.title || !newExpense.amount) return toast({ title: 'Fill all fields', variant: 'destructive' });
    setExpenses(prev => [{
      id: Date.now().toString(),
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      paidBy: 'You',
      splitBetween: ['You', 'Amit'],
      category: newExpense.category || 'Other',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    }, ...prev]);
    setShowAdd(false);
    setNewExpense({ title: '', amount: '', category: '' });
    toast({ title: 'Expense added!' });
  };

  const settleExpense = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'settled' } : e));
    toast({ title: 'Expense settled!' });
  };

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Please log in to access Budget Splitwise.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Navigation />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"><Calculator className="h-6 w-6 text-white" /></div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Budget Splitwise</h1>
            <p className="text-muted-foreground">Track and split expenses with your roommates</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"><CardContent className="p-6"><p className="text-blue-100 text-sm">Total Expenses</p><p className="text-2xl font-bold">₹{totalExpenses}</p></CardContent></Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"><CardContent className="p-6"><p className="text-orange-100 text-sm">Pending Amount</p><p className="text-2xl font-bold">₹{pendingAmount}</p></CardContent></Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white"><CardContent className="p-6"><p className="text-green-100 text-sm">Roommates</p><p className="text-2xl font-bold">2</p></CardContent></Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Recent Expenses</h2>
              <Button onClick={() => setShowAdd(true)} className="bg-gradient-to-r from-green-500 to-emerald-500"><Plus className="h-4 w-4 mr-2" />Add Expense</Button>
            </div>
            <div className="space-y-4">
              {expenses.map(e => (
                <Card key={e.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2"><h3 className="font-semibold text-foreground">{e.title}</h3><Badge variant={e.status === 'settled' ? 'default' : 'secondary'}>{e.status === 'settled' ? 'Settled' : 'Pending'}</Badge></div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>₹{e.amount}</span><span>•</span><span>Paid by {e.paidBy}</span><span>•</span><span>{e.category}</span><span>•</span><span>{e.date}</span></div>
                        <div className="mt-2 text-xs text-muted-foreground">Split between: {e.splitBetween.join(', ')}</div>
                      </div>
                      {e.status === 'pending' && <Button size="sm" onClick={() => settleExpense(e.id)} className="bg-gradient-to-r from-green-500 to-emerald-500"><CheckCircle className="h-4 w-4 mr-1" />Settle</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Budget Overview</h2>
            <div className="space-y-4">
              {budgets.map(b => {
                const percent = (b.spent / b.allocated) * 100;
                return <Card key={b.category}><CardContent className="p-4"><div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-foreground">{b.category}</h3><span className="text-sm text-muted-foreground">₹{b.spent} / ₹{b.allocated}</span></div><Progress value={percent} className="mb-2" /><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{percent.toFixed(1)}% used</span><span>₹{(b.allocated - b.spent)} remaining</span></div></CardContent></Card>;
              })}
            </div>
          </div>
        </div>
        {showAdd && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><Card className="w-full max-w-md bg-white/95 backdrop-blur-md"><CardHeader><CardTitle>Add New Expense</CardTitle></CardHeader><CardContent className="space-y-4"><div><Label htmlFor="title">Expense Title</Label><Input id="title" value={newExpense.title} onChange={e => setNewExpense(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g., Groceries" /></div><div><Label htmlFor="amount">Amount (₹)</Label><Input id="amount" type="number" value={newExpense.amount} onChange={e => setNewExpense(prev => ({ ...prev, amount: e.target.value }))} placeholder="0.00" /></div><div><Label htmlFor="category">Category</Label><Input id="category" value={newExpense.category} onChange={e => setNewExpense(prev => ({ ...prev, category: e.target.value }))} placeholder="e.g., Food, Rent" /></div><div className="flex gap-2 pt-4"><Button onClick={handleAdd} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"><Plus className="h-4 w-4 mr-2" />Add Expense</Button><Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button></div></CardContent></Card></div>}
      </div>
    </div>
  );
}; 