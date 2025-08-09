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
      try {
        const res = await fetch('/api/dashboards');

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Failed to fetch dashboards: ${res.status}`, errorText);
          return;
        }

        const data = await res.json();
        setDashboards(data);
      } catch (error) {
        console.error('Error fetching dashboards:', error);
      }
    }

    fetchDashboards();
  }, [refreshKey]);

  const handleRename = async (id: string) => {
    try {
      const res = await fetch(`/api/dashboards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      });

      const responseText = await res.text();

      if (!res.ok) {
        throw new Error(
          `Failed to update dashboard: ${res.status} ${responseText}`,
        );
      }

      const updated = responseText ? JSON.parse(responseText) : {};

      setDashboards((prev) =>
        prev.map((d) => (d.id === id ? { ...d, name: updated.name } : d)),
      );

      setEditingId(null);

      if (window.location.pathname.includes(`/dashboards/${id}`)) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating dashboard:', error);
      alert(
        `Failed to update dashboard name: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRename(dashboard.id);
                      }
                    }}
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
