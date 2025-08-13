'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@estia/components/ui/sidebar';
import { mobileLinks } from '@estia/helpers/links';
import { compareIgnoreCase } from '@estia/utils/general';
import { usePathname } from 'next/navigation';
import { EstiaLogo } from '@estia/assets';
import React from 'react';
import { CloseIcon } from '@estia/assets/icons/close';

export function MobileSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <div className='flex items-center justify-between py-4 pl-4'>
        <CloseIcon
          onClick={() => {
            toggleSidebar();
          }}
          className='size-10 rounded-full border-2 p-1'
        />
        <div className='text-primary-2 mr-4 size-10'>
          <EstiaLogo width='100%' height='100%' className='sm:block' />
        </div>
      </div>
      <SidebarContent className='pb-24'>
        {mobileLinks?.map((item, index) => (
          <div key={index}>
            <SidebarGroup>
              {item?.groupTitle ? (
                <SidebarGroupLabel>{item?.groupTitle}</SidebarGroupLabel>
              ) : null}
              <SidebarGroupContent>
                <SidebarMenu>
                  {item?.list?.map((groupItem) => (
                    <SidebarMenuItem key={groupItem.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={compareIgnoreCase(
                          pathname,
                          groupItem?.path,
                          ...(groupItem?.matches || [])
                        )}
                      >
                        <a href={groupItem.path}>
                          <span className='text-sm'>{groupItem.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {mobileLinks?.length - 1 != index ? <SidebarSeparator /> : null}
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
