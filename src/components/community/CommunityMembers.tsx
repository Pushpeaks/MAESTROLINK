import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MemberCard from "./MemberCard";

export type Member = {
  id: string;
  name: string;
  instrument: string;
  location?: string;
  bio?: string;
};

const sampleMembers: Member[] = [
  { id: "1", name: "Ava Johnson", instrument: "Guitar", location: "Austin, TX", bio: "Indie singer-songwriter" },
  { id: "2", name: "Liam Chen", instrument: "Drums", location: "Seattle, WA", bio: "Session drummer" },
  { id: "3", name: "Maya Patel", instrument: "Violin", location: "New York, NY", bio: "Orchestral and folk" },
  { id: "4", name: "Noah Williams", instrument: "Bass", location: "Nashville, TN", bio: "Funk and R&B" },
  { id: "5", name: "Olivia Brown", instrument: "Keys", location: "Los Angeles, CA", bio: "Producer and songwriter" },
];

const CommunityMembers = () => {
  const [query, setQuery] = useState("");
  const [instrumentFilter, setInstrumentFilter] = useState("");

  const instruments = useMemo(() => {
    const set = new Set(sampleMembers.map((m) => m.instrument));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return sampleMembers.filter((m) => {
      const matchQuery = query.trim() === "" || m.name.toLowerCase().includes(query.toLowerCase());
      const matchInstrument = instrumentFilter === "" || m.instrument === instrumentFilter;
      return matchQuery && matchInstrument;
    });
  }, [query, instrumentFilter]);

  return (
    <div className="bg-card/60 glass-card p-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-4">
        <div className="flex-1 md:pr-4">
          <Input
            placeholder="Search musicians by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={instrumentFilter}
            onChange={(e) => setInstrumentFilter(e.target.value)}
          >
            <option value="">All instruments</option>
            {instruments.map((ins) => (
              <option key={ins} value={ins}>{ins}</option>
            ))}
          </select>
          <Button variant="ghost" onClick={() => { setQuery(""); setInstrumentFilter(""); }}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="hero" onClick={() => alert("Feature coming soon: Invite & create groups")}>Create a Group</Button>
      </div>
    </div>
  );
};

export default CommunityMembers;
