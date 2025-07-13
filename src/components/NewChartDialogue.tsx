import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { NewChartDialogProps } from '@/lib/type';
import { ChartType } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export function NewChartDialog({
  open,
  onOpenChange,
  onSubmit,
}: NewChartDialogProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ChartType>('bar');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
     
      await onSubmit({ title, type });

   
      setTitle('');
      setType('bar');

      // Close dialog
      onOpenChange(false);

      // Refresh the page to show new chart
      router.refresh();
    } catch (error) {
      console.error('Error creating chart:', error);
      alert('Failed to create chart. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chart</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Chart Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter chart title"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type">Chart Type</label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as ChartType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="number">Number</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Create Chart
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
