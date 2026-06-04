# Marketing Lab Desktop

## Project Context

This is a customized Terax AI desktop client for a **marketing research lab**.
The user connects to a remote Azure VM via SSH to access AI agent crews,
a knowledge vault, and a happy terminal environment.

## Workspace Structure (Remote VM)

- `~/vault/` — Knowledge vault organized with PARA method
  - `00-Inbox/` — Raw inputs, ideas, bookmarks
  - `01-Clients/` — Client-specific research
  - `02-Research/` — Deep research notes
  - `03-Marketing/` — Campaigns, content, analytics
  - `04-Templates/` — Reusable templates
  - `05-Daily-Notes/` — Daily standups, reflections
  - `99-Archive/` — Completed projects
- `~/crews/` — CrewAI agent crews
  - `market-research/` — Researcher → Analyst → Synthesizer
  - `content-creation/` — Strategist → Writer → Editor
  - `competitor-intel/` — Scout → Analyzer → Reporter
- `~/tools/` — Custom scripts
  - `run-crew.sh` — Run any crew with topic
  - `vault-graph.py` — Generate knowledge graph visualization

## Key Commands

| Alias | What it does |
|-------|-------------|
| `files` | Open Yazi file manager |
| `where <dir>` | Jump to directory (zoxide) |
| `preview <file>` | Preview file with syntax highlighting |
| `help <command>` | Simple help (tldr) |
| `system` | System monitor (btop) |
| `my-vault` | Open vault root in Yazi |
| `inbox` / `clients` / `research` / `marketing` | Jump to vault section |
| `run-crew <type> <topic>` | Run AI agent crew |
| `vault-graph` | Generate knowledge graph HTML |

## AI Behavior

When the user asks about **research**, **content**, or **competitors**,
suggest running the appropriate crew via the "Run Crew" button in the status bar.

When the user asks about their vault, use filesystem tools to explore `~/vault/`.

The remote VM runs Ubuntu 22.04 with fish shell, starship prompt, and CrewAI.
