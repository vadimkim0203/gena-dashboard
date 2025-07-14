'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { NewChartDialog } from './NewChartDialogue';
import { ChartType } from '@/lib/mockData';

const NewChartButton = ({ dashboardId }: { dashboardId: string }) => {
  const router = useRouter();
  const [dialogueOpen, setDialogueOpen] = useState(false);

  const handleCreateChart = async (data: {
    title: string;
    type: ChartType;
  }) => {
    try {
      const res = await fetch('/api/charts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dashboardId,
          type: data.type,
          title: data.title,
          dataEndpoint: `/api/data/${data.type}`, 
          order: Date.now(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to create chart');
      }

      const newChart = await res.json();
      console.log('Chart created successfully:', newChart);

      setDialogueOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error creating chart:', error);
      alert('Failed to create chart. Please try again.');
    }
  };

  return (
    <>
      <div
        onClick={() => setDialogueOpen(true)}
        className="bg-primary-foreground p-4 rounded-lg w-[300px] min-h-[200px] flex items-center justify-center border-2 border-dashed border-muted-foreground/50 hover:border-muted-foreground/80 transition-colors cursor-pointer"
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <Plus className="h-12 w-12 text-muted-foreground" />
          <span className="text-muted-foreground">Add New Chart</span>
        </div>
      </div>

      <NewChartDialog
        open={dialogueOpen}
        onOpenChange={setDialogueOpen}
        onSubmit={handleCreateChart}
      />
    </>
  );
};

export default NewChartButton;
