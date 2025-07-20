import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, FileText, Shield, Zap } from 'lucide-react';

const footerLinks = [
  { label: 'Documentation', icon: FileText, href: '#' },
  { label: 'GitHub', icon: Github, href: '#' },
  { label: 'Privacy Policy', icon: Shield, href: '#' }
];

export function AutoFlowFooter() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AutoFlow Agent
              </h3>
              <p className="text-xs text-muted-foreground">Intelligent Web Automation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {footerLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 AutoFlow Agent. Built with React, LangChain & Puppeteer.</p>
        </div>
      </div>
    </footer>
  );
}