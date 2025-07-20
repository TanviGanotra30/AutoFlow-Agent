import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Terminal, Workflow, Save, Settings, Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, badge: null },
  { id: 'builder', label: 'Workflow Builder', icon: Workflow, badge: 'New' },
  { id: 'console', label: 'Agent Console', icon: Terminal, badge: null },
  { id: 'workflows', label: 'Saved Workflows', icon: Save, badge: '12' },
  { id: 'settings', label: 'Settings', icon: Settings, badge: null }
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center animate-glow-pulse">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AutoFlow
            </h1>
            <p className="text-xs text-muted-foreground">AI Agent Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 h-12 text-left transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg animate-glow-pulse' 
                    : 'hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-transparent'
                }`}
                onClick={() => handleSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? 'secondary' : 'outline'}
                    className={`text-xs ${
                      isActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30' 
                        : 'bg-accent/20 text-accent border-accent/30 animate-accent-pulse'
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </motion.div>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-border">
        <div className="bg-card/50 rounded-lg p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
            <span className="text-sm font-medium text-foreground">System Status</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Agent:</span>
              <span className="text-primary font-medium">Online</span>
            </div>
            <div className="flex justify-between">
              <span>Queue:</span>
              <span className="text-secondary font-medium">3 pending</span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className="text-accent font-medium">2.1GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 hover:text-primary"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-background/95 backdrop-blur-md border-r border-border z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" 
            onClick={() => setIsMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="md:hidden fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-50"
          >
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </>
  );
}