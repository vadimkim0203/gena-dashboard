'use client';

import AppAreaChart from '@/components/AppAreaChart';
import AppBarChart from '@/components/AppBarChart';
import AppPieChart from '@/components/AppPieChart';
import CardList from '@/components/CardList';

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 ">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart endpoint="/api/data/revenue" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title="Latest Transactions" endpoint={'/api/data/signups'} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">Test</div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart endpoint={''} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <CardList title="Popular Content" endpoint={'/api/data/orders'} />
      </div>
    </div>
  );
};

export default Homepage;
