import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Edit } from "lucide-react";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    bio?: string;
    posts_count: number;
  };
  isCurrentUser?: boolean;
  onEdit?: () => void;
}

export const UserProfile = ({ user, isCurrentUser, onEdit }: UserProfileProps) => {
  return (
    <Card className="shadow-elegant bg-gradient-card">
      <CardHeader className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{user.email}</span>
            </div>
          </div>
          
          {isCurrentUser && (
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {user.bio && (
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {user.bio}
            </p>
          </div>
        )}
        
        <div className="flex justify-center pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{user.posts_count}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};