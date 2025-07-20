import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from './StatusBadge';
import { Play, RotateCcw, Square, Download, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'action' | 'warning';
  message: string;
  details?: string;
  duration?: number;
}

interface ExecutionStats {
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
  startTime: string;
  duration: number;
}

export function AgentConsole() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [stats, setStats] = useState<ExecutionStats>({
    totalSteps: 0,
    completedSteps: 0,
    failedSteps: 0,
    startTime: '',
    duration: 0
  });
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'Agent console initialized',
      details: 'LangChain model loaded successfully'
    },
    {
      id: '2',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'Puppeteer browser launched',
      details: 'Headless Chrome v119.0.6045.105'
    }
  ]);

  const logTypeColors = {
    info: 'text-blue-400',
    success: 'text-green-400',
    error: 'text-red-400',
    action: 'text-yellow-400',
    warning: 'text-orange-400'
  };

  const addLog = (type: LogEntry['type'], message: string, details?: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      details,
      duration: Math.random() * 2000 + 500
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  };

  const simulateWorkflow = async () => {
    const steps = [
      { message: 'Navigating to target page', details: 'https://example.com', type: 'action' as const },
      { message: 'Page loaded successfully', details: 'DOM ready in 1.2s', type: 'success' as const },
      { message: 'Locating form elements', details: 'Found 3 input fields', type: 'action' as const },
      { message: 'Filling email field', details: 'user@example.com', type: 'action' as const },
      { message: 'Filling password field', details: '••••••••', type: 'action' as const },
      { message: 'Clicking submit button', details: 'Button[type="submit"]', type: 'action' as const },
      { message: 'Form submitted successfully', details: 'Redirected to dashboard', type: 'success' as const }
    ];

    setStats({
      totalSteps: steps.length,
      completedSteps: 0,
      failedSteps: 0,
      startTime: new Date().toLocaleTimeString(),
      duration: 0
    });

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentStep(step.message);
      setProgress((i + 1) / steps.length * 100);
      
      addLog(step.type, step.message, step.details);
      
      setStats(prev => ({
        ...prev,
        completedSteps: i + 1,
        duration: Date.now() - new Date(`1970-01-01T${prev.startTime}`).getTime()
      }));
      
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    }
    
    setCurrentStep('Workflow completed');
    toast({ title: 'Workflow completed', description: 'All automation steps executed successfully' });
  };

  const startAgent = async () => {
    setIsRunning(true);
    setProgress(0);
    addLog('info', 'Starting workflow execution', 'Initializing automation agent');
    toast({ title: 'Agent started', description: 'Beginning workflow execution' });
    
    await simulateWorkflow();
    
    setIsRunning(false);
    setCurrentStep('');
  };

  const stopAgent = () => {
    setIsRunning(false);
    setProgress(0);
    setCurrentStep('');
    addLog('warning', 'Workflow execution stopped', 'Stopped by user');
    toast({ title: 'Agent stopped', description: 'Workflow execution halted' });
  };

  const retryLastStep = () => {
    addLog('info', 'Retrying last failed step', 'Attempting recovery');
    toast({ title: 'Retrying', description: 'Attempting to recover from last error' });
  };

  const clearLogs = () => {
    setLogs([]);
    toast({ title: 'Logs cleared', description: 'Console history has been cleared' });
  };

  const exportLogs = () => {
    const logData = JSON.stringify(logs, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autoflow-logs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Logs exported', description: 'Log file downloaded successfully' });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Agent Console
          </h2>
          <div className="flex items-center gap-4">
            <StatusBadge status={isRunning ? 'running' : 'idle'} />
            {currentStep && (
              <Badge variant="outline" className="animate-pulse">
                {currentStep}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={startAgent}
            disabled={isRunning}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
          <Button
            onClick={stopAgent}
            disabled={!isRunning}
            variant="destructive"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
          <Button variant="outline" onClick={retryLastStep}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry
          </Button>
          <Button variant="outline" onClick={exportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-400">{stats.totalSteps}</div>
          <div className="text-sm text-muted-foreground">Total Steps</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-400">{stats.completedSteps}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-400">{stats.failedSteps}</div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-400">{Math.round(stats.duration / 1000)}s</div>
          <div className="text-sm text-muted-foreground">Duration</div>
        </Card>
      </div>

      {/* Progress */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Execution Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            {currentStep && (
              <div className="text-sm text-muted-foreground mt-2">{currentStep}</div>
            )}
          </Card>
        </motion.div>
      )}

      {/* Logs */}
      <Card className="flex-1">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Execution Logs ({logs.length})
          </h3>
          <div className="text-sm text-muted-foreground">
            Last updated: {logs[0]?.timestamp || 'Never'}
          </div>
        </div>
        <ScrollArea className="h-96 p-4">
          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-2">📝</div>
                <p>No logs yet. Start an agent to see execution details.</p>
              </div>
            ) : (
              logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3 text-sm font-mono p-3 rounded-lg bg-card/50 border"
                >
                  <span className="text-muted-foreground shrink-0 min-w-[80px]">
                    [{log.timestamp}]
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`shrink-0 ${logTypeColors[log.type]} border-current`}
                  >
                    {log.type.toUpperCase()}
                  </Badge>
                  <div className="flex-1">
                    <div className="font-medium">{log.message}</div>
                    {log.details && (
                      <div className="text-muted-foreground mt-1 text-xs">
                        {log.details}
                      </div>
                    )}
                    {log.duration && (
                      <div className="text-muted-foreground mt-1 text-xs">
                        Duration: {log.duration.toFixed(0)}ms
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}