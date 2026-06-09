import React, { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { BLOGS } from "../data";
import { BlogPost } from "../types";

export default function BlogView() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 pb-16">
      
      {!selectedPost ? (
        <>
          {/* List state */}
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-extrabold text-[#FF724E] tracking-widest bg-orange-50 px-3 py-1 rounded-full">Educational news</span>
            <h1 className="text-3xl font-extrabold text-gray-900">The Peekaboo Prairie Blog</h1>
            <p className="text-gray-500 text-xs">Expert guidance covering Saskatchewan childcare grants, nutrition, and early play techniques.</p>
          </div>

          <div className="space-y-6">
            {BLOGS.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-3xl p-6.5 md:p-8 border border-orange-50/20 shadow-xs hover:border-[#FF724E] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span className="px-2.5 py-0.5 bg-orange-50 text-[#FF724E] rounded-md">{post.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-base group-hover:text-[#FF724E] transition-colors">{post.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal">{post.excerpt}</p>
                </div>
                
                <button
                  onClick={() => setSelectedPost(post)}
                  className="bg-orange-50 group-hover:bg-[#FF724E] text-[#FF724E] group-hover:text-white px-4.5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  Read &rarr;
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Detailed state */
        <div className="space-y-8 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-orange-50/20 animate-fade-in text-gray-700">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs text-gray-550 hover:text-gray-900 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog list
          </button>

          <div className="space-y-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3.5 text-[10px] font-bold text-gray-400 uppercase">
              <span className="px-2.5 py-0.5 bg-orange-50 text-[#FF724E] rounded-md">{selectedPost.category}</span>
              <span>{selectedPost.date}</span>
              <span>{selectedPost.readTime}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          <p className="text-xs text-gray-400 italic font-medium">By Peekaboo Corner Pediatric Consultancy Team, Regina, SK</p>

          <div className="text-xs md:text-sm text-gray-650 leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {selectedPost.content}
          </div>

          <div className="border-t border-gray-100 pt-6 flex justify-between items-center text-xs">
            <span className="text-gray-400">Published June 2026 &copy; Peekaboo Regina</span>
            <button
              onClick={() => setSelectedPost(null)}
              className="text-[#59C7F5] hover:text-[#FF724E] font-bold underline"
            >
              Finish reading &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
