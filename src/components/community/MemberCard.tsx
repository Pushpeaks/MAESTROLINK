import { Member } from "./CommunityMembers";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";

const MemberCard = ({ member }: { member: Member }) => {
  const initials = member.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <div className="bg-background/50 border border-border/40 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 bg-muted flex items-center justify-center text-foreground rounded-lg">{initials}</Avatar>
        <div className="flex-1">
          <div className="font-medium text-foreground">{member.name}</div>
          <div className="text-sm text-muted-foreground">{member.instrument} • {member.location}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{member.bio}</p>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href={`mailto:${member.name.replace(/\s+/g, ".").toLowerCase()}@example.com`}>
            <Mail className="w-4 h-4 mr-2" /> Message
          </a>
        </Button>
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" /> View
        </Button>
      </div>
    </div>
  );
};

export default MemberCard;
