import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { WorkflowBuilder } from './WorkflowBuilder';
import { AgentConsole } from './AgentConsole';
import { SavedWorkflows } from './SavedWorkflows';
import { AutoFlowHero } from './AutoFlowHero';
import { AutoFlowFooter } from './AutoFlowFooter';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './theme-provider';
import { useState } from 'react';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Settings
      </h2>
      
      <div className="space-y-6">
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Theme Preferences</h3>
          <div className="flex gap-3">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              onClick={() => setTheme('system')}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              System
            </Button>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Agent Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Default Timeout (seconds)</label>
              <input 
                type="number" 
                defaultValue={30} 
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Max Retries</label>
              <input 
                type="number" 
                defaultValue={3} 
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = {
  home: AutoFlowHero,
  console: AgentConsole,
  workflows: SavedWorkflows,
  builder: WorkflowBuilder,
  settings: Settings
};

export function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();

  const ActiveComponent = sections[activeSection as keyof typeof sections] || sections.home;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="md:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AutoFlow Agent
              </h1>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:bg-blue-500/10"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </main>

        {activeSection === 'home' && <AutoFlowFooter />}
      </div>
    </div>
  );
}