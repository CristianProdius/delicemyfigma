// src/modules/blog/components/blog-comments.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Reply, 
  MoreVertical,

  ChevronDown,
  ChevronUp,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

interface BlogCommentsProps {
  postId: string;
  className?: string;
}

export const BlogComments = ({ className }: BlogCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "/img/bg.jpg"
      },
      content: "This article beautifully captures the essence of artisanal chocolate making. I've always been fascinated by the bean-to-bar process, and your detailed explanation makes me appreciate my favorite chocolates even more!",
      timestamp: "2 hours ago",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Michael Chen",
            avatar: "/img/bg.jpg"
          },
          content: "Couldn't agree more! The section about temperature control during tempering was particularly enlightening.",
          timestamp: "1 hour ago",
          likes: 5,
          isLiked: true
        }
      ]
    },
    {
      id: "2",
      author: {
        name: "Emma Wilson",
        avatar: "/img/bg.jpg"
      },
      content: "I visited a chocolate factory in Belgium last year, and this article brings back wonderful memories. The attention to detail in every step is what makes artisanal chocolate so special.",
      timestamp: "4 hours ago",
      likes: 8,
      isLiked: false
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: undefined
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: {
        name: "You",
        avatar: undefined
      },
      content: replyText,
      timestamp: "Just now",
      likes: 0,
      isLiked: false
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyText("");
    setReplyingTo(null);
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      // Check replies
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked
              };
            }
            return reply;
          })
        };
      }
      return comment;
    }));
  };

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-4",
        isReply && "ml-12 mt-4"
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {comment.author.avatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={comment.author.avatar}
              alt={comment.author.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-[#A67B5B] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-[#451C15] [font-family:var(--font-inter)]">
              {comment.author.name}
            </h4>
            <p className="text-xs text-[#451C15]/50 [font-family:var(--font-inter)]">
              {comment.timestamp}
            </p>
          </div>
          
          {/* Options Menu */}
          <button className="p-1 rounded-full hover:bg-[#451C15]/5 transition-colors">
            <MoreVertical className="w-4 h-4 text-[#451C15]/50" />
          </button>
        </div>

        {/* Comment Text */}
        <p className="text-[#451C15]/70 [font-family:var(--font-inter)] leading-relaxed">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => handleLike(comment.id)}
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors",
              comment.isLiked 
                ? "text-red-500" 
                : "text-[#451C15]/50 hover:text-red-500"
            )}
          >
            <Heart 
              className={cn(
                "w-4 h-4",
                comment.isLiked && "fill-current"
              )} 
            />
            <span>{comment.likes}</span>
          </button>

          {!isReply && (
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="flex items-center gap-1.5 text-sm text-[#451C15]/50 hover:text-[#451C15] transition-colors"
            >
              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </button>
          )}

          {/* Show replies toggle */}
          {!isReply && comment.replies && comment.replies.length > 0 && (
            <button
              onClick={() => toggleReplies(comment.id)}
              className="flex items-center gap-1.5 text-sm text-[#D4A574] hover:text-[#D4A574]/80 transition-colors font-medium"
            >
              {expandedReplies.has(comment.id) ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  View {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                </>
              )}
            </button>
          )}
        </div>

        {/* Reply Form */}
        <AnimatePresence>
          {replyingTo === comment.id && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReply(comment.id);
              }}
              className="mt-4 flex gap-2"
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-4 py-2 bg-[#FFF9F5] rounded-full text-sm text-[#451C15] placeholder-[#451C15]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A574]/50 [font-family:var(--font-inter)]"
                autoFocus
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-full bg-[#451C15] hover:bg-[#5A241C] text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="rounded-full"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText("");
                }}
              >
                Cancel
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Replies */}
        <AnimatePresence>
          {!isReply && comment.replies && expandedReplies.has(comment.id) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 mt-4"
            >
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-[#D4A574]" />
          <h3 className="text-2xl font-light text-[#451C15] [font-family:var(--font-playfair)]">
            Comments ({comments.length})
          </h3>
        </div>
        
        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "newest" | "popular")}
          className="px-4 py-2 bg-white border border-[#451C15]/10 rounded-lg text-sm text-[#451C15] focus:outline-none focus:ring-2 focus:ring-[#D4A574]/50 [font-family:var(--font-inter)]"
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Comment Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmitComment}
        className="p-6 bg-gradient-to-br from-[#FFF9F5] to-white rounded-2xl border border-[#D4A574]/20"
      >
        <label className="block text-sm font-medium text-[#451C15] mb-3 [font-family:var(--font-inter)]">
          Join the conversation
        </label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this article..."
          rows={4}
          className="w-full px-4 py-3 bg-white rounded-xl text-[#451C15] placeholder-[#451C15]/40 resize-none focus:outline-none focus:ring-2 focus:ring-[#D4A574]/50 [font-family:var(--font-inter)]"
        />
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-[#451C15]/50 [font-family:var(--font-inter)]">
            Please be respectful and constructive in your comments.
          </p>
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#D4A574] to-[#A67B5B] text-white hover:shadow-lg transition-all duration-300"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Comment
          </Button>
        </div>
      </motion.form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="pb-6 border-b border-[#451C15]/10 last:border-0">
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>

      {/* Load More */}
      {comments.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Button
            variant="outline"
            className="border-[#451C15]/20 text-[#451C15] hover:bg-[#451C15]/5"
          >
            Load More Comments
          </Button>
        </motion.div>
      )}
    </div>
  );
};