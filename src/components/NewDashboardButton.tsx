'use client';

import { useRouter } from 'next/navigation';
import { SidebarMenuButton } from './ui/sidebar';
import { Plus } from 'lucide-react';
import { useDashboardContext } from '@/lib/DashboardContext';

const NewDashboardButton = () => {
  const router = useRouter();
  const { triggerRefresh } = useDashboardContext();

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/dashboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'New Dashboard',
          charts: [],
        }),
      });
      if (!res.ok) throw new Error('Failed to create dashboard');

      const newDashboard = await res.json();
      triggerRefresh();
      router.push(`/dashboards/${newDashboard.id}`);
      // router.refresh();
    } catch (error) {
      console.error('Error creating dashboard:', error);
    }
  };

  return (
    <SidebarMenuButton onClick={handleCreate}>
      <Plus className="h-4 w-4 mr-2" />
      <span>Add Dashboard</span>
    </SidebarMenuButton>
  );
};

export default NewDashboardButton;
