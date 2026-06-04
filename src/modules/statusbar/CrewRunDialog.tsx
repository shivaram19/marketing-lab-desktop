import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { WorkspaceEnv } from "@/modules/workspace";

type Props = {
  open: boolean;
  onClose: () => void;
  workspace: WorkspaceEnv;
};

export function CrewRunDialog({ open, onClose, workspace }: Props) {
  const [topic, setTopic] = useState("");
  const [crewType, setCrewType] = useState<"research" | "content" | "competitor">("research");
  const [running, setRunning] = useState(false);

  const runCrew = async () => {
    if (workspace?.kind !== "ssh") return;
    setRunning(true);
    try {
      const result = await invoke("ssh_run_crew", {
        workspace,
        crewType,
        topic,
      });
      console.log("Crew result:", result);
    } finally {
      setRunning(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>🤖 Run AI Crew</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Crew Type</label>
            <select
              value={crewType}
              onChange={(e) => setCrewType(e.target.value as typeof crewType)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="research">Market Research</option>
              <option value="content">Content Creation</option>
              <option value="competitor">Competitor Intel</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Topic</label>
            <Input
              placeholder="e.g., AI marketing trends 2025"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={running}>
            Cancel
          </Button>
          <Button onClick={runCrew} disabled={running || !topic.trim()}>
            {running ? "Running..." : "Run Crew"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
