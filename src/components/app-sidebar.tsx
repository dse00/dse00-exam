'use client';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'DSE00',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Users',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'List',
          url: '/admin/user',
        },
        {
          title: 'Payment',
          url: '/admin/user/payment',
        },
        {
          title: 'Subscription',
          url: '/admin/user/subscription',
        },
      ],
    },
    {
      title: 'Questions',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'List',
          url: '/admin/questions/list',
        },
        {
          title: 'Answer',
          url: '/admin/questions/answers',
        },
        {
          title: 'Exercise',
          url: '#',
        },
        {
          title: 'Discussion',
          url: '/admin/questions/discussion',
        },
      ],
    },
    {
      title: 'Message',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'List',
          url: '/admin/message',
        },
        {
          title: 'Send Message',
          url: '/admin/message/send',
        },
      ],
    },
    {
      title: 'Ranking',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'All',
          url: '/admin/ranking',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '/admin/settings',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'DSE Exam',
      url: '/',
      icon: Frame,
    },
    {
      name: 'DSE00',
      url: 'https://dse00.com',
      icon: PieChart,
    },
    {
      name: 'Tutor CMS',
      url: 'https://admin.dse00.com',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
