"use client";

const NODES = [
  { label: "Student pays", color: "#d4a843", delay: "0s" },
  { label: "Stripe verifies", color: "#2563eb", delay: "0.6s" },
  { label: "Receipt issued", color: "#059669", delay: "1.2s" },
  { label: "Live dashboard", color: "#d4a843", delay: "1.8s" },
];

export default function FlowDiagram() {
  return (
    <div className="w-full mt-6 mb-1 px-2">
      <div className="flex items-center justify-between">
        {NODES.map((node, i) => (
          <div key={node.label} className="flex items-center flex-1 min-w-0">
            {}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-shrink-0">
              <div
                className="animate-flow-node w-9 h-9 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: `${node.color}40`,
                  backgroundColor: `${node.color}10`,
                  animationDelay: node.delay,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
              </div>
              <span className="text-[10px] text-[#8a8a8a] font-medium text-center leading-tight w-[70px]">
                {node.label}
              </span>
            </div>

            {}
            {i < NODES.length - 1 && (
              <div className="flex-1 mx-2 mb-4 flow-connector" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
