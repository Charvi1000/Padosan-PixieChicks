import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  DollarSign, 
  Users, 
  Plus, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Edit3,
  Calendar,
  Target,
  Sparkles,
  Home,
  Utensils,
  WashingMachine,
  Brush,
  ShoppingCart,
  Wifi,
  Zap,
  RotateCcw
} from 'lucide-react';
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

interface Chore {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  assignedTo: string;
  lastDone: string;
  nextDue: string;
  status: 'pending' | 'completed';
  icon: string;
  priority: 'low' | 'medium' | 'high';
}

interface Budget {
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

const choreIcons: { [key: string]: any } = {
  'Cleaning': Brush,
  'Cooking': Utensils,
  'Laundry': WashingMachine,
  'Shopping': ShoppingCart,
  'Utilities': Zap,
  'Internet': Wifi,
  'General': Home
};

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

export const BudgetSplitwise = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('expenses');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', title: 'Rent', amount: 12000, paidBy: 'You', splitBetween: ['You', 'Amit'], category: 'Rent', date: '2024-07-01', status: 'settled' },
    { id: '2', title: 'Groceries', amount: 2000, paidBy: 'Amit', splitBetween: ['You', 'Amit'], category: 'Food', date: '2024-07-05', status: 'pending' },
    { id: '3', title: 'Internet', amount: 800, paidBy: 'You', splitBetween: ['You', 'Amit'], category: 'Utilities', date: '2024-07-03', status: 'settled' },
  ]);
  
  const [chores, setChores] = useState<Chore[]>([
    { id: '1', title: 'Kitchen Cleaning', description: 'Clean kitchen counters and dishes', frequency: 'daily', assignedTo: 'You', lastDone: '2024-07-05', nextDue: '2024-07-06', status: 'pending', icon: 'Cleaning', priority: 'high' },
    { id: '2', title: 'Grocery Shopping', description: 'Buy weekly groceries', frequency: 'weekly', assignedTo: 'Amit', lastDone: '2024-07-01', nextDue: '2024-07-08', status: 'pending', icon: 'Shopping', priority: 'medium' },
    { id: '3', title: 'Laundry', description: 'Do laundry for both roommates', frequency: 'weekly', assignedTo: 'You', lastDone: '2024-07-03', nextDue: '2024-07-10', status: 'completed', icon: 'Laundry', priority: 'low' },
    { id: '4', title: 'Bathroom Cleaning', description: 'Clean bathroom and toilet', frequency: 'weekly', assignedTo: 'Amit', lastDone: '2024-07-02', nextDue: '2024-07-09', status: 'pending', icon: 'Cleaning', priority: 'medium' },
    { id: '5', title: 'Cooking Dinner', description: 'Prepare dinner for both', frequency: 'daily', assignedTo: 'You', lastDone: '2024-07-05', nextDue: '2024-07-06', status: 'pending', icon: 'Cooking', priority: 'high' },
  ]);

  const [budgets] = useState<Budget[]>([
    { category: 'Rent', allocated: 12000, spent: 12000, color: 'from-blue-500 to-blue-600' },
    { category: 'Food', allocated: 4000, spent: 2000, color: 'from-green-500 to-green-600' },
    { category: 'Utilities', allocated: 2000, spent: 800, color: 'from-orange-500 to-orange-600' },
  ]);
  
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddChore, setShowAddChore] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: '' });
  const [newChore, setNewChore] = useState({ 
    title: '', 
    description: '', 
    frequency: 'weekly' as const, 
    assignedTo: 'You',
    priority: 'medium' as const,
    icon: 'General'
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingAmount = expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount / e.splitBetween.length, 0);
  const pendingChores = chores.filter(c => c.status === 'pending').length;
  const completedChores = chores.filter(c => c.status === 'completed').length;
  const highPriorityChores = chores.filter(c => c.priority === 'high' && c.status === 'pending').length;

  const handleAddExpense = () => {
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
    setShowAddExpense(false);
    setNewExpense({ title: '', amount: '', category: '' });
    toast({ title: 'Expense added! 💰' });
  };

  const handleAddChore = () => {
    if (!newChore.title || !newChore.description) return toast({ title: 'Fill all fields', variant: 'destructive' });
    const nextDue = new Date();
    if (newChore.frequency === 'daily') nextDue.setDate(nextDue.getDate() + 1);
    else if (newChore.frequency === 'weekly') nextDue.setDate(nextDue.getDate() + 7);
    else nextDue.setMonth(nextDue.getMonth() + 1);

    setChores(prev => [{
      id: Date.now().toString(),
      title: newChore.title,
      description: newChore.description,
      frequency: newChore.frequency,
      assignedTo: newChore.assignedTo,
      lastDone: new Date().toISOString().split('T')[0],
      nextDue: nextDue.toISOString().split('T')[0],
      status: 'pending',
      icon: newChore.icon,
      priority: newChore.priority
    }, ...prev]);
    setShowAddChore(false);
    setNewChore({ title: '', description: '', frequency: 'weekly', assignedTo: 'You', priority: 'medium', icon: 'General' });
    toast({ title: 'Chore added! 🧹' });
  };

  const settleExpense = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'settled' } : e));
    toast({ title: 'Expense settled! ✅' });
  };

  const completeChore = (id: string) => {
    setChores(prev => prev.map(c => c.id === id ? { ...c, status: 'completed' } : c));
    toast({ title: 'Chore completed! 🎉' });
  };

  const reassignChore = (id: string, newAssignee: string) => {
    setChores(prev => prev.map(c => c.id === id ? { ...c, assignedTo: newAssignee } : c));
    toast({ title: `Chore reassigned to ${newAssignee}! 🔄` });
  };

  const deleteChore = (id: string) => {
    setChores(prev => prev.filter(c => c.id !== id));
    toast({ title: 'Chore deleted! 🗑️' });
  };

  const resetChore = (id: string) => {
    const chore = chores.find(c => c.id === id);
    if (!chore) return;
    
    const nextDue = new Date();
    if (chore.frequency === 'daily') nextDue.setDate(nextDue.getDate() + 1);
    else if (chore.frequency === 'weekly') nextDue.setDate(nextDue.getDate() + 7);
    else nextDue.setMonth(nextDue.getMonth() + 1);

    setChores(prev => prev.map(c => c.id === id ? { 
      ...c, 
      status: 'pending',
      lastDone: new Date().toISOString().split('T')[0],
      nextDue: nextDue.toISOString().split('T')[0]
    } : c));
    toast({ title: 'Chore reset! 🔄' });
  };

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Please log in to access Divide Up.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Divide Up</h1>
            <p className="text-muted-foreground">Split expenses and chores with your roommates</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8" />
                <div>
                  <p className="text-blue-100 text-sm">Total Expenses</p>
                  <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8" />
                <div>
                  <p className="text-orange-100 text-sm">Pending Amount</p>
                  <p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8" />
                <div>
                  <p className="text-red-100 text-sm">Pending Chores</p>
                  <p className="text-2xl font-bold">{pendingChores}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8" />
                <div>
                  <p className="text-green-100 text-sm">Completed Chores</p>
                  <p className="text-2xl font-bold">{completedChores}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                <div>
                  <p className="text-purple-100 text-sm">High Priority</p>
                  <p className="text-2xl font-bold">{highPriorityChores}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="chores" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Chores
            </TabsTrigger>
          </TabsList>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Expense Management</h2>
              <Button onClick={() => setShowAddExpense(true)} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Expenses */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Recent Expenses</h3>
                <div className="space-y-4">
                  {expenses.map(expense => (
                    <Card key={expense.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-foreground">{expense.title}</h4>
                              <Badge variant={expense.status === 'settled' ? 'default' : 'secondary'}>
                                {expense.status === 'settled' ? 'Settled' : 'Pending'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="font-semibold text-green-600">₹{expense.amount.toLocaleString()}</span>
                              <span>•</span>
                              <span>Paid by {expense.paidBy}</span>
                              <span>•</span>
                              <span>{expense.category}</span>
                              <span>•</span>
                              <span>{expense.date}</span>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              Split between: {expense.splitBetween.join(', ')}
                            </div>
                          </div>
                          {expense.status === 'pending' && (
                            <Button size="sm" onClick={() => settleExpense(expense.id)} className="bg-gradient-to-r from-green-500 to-emerald-500">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Settle
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Budget Overview */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Budget Overview</h3>
                <div className="space-y-4">
                  {budgets.map(budget => {
                    const percent = (budget.spent / budget.allocated) * 100;
                    return (
                      <Card key={budget.category} className="hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{budget.category}</h4>
                            <span className="text-sm text-muted-foreground">
                              ₹{budget.spent.toLocaleString()} / ₹{budget.allocated.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={percent} className="mb-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{percent.toFixed(1)}% used</span>
                            <span>₹{(budget.allocated - budget.spent).toLocaleString()} remaining</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Chores Tab */}
          <TabsContent value="chores" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Chore Management</h2>
              <Button onClick={() => setShowAddChore(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Chore
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Chores */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Pending Chores</h3>
                <div className="space-y-4">
                  {chores.filter(chore => chore.status === 'pending').map(chore => {
                    const IconComponent = choreIcons[chore.icon] || Home;
                    return (
                      <Card key={chore.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-500">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-foreground">{chore.title}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {chore.frequency}
                                </Badge>
                                <Badge className={`text-xs border ${priorityColors[chore.priority]}`}>
                                  {chore.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{chore.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-muted-foreground">
                                  <div>Assigned to: <span className="font-medium">{chore.assignedTo}</span></div>
                                  <div>Due: {chore.nextDue}</div>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => completeChore(chore.id)}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Complete
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => reassignChore(chore.id, chore.assignedTo === 'You' ? 'Amit' : 'You')}
                                  >
                                    <Edit3 className="h-4 w-4 mr-1" />
                                    Reassign
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => deleteChore(chore.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Completed Chores */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Completed Chores</h3>
                <div className="space-y-4">
                  {chores.filter(chore => chore.status === 'completed').map(chore => {
                    const IconComponent = choreIcons[chore.icon] || Home;
                    return (
                      <Card key={chore.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500 opacity-75">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-foreground">{chore.title}</h4>
                                <Badge variant="default" className="text-xs">
                                  Completed
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{chore.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-muted-foreground">
                                  <div>Completed by: <span className="font-medium">{chore.assignedTo}</span></div>
                                  <div>Completed on: {chore.lastDone}</div>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => resetChore(chore.id)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <RotateCcw className="h-4 w-4 mr-1" />
                                  Reset
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Add New Expense
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Expense Title</Label>
                  <Input 
                    id="title" 
                    value={newExpense.title} 
                    onChange={e => setNewExpense(prev => ({ ...prev, title: e.target.value }))} 
                    placeholder="e.g., Groceries" 
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={newExpense.amount} 
                    onChange={e => setNewExpense(prev => ({ ...prev, amount: e.target.value }))} 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    value={newExpense.category} 
                    onChange={e => setNewExpense(prev => ({ ...prev, category: e.target.value }))} 
                    placeholder="e.g., Food, Rent" 
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddExpense} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddExpense(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Chore Modal */}
        {showAddChore && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Add New Chore
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="chore-title">Chore Title</Label>
                  <Input 
                    id="chore-title" 
                    value={newChore.title} 
                    onChange={e => setNewChore(prev => ({ ...prev, title: e.target.value }))} 
                    placeholder="e.g., Kitchen Cleaning" 
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    value={newChore.description} 
                    onChange={e => setNewChore(prev => ({ ...prev, description: e.target.value }))} 
                    placeholder="e.g., Clean kitchen counters and dishes" 
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <select 
                    id="frequency"
                    value={newChore.frequency}
                    onChange={e => setNewChore(prev => ({ ...prev, frequency: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select 
                    id="priority"
                    value={newChore.priority}
                    onChange={e => setNewChore(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <select 
                    id="assignedTo"
                    value={newChore.assignedTo}
                    onChange={e => setNewChore(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="You">You</option>
                    <option value="Amit">Amit</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddChore} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Chore
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddChore(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}; 