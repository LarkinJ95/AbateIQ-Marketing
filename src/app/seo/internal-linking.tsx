import type { ReactNode } from "react";

const linkRules = [
  { phrase: "asbestos survey", href: "/asbestos-survey-software" },
  { phrase: "air monitoring", href: "/air-monitoring-software" },
  { phrase: "NEA", href: "/nea-reporting-software" },
  { phrase: "industrial hygiene", href: "/industrial-hygiene-software" },
  { phrase: "compliance software", href: "/environmental-compliance-software" },
];

export function autoLinkText(text: string): ReactNode[] {
  let nodes: ReactNode[] = [text];

  linkRules.forEach((rule) => {
    const nextNodes: ReactNode[] = [];

    nodes.forEach((node, index) => {
      if (typeof node !== "string") {
        nextNodes.push(node);
        return;
      }

      const regex = new RegExp(`\\b${rule.phrase}\\b`, "gi");
      let lastIndex = 0;
      let match: RegExpExecArray | null = regex.exec(node);
      while (match) {
        if (match.index > lastIndex) {
          nextNodes.push(node.slice(lastIndex, match.index));
        }
        nextNodes.push(
          <a
            key={`${rule.href}-${index}-${match.index}`}
            href={rule.href}
            className="text-[#2563eb] hover:underline"
          >
            {match[0]}
          </a>,
        );
        lastIndex = regex.lastIndex;
        match = regex.exec(node);
      }

      if (lastIndex < node.length) {
        nextNodes.push(node.slice(lastIndex));
      }
    });

    nodes = nextNodes;
  });

  return nodes;
}
