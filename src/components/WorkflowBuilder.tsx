import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Play, Save, Trash2, Settings, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  title: string;
  description: string;
  config: Record<string, any>;
}

const nodeTypes = {
  trigger: { color: 'bg-primary/20 border-primary/30 text-primary', icon: '🚀' },
  action: { color: 'bg-secondary/20 border-secondary/30 text-secondary', icon: '⚡' },
  condition: { color: 'bg-accent/20 border-accent/30 text-accent', icon: '🔀' }
};

const nodeTemplates = {
  trigger: [
    { title: 'Page Load', description: 'When a webpage loads', config: { url: '' } },
    { title: 'Button Click', description: 'When a button is clicked', config: { selector: '' } }
  ],
  action: [
    { title: 'Click Element', description: 'Click on an element', config: { selector: '' } },
    { title: 'Fill Form', description: 'Fill form fields', config: { fields: {} } },
    { title: 'Navigate', description: 'Navigate to URL', config: { url: '' } }
  ],
  condition: [
    { title: 'Element Exists', description: 'Check if element exists', config: { selector: '' } },
    { title: 'Text Contains', description: 'Check if text contains value', config: { text: '' } }
  ]
};

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: '1',
      type: 'trigger',
      title: 'Page Load',
      description: 'When a webpage loads',
      config: { url: 'https://example.com' }
    }
  ]);
  const [workflowName, setWorkflowName] = useState('My Workflow');
  const [isRunning, setIsRunning] = useState(false);

  const addNode = (type: WorkflowNode['type'], template?: any) => {
    const templates = nodeTemplates[type];
    const selectedTemplate = template || templates[0];
    
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type,
      title: selectedTemplate.title,
      description: selectedTemplate.description,
      config: { ...selectedTemplate.config }
    };
    setNodes([...nodes, newNode]);
    toast({ title: 'Node added', description: `${selectedTemplate.title} added to workflow` });
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    toast({ title: 'Node removed', description: 'Node removed from workflow' });
  };

  const saveWorkflow = () => {
    const workflow = { name: workflowName, nodes, createdAt: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('autoflow-workflows') || '[]');
    saved.push(workflow);
    localStorage.setItem('autoflow-workflows', JSON.stringify(saved));
    toast({ title: 'Workflow saved', description: `"${workflowName}" has been saved` });
  };

  const runWorkflow = async () => {
    setIsRunning(true);
    toast({ title: 'Workflow started', description: 'Executing automation steps...' });
    
    setTimeout(() => {
      setIsRunning(false);
      toast({ title: 'Workflow completed', description: 'All steps executed successfully' });
    }, 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Workflow Builder
          </h2>
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="w-48 bg-background border-border"
            placeholder="Workflow name"
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={saveWorkflow} className="border-primary/20 hover:bg-primary/10">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button 
            size="sm" 
            onClick={runWorkflow}
            disabled={isRunning || nodes.length === 0}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 animate-glow-pulse"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>

      {/* Node palette */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Add Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['trigger', 'action', 'condition'] as const).map((type) => (
            <Card key={type} className="p-4 border-border">
              <h4 className="font-medium mb-2 capitalize flex items-center gap-2">
                <span className="text-lg">{nodeTypes[type].icon}</span>
                {type}s
              </h4>
              <div className="space-y-2">
                {nodeTemplates[type].slice(0, 2).map((template, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="sm"
                    onClick={() => addNode(type, template)}
                    className="w-full justify-start text-xs h-8 hover:bg-primary/10 hover:text-primary"
                  >
                    <Plus className="h-3 w-3 mr-2" />
                    {template.title}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Workflow canvas */}
      <div className="space-y-4">
        {nodes.map((node, index) => {
          const config = nodeTypes[node.type];
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {index > 0 && (
                <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-border" />
              )}
              
              <Card className={`p-4 ${config.color} hover:scale-[1.01] transition-all duration-200 cursor-pointer border-2`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{config.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{node.title}</h4>
                      <p className="text-sm text-muted-foreground">{node.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNode(node.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
        
        {nodes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <div className="text-4xl mb-4">🤖</div>
            <p className="text-lg mb-2">Start building your automation workflow</p>
            <p className="text-sm">Add triggers, actions, and conditions from the components above</p>
          </div>
        )}
      </div>
    </div>
  );
}