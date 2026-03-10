import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Trash2, 
  Download, 
  Users, 
  Mail, 
  Calendar, 
  TrendingUp,
  Lock,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';
import { ContactFormData } from '@/services/emailService';

// Admin password - use environment variable or default (change in production!)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'nextreach2024';

interface StoredSubmission extends ContactFormData {
  id: string;
  timestamp: string;
  status: 'new' | 'viewed' | 'contacted' | 'closed';
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<StoredSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<StoredSubmission | null>(null);

  // Load submissions from localStorage
  const loadSubmissions = () => {
    try {
      const stored = localStorage.getItem('contact_submissions');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSubmissions(parsed);
        setFilteredSubmissions(parsed);
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  // Save submissions to localStorage
  const saveSubmissions = (updatedSubmissions: StoredSubmission[]) => {
    try {
      localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
      setSubmissions(updatedSubmissions);
      filterSubmissions(updatedSubmissions, searchTerm, statusFilter);
    } catch (error) {
      console.error('Error saving submissions:', error);
    }
  };

  // Filter submissions based on search and status
  const filterSubmissions = (subs: StoredSubmission[], search: string, status: string) => {
    let filtered = subs;

    if (search) {
      filtered = filtered.filter(sub => 
        sub.firstName.toLowerCase().includes(search.toLowerCase()) ||
        sub.lastName.toLowerCase().includes(search.toLowerCase()) ||
        sub.email.toLowerCase().includes(search.toLowerCase()) ||
        sub.business.toLowerCase().includes(search.toLowerCase()) ||
        sub.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(sub => sub.status === status);
    }

    setFilteredSubmissions(filtered);
  };

  // Handle authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadSubmissions();
    } else {
      alert('Invalid password');
    }
  };

  // Update submission status
  const updateSubmissionStatus = (id: string, newStatus: StoredSubmission['status']) => {
    const updated = submissions.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    );
    saveSubmissions(updated);
  };

  // Delete submission
  const deleteSubmission = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      const updated = submissions.filter(sub => sub.id !== id);
      saveSubmissions(updated);
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Business', 'Location', 'Service', 'Budget', 'Phone', 'Status', 'Message'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        new Date(sub.timestamp).toLocaleDateString(),
        `"${sub.firstName} ${sub.lastName}"`,
        sub.email,
        `"${sub.business}"`,
        sub.location,
        sub.service || '',
        sub.budget || '',
        sub.phone ? `+91${sub.phone}` : '',
        sub.status,
        `"${sub.message.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Handle search and filter changes
  useEffect(() => {
    filterSubmissions(submissions, searchTerm, statusFilter);
  }, [searchTerm, statusFilter, submissions]);

  // Analytics data
  const analytics = {
    total: submissions.length,
    newSubmissions: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    closed: submissions.filter(s => s.status === 'closed').length,
    thisWeek: submissions.filter(s => {
      const submissionDate = new Date(s.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return submissionDate > weekAgo;
    }).length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access
            </CardTitle>
            <CardDescription className="text-center">
              Enter admin password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-300">Manage contact form submissions</p>
          </div>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Submissions</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.total}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">New</CardTitle>
                  <Mail className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.newSubmissions}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Contacted</CardTitle>
                  <Calendar className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.contacted}</div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">This Week</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.thisWeek}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Submissions */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Submissions</CardTitle>
                <CardDescription className="text-slate-300">
                  Latest contact form entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <div className="font-medium text-white">{submission.firstName} {submission.lastName}</div>
                        <div className="text-sm text-slate-300">{submission.business} • {submission.email}</div>
                        <div className="text-xs text-slate-400">
                          {new Date(submission.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge 
                        variant={submission.status === 'new' ? 'default' : 'secondary'}
                        className={
                          submission.status === 'new' ? 'bg-green-600' :
                          submission.status === 'viewed' ? 'bg-blue-600' :
                          submission.status === 'contacted' ? 'bg-yellow-600' : 'bg-gray-600'
                        }
                      >
                        {submission.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">All Submissions</CardTitle>
                    <CardDescription className="text-slate-300">
                      Manage and review contact form submissions
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={loadSubmissions}
                      variant="outline"
                      size="sm"
                      className="text-white border-white/20 hover:bg-white/10"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button
                      onClick={exportToCSV}
                      variant="outline"
                      size="sm"
                      className="text-white border-white/20 hover:bg-white/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>
                
                {/* Search and Filter */}
                <div className="flex gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search submissions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="viewed">Viewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredSubmissions.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      No submissions found
                    </div>
                  ) : (
                    filteredSubmissions.map((submission) => (
                      <div key={submission.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-white">
                              {submission.firstName} {submission.lastName}
                            </h3>
                            <p className="text-sm text-slate-300">{submission.business}</p>
                          </div>
                          <Badge 
                            variant="secondary"
                            className={
                              submission.status === 'new' ? 'bg-green-600' :
                              submission.status === 'viewed' ? 'bg-blue-600' :
                              submission.status === 'contacted' ? 'bg-yellow-600' : 'bg-gray-600'
                            }
                          >
                            {submission.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-300 mb-3">
                          <div>Email: {submission.email}</div>
                          <div>Location: {submission.location}</div>
                          <div>Date: {new Date(submission.timestamp).toLocaleDateString()}</div>
                        </div>
                        
                        {submission.service && (
                          <div className="text-sm text-slate-300 mb-2">Service: {submission.service}</div>
                        )}
                        
                        {submission.budget && (
                          <div className="text-sm text-slate-300 mb-2">Budget: {submission.budget}</div>
                        )}
                        
                        {submission.phone && (
                          <div className="text-sm text-slate-300 mb-2">Phone: +91{submission.phone}</div>
                        )}
                        
                        {submission.message && (
                          <div className="text-sm text-slate-300 mb-3">
                            Message: {submission.message}
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => updateSubmissionStatus(submission.id, 'viewed')}
                            disabled={submission.status === 'viewed'}
                            size="sm"
                            variant="outline"
                            className="text-white border-white/20 hover:bg-white/10"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Mark Viewed
                          </Button>
                          <Button
                            onClick={() => updateSubmissionStatus(submission.id, 'contacted')}
                            disabled={submission.status === 'contacted'}
                            size="sm"
                            variant="outline"
                            className="text-white border-white/20 hover:bg-white/10"
                          >
                            Mark Contacted
                          </Button>
                          <Button
                            onClick={() => updateSubmissionStatus(submission.id, 'closed')}
                            disabled={submission.status === 'closed'}
                            size="sm"
                            variant="outline"
                            className="text-white border-white/20 hover:bg-white/10"
                          >
                            Close
                          </Button>
                          <Button
                            onClick={() => deleteSubmission(submission.id)}
                            size="sm"
                            variant="destructive"
                            className="ml-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Submission Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">New</span>
                      <span className="text-green-400">{analytics.newSubmissions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Contacted</span>
                      <span className="text-yellow-400">{analytics.contacted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Closed</span>
                      <span className="text-gray-400">{analytics.closed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">This Week</span>
                      <span className="text-blue-400">{analytics.thisWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total</span>
                      <span className="text-white">{analytics.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;