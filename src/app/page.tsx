'use client';

import AppAreaChart from '@/components/AppAreaChart';
import { AppHorizontalChart } from '@/components/AppHorizontalChart';
import AppPieChart from '@/components/AppPieChart';
import { AppStackedChart } from '@/components/AppStackedChart';
import CardList from '@/components/CardList';

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 ">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppHorizontalChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <AppPieChart title="Browser Usage" endpoint="/api/data/total_visitors" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title="Latest Transactions" endpoint={'/api/data/signups_by_region'} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <AppStackedChart endpoint="/api/data/product_performance" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart endpoint="/api/data/orders_over_time" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title="Popular Content" endpoint={'/api/data/orders_over_time'} />
      </div>
    </div>
  );
};

export default Homepage;
