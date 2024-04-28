// import { Metadata } from "next"
// import Image from "next/image"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "src/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "src/components/ui/hover-card"
import { Label } from "src/components/ui/label"
import { Separator } from "src/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs"
import { Textarea } from "src/components/ui/textarea"

import { CodeViewer } from "./components/code-viewer"
import { MaxLengthSelector } from "./components/maxlength-selector"
import { ModelSelector } from "./components/model-selector"
import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { FontSizeSelector } from "./components/fontsize-selector"
import { TopPSelector } from "./components/top-p-selector"
import { models, types } from "./data/models"
import { presets } from "./data/presets"

import * as React from 'react';
import { Input } from "src/components/ui/input"

import "./editor.css";
import { motion } from "framer-motion";
import ModelSelectTab from "./form"
import { toast } from "src/components/ui/use-toast"
import { empty_blog_warning, post_blog_text } from "src/texts/blog_text"
import { postNewBlog } from "src/apis/api_blog"
import { useNavigate } from "react-router-dom"


export const metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default function BlogEditor() {

  const [fontSize, setFontSize] = React.useState([18]);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);
  const nav = useNavigate();

  const handleSubmit = async () => {
    let content = contentRef.current?.value;
    let title = titleRef.current?.value;

    if (!content) {
      toast({
        title: "标题可以为空：）但是不可以发布空内容哦。",
        description: empty_blog_warning(),
      });
      return;
    }

    const resp = await postNewBlog(title, content);
    if (resp.status === "success") {
      toast({
        title: "已发布",
        description: post_blog_text(true),
        duration: 1800,
      });
      nav("/posts");
    } else {
      toast({
        title: "似乎因为某种原因发布失败了...",
        description: resp.data.msg + post_blog_text(false),
        duration: 2300,
      });
    }
  }

  const handleClear = async () => {
    contentRef.current.value = "";
    titleRef.current.value = "";
  }

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <Button
            variant='outline'
            className="flex h-[48px] rounded-[10px] w-auto opacity-85 border-[3px] bg-theme-color-1 md:text-sm lg:text-lg"
            onClick={handleSubmit}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='header-menu-option-text pb-[1px] text-white px-2 text-[17px]'>
              发布
            </motion.div>
          </Button>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <ModelSelectTab />
                <ModelSelector types={types} models={models} />
                <FontSizeSelector
                  setFontSize={setFontSize}
                  fontSize={fontSize}
                />
                <MaxLengthSelector defaultValue={[256]} />
                <TopPSelector defaultValue={[0.9]} />
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Input
                      className="blog-title-input h-12"
                      ref={titleRef}
                      placeholder="今天也要来点兔子吗？"
                    />
                    <Textarea
                      placeholder="生活多美好，学习使我快乐。社会真精彩，让世界充满爱。"
                      className="blog-content-input min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[500px]"
                      style={{ fontSize: `${fontSize[0]}px` }}
                      ref={contentRef}
                    />
                    <div className="flex flex-row items-center space-x-2 w-auto">
                      <Button
                        variant='outline'
                        className="flex h-[48px] rounded-[10px] w-auto opacity-85 border-[3px] bg-gumi-red md:text-sm lg:text-lg"
                        onClick={handleClear}
                      >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='header-menu-option-text pb-[1px] text-white px-2 text-[17px]'>
                          清空
                        </motion.div>
                      </Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                {/* <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>发布</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent> */}
                {/* <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Input</Label>
                          <Textarea
                            id="input"
                            placeholder="We is going to the market."
                            className="flex-1 lg:min-h-[580px]"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea
                            id="instructions"
                            placeholder="Fix the grammar."
                          />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>发布</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent> */}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}