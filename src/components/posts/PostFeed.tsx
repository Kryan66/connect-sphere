import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { PenTool } from "lucide-react";

interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
  likes_count: number;
  comments_count: number;
  user_has_liked: boolean;
}

interface PostFeedProps {
  posts: Post[];
  currentUserId?: string;
  onCreatePost: (content: string) => void;
  onLike: (postId: string) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
  onComment: (postId: string) => void;
  onProfileClick: (userId: string) => void;
  loading?: boolean;
}

export const PostFeed = ({
  posts,
  currentUserId,
  onCreatePost,
  onLike,
  onEdit,
  onDelete,
  onComment,
  onProfileClick,
  loading
}: PostFeedProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onSubmit={onCreatePost} loading={loading} />
      
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <PenTool className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                Be the first to share something with the community!
              </p>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUserId}
              onLike={onLike}
              onEdit={onEdit}
              onDelete={onDelete}
              onComment={onComment}
              onProfileClick={onProfileClick}
            />
          ))
        )}
      </div>
    </div>
  );
};