'use client';

import { Props } from '@/lib/mockData';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';

const popularContent = [
  {
    id: 1,
    title: 'JavaScript Tutorial',
    badge: 'Coding',
    image:
      'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 4300,
  },
  {
    id: 2,
    title: 'Tech Trends 2025',
    badge: 'Tech',
    image:
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 3200,
  },
  {
    id: 3,
    title: 'The Future of AI',
    badge: 'AI',
    image:
      'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 2400,
  },
  {
    id: 4,
    title: 'React Hooks Explained',
    badge: 'Coding',
    image:
      'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 1500,
  },
  {
    id: 5,
    title: 'Image Generation with AI',
    badge: 'AI',
    image:
      'https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 1200,
  },
];

const latestTransactions = [
  {
    id: 1,
    title: 'Subscription Renewal',
    badge: 'John Doe',
    count: 1400,
  },
  {
    id: 2,
    title: 'Payment for Services',
    badge: 'Jane Smith',
    count: 2100,
  },
  {
    id: 3,
    title: 'Subscription Renewal',
    badge: 'Michael Johnson',
    count: 1300,
  },
  {
    id: 4,
    title: 'Payment for Services',
    badge: 'Lily Adams',
    count: 2500,
  },
  {
    id: 5,
    title: 'Subscription Renewal',
    badge: 'Sam Brown',
    count: 1400,
  },
];

const CardList = ({ title, endpoint }: Props) => {
  const list =
    title === 'Popular content' ? popularContent : latestTransactions;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then(setData);
  }, [endpoint]);

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Card
            key={item.id}
            className="flex-row items-center justify-between gap-4 p-4"
          >
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <UserRound className="h-10 w-10" />
            </div>
            <CardContent className="p-0 flex-1">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Badge variant="secondary">{item.badge}</Badge>
            </CardContent>
            <CardFooter className="p-0">{item.count / 1000}K</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;
