import * as React from "react";
import { SearchForm } from "@/components/ui/search-form";
import { VersionSwitcher } from "@/components/ui/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { SessionType } from "@/app/lib/definitions";
import { LogOut } from "lucide-react";
import { doOAuthLogout } from "@/app/lib/actions";
import NavLinks from "./nav-links";

const navData = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Main",
      url: "#",
      items: [
        {
          title: "All Snippets",
          url: "/snippets",
          isActive: false,
        },
        {
          title: "Favorites",
          url: "#",
          isActive: false,
        },
        {
          title: "Trash",
          url: "#",
          isActive: false,
        },
      ],
    },
    {
      title: "Workflow",
      url: "#",
      items: [
        {
          title: "Data Fetching",
          url: "#",
          isActive: false,
        },
        {
          title: "Rendering",
          url: "#",
          isActive: false,
        },
      ],
    },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  console.log("session", session);

  const { user } = (session as SessionType) ?? {};
  console.log("user", user);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={navData.versions}
          defaultVersion={navData.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navData.navMain.map((item, index) => (
          <NavLinks key={index} item={item} />
        ))}

        <SidebarGroup>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
            <h1>{user?.name}</h1>
          </div>

          <SidebarGroup>
            {/* <LogOut aria-label="Log Out" /> */}
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <form action={doOAuthLogout}>
                      <button className="flex gap-2" type="submit">
                        <LogOut />
                        <span>Log out</span>
                      </button>
                    </form>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SidebarGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
