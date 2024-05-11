import { atom, useAtom } from "jotai"

import { BlogPost, initMockBlogPosts } from "./data"

type Config = {
  selected: BlogPost["id"] | null
}

const configAtom = atom<Config>({
  selected: initMockBlogPosts[0].id,
})

export function useSelectedBlog() {
  return useAtom(configAtom)
}

