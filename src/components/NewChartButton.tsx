'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const NewChartButton = ({ dashboardId }: { dashboardId: string }) => {
  const router = useRouter();

  const handleAddChart = async () => {
    try {
      const res = await fetch(`/api/charts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dashboardId,
          type: 'bar',
          title: 'New Chart',
          dataEndpoint: '/api/data/default',
        }),
      });
      if (!res.ok) throw new Error('Failed to create chart');

      router.refresh();
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  };

  return (
    <Button onClick={handleAddChart}>
      <Plus className="h-4 w-4 mr-2" />
      Add Chart
    </Button>
  );
};

export default NewChartButton;
