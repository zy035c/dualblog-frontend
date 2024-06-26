"use client"

import * as React from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"

import { cn } from "src/lib/utils"
import { Input } from "src/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "src/components/ui/resizable"
import { Separator } from "src/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs"
import { TooltipProvider } from "src/components/ui/tooltip"
import { AccountSwitcher } from "./account-switcher"
import { BlogPostDisplay } from "./blog-display"
import { ResultList } from "./search-list"
import { Nav } from "./nav"
import { type BlogPost } from "../data"
import { useSelectedBlog } from "../use-selected-blog"

import "./search-panel.css"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { Label } from "src/components/ui/label"
import { searchBlogsForKeyword } from "src/apis/api_blog"

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  blogPosts: BlogPost[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function SearchPanel({
  accounts,
  blogPosts,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [selectedBlog, setSelectedBlog] = useSelectedBlog()

  const [blogPostList, setSearchResultList] = React.useState<BlogPost[]>([]);

  const [keyword, setKeyword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为
    if (keyword === '') {
      setEmptySearchPopOpen(true);
      console.log('triggered empty search pop over')
      return;
    }
    console.log('正在搜索：', keyword);

    const resp = await searchBlogsForKeyword(keyword);
    if (resp.status === "success") {
      console.log("[search-panel] success result", resp);
      const searchResult: BlogPost[] = resp.data.result.map(item => {
        return {
          id: item.id || "",
          author: item.author || "",
          email: item.email || "",
          title: item.title || "",
          content: item.content || "",
          time: item.time || "",
          read: item.read || false,
          labels: item.labels || [],
        };
      })

      console.log(`[search-panel] presents ${searchResult.length} good results.`)
      setSearchResultList(searchResult);
    }
  };
  const [emptySearchPopOpen, setEmptySearchPopOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          // onCollapse={(collapsed) => {
          //   setIsCollapsed(collapsed)
          //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          //     collapsed
          //   )}`
          // }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Sent",
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Junk",
                label: "23",
                icon: ArchiveX,
                variant: "ghost",
              },
              {
                title: "Trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2 h-16">
              <h1 className="text-xl search-title text-gumi-white">搜索</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  检索
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  高级
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="p-4 backdrop-blur bg-opacity-0">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Popover open={emptySearchPopOpen} onOpenChange={setEmptySearchPopOpen}>
                    <PopoverContent
                      className="absolute empty-search-popover bg-theme-color-2 p-3"
                      onClick={() => setEmptySearchPopOpen(false)}
                    >
                      不要随便用空搜索喵，会加重服务器负担的喵～
                    </PopoverContent>
                  </Popover>
                  <Input
                    placeholder="我不是英雄，只是个拿锤子的约德尔人。"
                    className="pl-8"
                    onChange={(e) => { setKeyword(e.target.value) }}
                  />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <ResultList items={blogPostList} />
            </TabsContent>
            {/* <TabsContent value="unread" className="m-0">
              <MailList items={searchResultList.filter((item) => !item.read)} />
            </TabsContent> */}
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <BlogPostDisplay
            mail={blogPostList.find((item) => item.id === selectedBlog.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
