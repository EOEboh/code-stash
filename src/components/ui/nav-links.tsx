"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./sidebar";
import { NavItemsType } from "@/app/lib/definitions";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const NavLinks = ({ item }: { item: NavItemsType }) => {
  const pathname = usePathname();

  return (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "bg-sky-100 text-blue-600": pathname === item.url,
                  }
                )}
              >
                <a href={item.url}>{item.title}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavLinks;
