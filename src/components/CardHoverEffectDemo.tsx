// CardHoverEffectDemo.tsx
import { HoverEffect } from "./ui/card-hover-effect";

interface Project {
  title: string;
  description: string;
  link: string;
}

interface CardHoverEffectDemoProps {
  projects: Project[];
}

export function CardHoverEffectDemo({ projects }: CardHoverEffectDemoProps) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
