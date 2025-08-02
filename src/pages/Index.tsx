import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { AuthForm } from "@/components/auth/AuthForm";
import { PostFeed } from "@/components/posts/PostFeed";
import { UserProfile } from "@/components/users/UserProfile";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    bio: "Software developer passionate about building great user experiences. Love to share knowledge and connect with fellow developers.",
    posts_count: 3
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane@example.com",
    bio: "Product manager with 5+ years of experience. Always excited about innovative solutions and team collaboration.",
    posts_count: 2
  }
];

const mockPosts = [
  {
    id: "1",
    content: "Just shipped a new feature for our platform! The feeling of seeing users actually use what you've built is incredible. What's the most rewarding project you've worked on recently?",
    author: mockUsers[0],
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    likes_count: 5,
    comments_count: 2,
    user_has_liked: false
  },
  {
    id: "2",
    content: "Had an amazing brainstorming session with the team today. Sometimes the best ideas come from the most unexpected conversations. Collaboration really is key to innovation!",
    author: mockUsers[1],
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    likes_count: 8,
    comments_count: 4,
    user_has_liked: true
  },
  {
    id: "3",
    content: "Learning React hooks has been a game-changer for my development workflow. The way you can manage state and side effects is so elegant. Any other React developers here?",
    author: mockUsers[0],
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    likes_count: 12,
    comments_count: 7,
    user_has_liked: false
  }
];

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [posts, setPosts] = useState(mockPosts);
  const [currentView, setCurrentView] = useState<"feed" | "profile">("feed");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = async (formData: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (authMode === "register") {
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          bio: formData.bio,
          posts_count: 0
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        toast({
          title: "Account created successfully!",
          description: "Welcome to ConnectHub!"
        });
      } else {
        // For demo, login with mock user
        const loginUser = mockUsers.find(u => u.email === formData.email) || mockUsers[0];
        setUser(loginUser);
        localStorage.setItem("user", JSON.stringify(loginUser));
        toast({
          title: "Welcome back!",
          description: "You've been logged in successfully."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCurrentView("feed");
    toast({
      title: "Logged out",
      description: "You've been logged out successfully."
    });
  };

  const handleCreatePost = async (content: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPost = {
        id: Date.now().toString(),
        content,
        author: user,
        created_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        user_has_liked: false
      };
      
      setPosts(prev => [newPost, ...prev]);
      toast({
        title: "Post created!",
        description: "Your post has been shared with the community."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          user_has_liked: !post.user_has_liked,
          likes_count: post.user_has_liked ? post.likes_count - 1 : post.likes_count + 1
        };
      }
      return post;
    }));
  };

  const handleProfileClick = (userId: string) => {
    if (userId === user?.id) {
      setCurrentView("profile");
    }
  };

  // Show auth form if not logged in
  if (!user) {
    return (
      <AuthForm
        mode={authMode}
        onSubmit={handleAuth}
        onModeChange={setAuthMode}
        loading={loading}
      />
    );
  }

  return (
    <Layout
      user={user}
      onLogout={handleLogout}
      onSearch={(query) => console.log("Search:", query)}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with user profile */}
        <div className="lg:w-80">
          <UserProfile
            user={user}
            isCurrentUser={true}
            onEdit={() => toast({ title: "Edit profile feature coming soon!" })}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <PostFeed
            posts={posts}
            currentUserId={user.id}
            onCreatePost={handleCreatePost}
            onLike={handleLike}
            onEdit={(postId) => toast({ title: "Edit post feature coming soon!" })}
            onDelete={(postId) => toast({ title: "Delete post feature coming soon!" })}
            onComment={(postId) => toast({ title: "Comments feature coming soon!" })}
            onProfileClick={handleProfileClick}
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
