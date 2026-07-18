"use client";

import {
  NodeTypeOptionIcon,
  triggerNodes,
  executionNodes,
  useNodeSelect,
} from "@/components/node-selector";
import { Separator } from "@/components/ui/separator";

export const NodeQuickAddList = () => {
  const handleNodeSelect = useNodeSelect();

  return (
    <div className="min-w-md max-w-[calc(100vw-2rem)] rounded-xl flex items-center justify-between border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 justify-between items-stretch overflow-hidden">
        {triggerNodes.map((node) => (
          <button
            key={node.type}
            type="button"
            className="group flex min-w-0 flex-1 w-18 flex-col items-center justify-center gap-1  px-1.5 text-center last:border-r-0 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => handleNodeSelect(node)}
          >
            <NodeTypeOptionIcon node={node} />
            <span className="w-full truncate text-[10px] font-medium leading-none text-muted-foreground group-hover:text-foreground">
              {node.label}
            </span>
          </button>
        ))}
      </div>
      {/* <Separator orientation="vertical" className="bg-red-500 h-full" /> */}
      <div className="flex h-16 items-stretch overflow-hidden justify-between">
        {executionNodes.map((node) => (
          <button
            key={node.type}
            type="button"
            className="group flex w-18 min-w-0 flex-1 flex-col items-center justify-center gap-1  px-1.5 text-center last:border-r-0 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => handleNodeSelect(node)}
          >
            <NodeTypeOptionIcon node={node} />
            <span className="w-full truncate text-[10px] font-medium leading-none text-muted-foreground group-hover:text-foreground">
              {node.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
