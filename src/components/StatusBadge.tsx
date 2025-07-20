import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'idle' | 'running' | 'error' | 'success';
  className?: string;
}

const statusConfig = {
  idle: {
    label: 'Idle',
    className: 'bg-muted/20 text-muted-foreground border-muted/30',
    dotColor: 'bg-muted-foreground'
  },
  running: {
    label: 'Running',
    className: 'bg-secondary/20 text-secondary border-secondary/30 animate-accent-pulse',
    dotColor: 'bg-secondary'
  },
  error: {
    label: 'Error',
    className: 'bg-destructive/20 text-destructive border-destructive/30',
    dotColor: 'bg-destructive'
  },
  success: {
    label: 'Success',
    className: 'bg-primary/20 text-primary border-primary/30 animate-glow-pulse',
    dotColor: 'bg-primary'
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={cn(config.className, 'font-medium transition-all duration-300', className)}>
      <motion.div
        className={cn('w-2 h-2 rounded-full mr-2', config.dotColor)}
        animate={status === 'running' ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : status === 'success' ? { scale: [1, 1.1, 1] } : {}}
        transition={status === 'running' ? { repeat: Infinity, duration: 1.5 } : status === 'success' ? { repeat: Infinity, duration: 2 } : {}}
      />
      {config.label}
    </Badge>
  );
}