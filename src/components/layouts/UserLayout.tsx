import Header from "@/app/_components/Header"
import { LayoutProps } from "./DefaultLayout"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"


export default ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col items-center">
            <Header />
      <div>
        
      </div>
        </div>
    )
}