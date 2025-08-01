import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  PiggyBank,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  Users,
  Home,
  Wifi,
  Utensils,
  Car,
  Shield,
  Lightbulb,
  BarChart3,
  PieChart,
  Settings,
  Plus,
  Minus,
  ArrowRight,
  Star,
  Heart
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  icon: React.ComponentType<any>;
}

interface BudgetRecommendation {
  id: string;
  title: string;
  description: string;
  savings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export const PersonalBudget = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [budgetCategories] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'Rent & Utilities',
      allocated: 25000,
      spent: 22000,
      color: 'from-blue-500 to-blue-600',
      icon: Home
    },
    {
      id: '2',
      name: 'Food & Groceries',
      allocated: 8000,
      spent: 6500,
      color: 'from-green-500 to-green-600',
      icon: Utensils
    },
    {
      id: '3',
      name: 'Transportation',
      allocated: 3000,
      spent: 2800,
      color: 'from-orange-500 to-orange-600',
      icon: Car
    },
    {
      id: '4',
      name: 'Entertainment',
      allocated: 2000,
      spent: 1800,
      color: 'from-purple-500 to-purple-600',
      icon: Star
    },
    {
      id: '5',
      name: 'Healthcare',
      allocated: 1500,
      spent: 1200,
      color: 'from-red-500 to-red-600',
      icon: Shield
    },
    {
      id: '6',
      name: 'Savings',
      allocated: 5000,
      spent: 4500,
      color: 'from-emerald-500 to-emerald-600',
      icon: PiggyBank
    }
  ]);

  const [recommendations] = useState<BudgetRecommendation[]>([
    {
      id: '1',
      title: 'Switch to Public Transport',
      description: 'Save ₹1,500/month by using metro and buses instead of cabs',
      savings: 1500,
      difficulty: 'Easy',
      category: 'Transportation'
    },
    {
      id: '2',
      title: 'Cook More at Home',
      description: 'Reduce food delivery and cook 5 days a week to save ₹2,000/month',
      savings: 2000,
      difficulty: 'Medium',
      category: 'Food'
    },
    {
      id: '3',
      title: 'Find Roommate',
      description: 'Split rent and utilities with a roommate to save ₹12,000/month',
      savings: 12000,
      difficulty: 'Hard',
      category: 'Rent'
    },
    {
      id: '4',
      title: 'Cancel Unused Subscriptions',
      description: 'Review and cancel unnecessary subscriptions to save ₹500/month',
      savings: 500,
      difficulty: 'Easy',
      category: 'Entertainment'
    }
  ]);

  const [costBreakdown] = useState<CostBreakdown[]>([
    { category: 'Rent', amount: 22000, percentage: 55, color: 'from-blue-500 to-blue-600' },
    { category: 'Food', amount: 6500, percentage: 16, color: 'from-green-500 to-green-600' },
    { category: 'Transport', amount: 2800, percentage: 7, color: 'from-orange-500 to-orange-600' },
    { category: 'Entertainment', amount: 1800, percentage: 5, color: 'from-purple-500 to-purple-600' },
    { category: 'Healthcare', amount: 1200, percentage: 3, color: 'from-red-500 to-red-600' },
    { category: 'Others', amount: 5700, percentage: 14, color: 'from-gray-500 to-gray-600' }
  ]);

  const [monthlyIncome, setMonthlyIncome] = useState(45000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(40000);
  const [savingsGoal, setSavingsGoal] = useState(10000);

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalSavings = monthlyIncome - monthlyExpenses;
  const savingsProgress = (totalSavings / savingsGoal) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const applyRecommendation = (recommendation: BudgetRecommendation) => {
    toast({
      title: "Recommendation Applied! 💡",
      description: `${recommendation.title} has been added to your budget plan. Potential savings: ₹${recommendation.savings.toLocaleString()}/month`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border-white/30 shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center">
              <Calculator className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">Please log in to access budget options</p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Navigation />
      
      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Budget Options</h1>
                <p className="text-muted-foreground">Plan your finances and optimize your spending</p>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Monthly Income</p>
                    <p className="text-2xl font-bold">₹{monthlyIncome.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Monthly Expenses</p>
                    <p className="text-2xl font-bold">₹{monthlyExpenses.toLocaleString()}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Monthly Savings</p>
                    <p className="text-2xl font-bold">₹{totalSavings.toLocaleString()}</p>
                  </div>
                  <PiggyBank className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Savings Goal</p>
                    <p className="text-2xl font-bold">{savingsProgress.toFixed(0)}%</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Budget Categories */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Budget Categories</h2>
              <div className="space-y-4">
                {budgetCategories.map((category) => {
                  const percentage = (category.spent / category.allocated) * 100;
                  const Icon = category.icon;
                  return (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{category.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                ₹{category.spent.toLocaleString()} / ₹{category.allocated.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant={percentage > 90 ? 'destructive' : percentage > 75 ? 'secondary' : 'default'}>
                            {percentage.toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={percentage} className="mb-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>₹{(category.allocated - category.spent).toLocaleString()} remaining</span>
                          <span>{percentage > 100 ? 'Over budget' : 'On track'}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Cost Breakdown</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {costBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
                          <span className="font-medium text-foreground">{item.category}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">₹{item.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{item.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Budget Recommendations */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Smart Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((recommendation) => (
                <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{recommendation.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getDifficultyColor(recommendation.difficulty)}>
                            {recommendation.difficulty}
                          </Badge>
                          <Badge variant="outline">{recommendation.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{recommendation.savings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">monthly savings</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => applyRecommendation(recommendation)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Apply Recommendation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Budget Planning Tools */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Budget Planning Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Expense Tracker</h3>
                    <p className="text-sm text-muted-foreground mb-4">Track your daily expenses and categorize them</p>
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Start Tracking
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Savings Calculator</h3>
                    <p className="text-sm text-muted-foreground mb-4">Calculate how much you can save with different strategies</p>
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Calculate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Goal Setting</h3>
                    <p className="text-sm text-muted-foreground mb-4">Set financial goals and track your progress</p>
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Set Goals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 