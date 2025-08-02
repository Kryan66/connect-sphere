import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenTool } from "lucide-react";

interface CreatePostProps {
  onSubmit: (content: string) => void;
  loading?: boolean;
}

export const CreatePost = ({ onSubmit, loading }: CreatePostProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  return (
    <Card className="shadow-card bg-gradient-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <PenTool className="h-5 w-5 text-primary" />
          <span>What's on your mind?</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts with the community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!content.trim() || loading}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {loading ? "Posting..." : "Share Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};