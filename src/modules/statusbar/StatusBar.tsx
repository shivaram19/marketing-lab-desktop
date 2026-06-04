import { useChatStore } from "@/modules/ai";
import { AgentStatusPill } from "@/modules/ai/components/AgentStatusPill";
import {
  AiOpenButton,
  AiStatusBarControls,
} from "@/modules/ai/components/AiStatusBarControls";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IncognitoIcon, BotIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CwdBreadcrumb } from "./CwdBreadcrumb";
import { WorkspaceEnvSelector } from "./WorkspaceEnvSelector";
import { CrewRunDialog } from "./CrewRunDialog";
import type { WorkspaceEnv } from "@/modules/workspace";
import { useState } from "react";

type Props = {
  cwd: string | null;
  filePath?: string | null;
  home: string | null;
  workspace: WorkspaceEnv;
  onCd: (path: string) => void;
  onWorkspaceChange: (env: WorkspaceEnv) => void;
  onOpenMini: () => void;
  /** Only rendered when the AI panel is open and a key is loaded. */
  hasComposer: boolean;
  privateActive: boolean;
};

export function StatusBar({
  cwd,
  filePath,
  home,
  workspace,
  onCd,
  onWorkspaceChange,
  onOpenMini,
  hasComposer,
  privateActive,
}: Props) {
  const panelOpen = useChatStore((s) => s.panelOpen);
  const openPanel = useChatStore((s) => s.openPanel);
  const [crewDialogOpen, setCrewDialogOpen] = useState(false);

  return (
    <footer className="flex h-8 shrink-0 items-center justify-between gap-3 border-t border-border/60 bg-card/60 px-3 text-[11px]">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <WorkspaceEnvSelector onSelect={onWorkspaceChange} />
        <CwdBreadcrumb
          cwd={cwd}
          filePath={filePath}
          home={home}
          workspace={workspace}
          onCd={onCd}
        />
        {privateActive ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex shrink-0 cursor-default items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10.5px] font-medium text-amber-700 dark:text-amber-400">
                <HugeiconsIcon icon={IncognitoIcon} size={11} strokeWidth={2} />
                <span>Private: hidden from AI</span>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-64 text-[11px] leading-relaxed">
              AI can't see this terminal's output. Use it for secrets, SSH, or
              anything you don't want sent to the model.
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {workspace.kind === "ssh" && (
          <button
            type="button"
            onClick={() => setCrewDialogOpen(true)}
            className="flex h-6 items-center gap-1 rounded-sm px-1.5 text-[11px] text-emerald-600 outline-none hover:bg-accent hover:text-emerald-700 focus:outline-none"
            title="Run AI Crew"
          >
            <HugeiconsIcon icon={BotIcon} size={13} strokeWidth={1.75} />
            Run Crew
          </button>
        )}
        <AgentStatusPill onClick={onOpenMini} />
        {panelOpen && hasComposer ? (
          <AiStatusBarControls />
        ) : (
          <AiOpenButton onOpen={openPanel} />
        )}
      </div>
      <CrewRunDialog
        open={crewDialogOpen}
        onClose={() => setCrewDialogOpen(false)}
        workspace={workspace}
      />
    </footer>
  );
}
