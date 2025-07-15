import Link from 'next/link';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { Dashboard } from '@/lib/mockData';
import { Pencil, Projector, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useDashboardContext } from '@/lib/DashboardContext';

const DashboardList = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { refreshKey } = useDashboardContext();
  
  useEffect(() => {
    async function fetchDashboards() {
      const res = await fetch('/api/dashboards');
      if (res.ok) {
        const data = await res.json();
        setDashboards(data);
      }
    }
    fetchDashboards();
  }, [refreshKey]);

  useEffect(() => {
    async function fetchDashboards() {
      const res = await fetch('/api/dashboards');
      if (res.ok) {
        const data = await res.json();
        setDashboards(data);
      }
    }
    fetchDashboards();
  }, []);

  const handleRename = async (id: string) => {
    try {
      const res = await fetch(`/api/dashboards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      });

      if (!res.ok) throw new Error('Failed to update dashboard');

      const updated = await res.json();

      setDashboards((prev) =>
        prev.map((d) => (d.id === id ? { ...d, name: updated.name } : d)),
      );

      setEditingId(null);

      if (window.location.pathname.includes(`/dashboards/${id}`)) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating dashboard:', error);
      alert('Failed to update dashboard name');
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/dashboards/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }

      setDashboards((prev) => prev.filter((d) => d.id !== id));

      router.push('/');

      if (window.location.pathname.includes(`/dashboards/${id}`)) {
        router.push('/');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete dashboard');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <SidebarMenu>
      {dashboards.map((dashboard) => (
        <SidebarMenuItem key={dashboard.id}>
          <SidebarMenuButton asChild>
            <div className="flex items-center gap-2 w-full">
              <Projector />
              {editingId === dashboard.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-transparent border-b border-gray-300 outline-none text-sm flex-1"
                  />
                  <Button
                    className="!p-0 ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none hover:text-gray-500"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRename(dashboard.id)}
                  >
                    <Save className="cursor-pointer" />
                  </Button>
                </>
              ) : (
                <>
                  <Link href={`/dashboards/${dashboard.id}`} className="flex-1">
                    {dashboard.name}
                  </Link>
                  <Button
                    className="!p-0 ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none hover:text-gray-500"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingId(dashboard.id);
                      setEditName(dashboard.name);
                    }}
                  >
                    <Pencil />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                onClick={() => handleDelete(dashboard.id)}
                disabled={deletingId === dashboard.id}
                className="!p-0 ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none text-red-500 hover:text-red-700"
              >
                {deletingId === dashboard.id ? (
                  <div className="border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default DashboardList;
