'use client';

import AppAreaChart from '@/components/AppAreaChart';
import { AppHorizontalChart } from '@/components/AppHorizontalChart';
import AppPieChart from '@/components/AppPieChart';
import { AppStackedChart } from '@/components/AppStackedChart';
import CardList from '@/components/CardList';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { JSX, useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({
  id,
  component,
}: {
  id: string;
  component: JSX.Element;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-primary-foreground p-4 rounded-lg"
    >
      {component}
    </div>
  );
};

const Homepage = () => {
  const [items, setItems] = useState([
    { id: 'horizontal-chart', component: <AppHorizontalChart /> },
    {
      id: 'pie-chart',
      component: (
        <AppPieChart
          title="Browser Usage"
          endpoint="/api/data/total_visitors"
        />
      ),
    },
    {
      id: 'latest-transactions',
      component: (
        <CardList
          title="Latest Transactions"
          endpoint="/api/data/signups_by_region"
        />
      ),
    },
    {
      id: 'stacked-chart',
      component: <AppStackedChart endpoint="/api/data/product_performance" />,
    },
    {
      id: 'area-chart',
      component: <AppAreaChart endpoint="/api/data/orders_over_time" />,
    },
    {
      id: 'popular-content',
      component: (
        <CardList
          title="Popular Content"
          endpoint="/api/data/orders_over_time"
        />
      ),
    },
  ]); //store for tracking the order of charts while being dnd
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null); //state of currently dragged item

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over || active.id === over.id) return;

    setItems((prevItems) => {
      const oldIndex = prevItems.findIndex((item) => item.id === active.id);
      const newIndex = prevItems.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return prevItems;

      const updatedItems = [...prevItems];
      const [movedItem] = updatedItems.splice(oldIndex, 1);
      updatedItems.splice(newIndex, 0, movedItem);
      return updatedItems;
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 ">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              component={item.component}
              id={item.id}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Homepage;
