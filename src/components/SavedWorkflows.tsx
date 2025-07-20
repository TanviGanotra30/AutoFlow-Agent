import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Play, Edit, Trash2, Copy, Search, Calendar, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface SavedWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  createdAt: string;
  lastRun?: string;
  status: 'active' | 'draft' | 'archived';
  category: 'web-scraping' | 'form-automation' | 'testing' | 'monitoring' | 'other';
  runCount: number;
}

const mockWorkflows: SavedWorkflow[] = [
  {
    id: '1',
    name: 'Login Automation',
    description: 'Automated login flow for web applications',
    nodes: [{ type: 'trigger' }, { type: 'action' }, { type: 'action' }],
    createdAt: '2024-01-15T10:30:00Z',
    lastRun: '2024-01-20T14:22:00Z',
    status: 'active',
    category: 'form-automation',
    runCount: 25
  },
  {
    id: '2',
    name: 'Data Scraper',
    description: 'Extract product information from e-commerce sites',
    nodes: [{ type: 'trigger' }, { type: 'action' }, { type: 'condition' }, { type: 'action' }],
    createdAt: '2024-01-10T09:15:00Z',
    lastRun: '2024-01-19T16:45:00Z',
    status: 'active',
    category: 'web-scraping',
    runCount: 42
  }
];

const categoryColors = {
  'web-scraping': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'form-automation': 'bg-green-500/20 text-green-400 border-green-500/30',
  'testing': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'monitoring': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'other': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

const statusColors = {
  'active': 'bg-green-500/20 text-green-400 border-green-500/30',
  'draft': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'archived': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

export function SavedWorkflows() {
  const [workflows, setWorkflows] = useState<SavedWorkflow[]>(mockWorkflows);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredWorkflows = workflows
    .filter(workflow => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || workflow.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

  const runWorkflow = (workflow: SavedWorkflow) => {
    toast({ 
      title: 'Workflow started', 
      description: `"${workflow.name}" is now running` 
    });
    
    setWorkflows(prev => prev.map(w => 
      w.id === workflow.id 
        ? { ...w, lastRun: new Date().toISOString(), runCount: w.runCount + 1 }
        : w
    ));
  };

  const duplicateWorkflow = (workflow: SavedWorkflow) => {
    const newWorkflow: SavedWorkflow = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      createdAt: new Date().toISOString(),
      lastRun: undefined,
      runCount: 0,
      status: 'draft'
    };
    setWorkflows(prev => [newWorkflow, ...prev]);
    toast({ title: 'Workflow duplicated', description: `"${newWorkflow.name}" created` });
  };

  const deleteWorkflow = (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    setWorkflows(prev => prev.filter(w => w.id !== id));
    toast({ 
      title: 'Workflow deleted', 
      description: `"${workflow?.name}" has been removed` 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Saved Workflows
        </h2>
        <div className="text-sm text-muted-foreground">
          {filteredWorkflows.length} workflows
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background text-sm"
        >
          <option value="all">All Categories</option>
          <option value="web-scraping">Web Scraping</option>
          <option value="form-automation">Form Automation</option>
          <option value="testing">Testing</option>
          <option value="monitoring">Monitoring</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500/30 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                    {workflow.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {workflow.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge className={categoryColors[workflow.category]}>
                  {workflow.category.replace('-', ' ')}
                </Badge>
                <Badge className={statusColors[workflow.status]}>
                  {workflow.status}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Created: {formatDate(workflow.createdAt)}
                </div>
                {workflow.lastRun && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Last run: {formatDate(workflow.lastRun)}
                  </div>
                )}
                <div>
                  {workflow.nodes.length} steps • {workflow.runCount} runs
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => runWorkflow(workflow)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <Play className="h-3 w-3 mr-2" />
                  Run
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => duplicateWorkflow(workflow)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteWorkflow(workflow.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg mb-2">No workflows found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}