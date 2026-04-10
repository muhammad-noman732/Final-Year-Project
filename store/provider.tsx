"use client"
import { Provider } from "react-redux"
import { store } from "./index"
import "@/bones/registry"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
