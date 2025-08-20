import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, TrendingUp, ArrowLeft, Send, ThumbsUp, Share2, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

export function Community() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  if (!user) {
    return <div>Please log in to access the community.</div>;
  }

  const communityPosts = [
    {
      id: 1,
      author: 'Sarah M.',
      avatar: '👩‍💼',
      time: '2 hours ago',
      content: 'Just completed my first week of adaptive yoga! The chair modifications made it possible for me to participate fully. Feeling stronger already! 💪',
      likes: 12,
      comments: 5,
      tags: ['yoga', 'adaptive-exercise', 'milestone'],
      category: 'fitness'
    },
    {
      id: 2,
      author: 'Alex R.',
      avatar: '🧑‍🎨',
      time: '4 hours ago',
      content: 'The mood tracking feature helped me realize my energy dips every Tuesday. Turns out it was related to my medication schedule. Small insights, big impact! 📊',
      likes: 18,
      comments: 8,
      tags: ['mood-tracking', 'insights', 'patterns'],
      category: 'mental-health'
    },
    {
      id: 3,
      author: 'Marcus T.',
      avatar: '👨‍🦽',
      time: '6 hours ago',
      content: 'Tried the new breathing exercise today during a pain flare-up. It actually helped me manage the anxiety that comes with chronic pain. Thank you for this tool! 🙏',
      likes: 25,
      comments: 12,
      tags: ['chronic-pain', 'breathing', 'anxiety'],
      category: 'wellness'
    },
    {
      id: 4,
      author: 'Jamie L.',
      avatar: '👩‍🔬',
      time: '1 day ago',
      content: 'Hit my 30-day streak today! The personalized meal plans have been a game-changer for my depression recovery. Eating well = feeling well. 🥗✨',
      likes: 31,
      comments: 15,
      tags: ['nutrition', 'depression', 'milestone'],
      category: 'nutrition'
    }
  ];

  const filters = [
    { value: 'all', label: 'All Posts', count: communityPosts.length },
    { value: 'fitness', label: 'Fitness', count: 1 },
    { value: 'mental-health', label: 'Mental Health', count: 1 },
    { value: 'nutrition', label: 'Nutrition', count: 1 },
    { value: 'wellness', label: 'Wellness', count: 1 }
  ];

  const filteredPosts = selectedFilter === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.category === selectedFilter);

  const handleNewPost = () => {
    if (newPost.trim()) {
      // In a real app, this would save to a database
      alert('Post shared with the community! 🎉');
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Users className="w-8 h-8 text-accent-600 mr-3" />
            Community
          </h1>
          <p className="text-gray-600">
            Connect with others, share experiences, and support each other.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">2,847</p>
            <p className="text-sm text-gray-600">Active Members</p>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">Posts This Week</p>
          </Card>
          <Card className="text-center bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">1,203</p>
            <p className="text-sm text-gray-600">Support Given</p>
          </Card>
        </motion.div>

        {/* New Post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            {!showNewPost ? (
              <button
                onClick={() => setShowNewPost(true)}
                className="w-full text-left p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <span className="text-gray-500">Share your wellness journey with the community...</span>
                </div>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your progress, ask for advice, or celebrate a win..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
                  rows={4}
                />
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewPost} className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-xl">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">{post.author}</span>
                      <span className="text-gray-500 text-sm">{post.time}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Community Guidelines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Be respectful and supportive of all community members</li>
              <li>• Share your experiences to help others on their journey</li>
              <li>• Keep posts relevant to wellness, fitness, and mental health</li>
              <li>• Celebrate wins, both big and small</li>
              <li>• Ask questions and offer encouragement</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}