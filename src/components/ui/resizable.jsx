import React from 'react';
import { cn } from '@/lib/utils';
import * as ResizablePrimitive from 'react-resizable-panels';

const ResizablePanelGroup = ({
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = ({
  className,
  ...props
}) => (
  <ResizablePrimitive.Panel
    className={cn(
      "flex grow basis-0 overflow-auto",
      className
    )}
    {...props}
  />
);

const ResizableHandle = ({
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-1 items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-2.5 w-2.5"
      >
        <path d="M8 18 L12 22 L16 18"></path>
        <path d="M8 6 L12 2 L16 6"></path>
      </svg>
    </div>
  </ResizablePrimitive.PanelResizeHandle>
);

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
}; 