import {
  MessageSquare,
  Sparkles,
  Sailboat,
  ScanLine,
  Code2,
  Clapperboard,
  AudioLines,
  Notebook,
  GitBranch,
  Flame,
  Image,
  Palette,
  Film,
  Video,
  Music2,
  Headphones,
  PenLine,
  Feather,
  Pencil,
  BookOpen,
  Microscope,
  Bot,
  PanelsTopLeft,
  Shapes,
} from "lucide-react";
const Icons = {
  MessageSquare,
  Sparkles,
  Sailboat,
  ScanLine,
  Code2,
  Clapperboard,
  AudioLines,
  Notebook,
  GitBranch,
  Flame,
  Image,
  Palette,
  Film,
  Video,
  Music2,
  Headphones,
  PenLine,
  Feather,
  Pencil,
  BookOpen,
  Microscope,
  Bot,
  PanelsTopLeft,
  Shapes,
};
export default function ToolLogo({ tool, large = false }) {
  const Icon = Icons[tool.icon] || Icons.Sparkles;
  return (
    <span
      className={`tool-logo ${large ? "large" : ""}`}
      style={{ "--tool-color": tool.color }}
    >
      <Icon size={large ? 32 : 23} strokeWidth={1.6} />
    </span>
  );
}
