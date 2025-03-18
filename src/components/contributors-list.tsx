"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
};

export function ContributorsList() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch("https://api.github.com/repos/CandleMinecraft/Candle/contributors?per_page=41&anon=0");
        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }
        
        const data = await response.json();
        
        // Enhance with user details including display name
        const enhancedData = await Promise.all(
          data.slice(0, 40).map(async (contributor: any) => {
            try {
              const userResponse = await fetch(contributor.url);
              if (userResponse.ok) {
                const userData = await userResponse.json();
                return {
                  ...contributor,
                  name: userData.name || contributor.login
                };
              }
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
            return contributor;
          })
        );
        
        setContributors(enhancedData);
      } catch (error) {
        console.error("Error fetching contributors:", error);
        // Fallback with placeholder data if API fails
        setContributors([
          {
            login: "NelminDev",
            avatar_url: "https://avatars.githubusercontent.com/NelminDev",
            html_url: "https://github.com/NelminDev",
            name: "Max"
          },
          {
            login: "gluconfix",
            avatar_url: "https://avatars.githubusercontent.com/gluconfix",
            html_url: "https://github.com/gluconfix",
            name: "GluconFix"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const displayContributors = contributors.slice(0, 40);
  const hasMore = contributors.length > 40;
  const additionalCount = contributors.length - 40;
  
  // Split contributors into two rows
  const firstRow = displayContributors.slice(0, 20);
  const secondRow = displayContributors.slice(20, 40);

  return (
    <div className="bg-muted/30 rounded-xl p-4">      
      <div className="flex flex-col gap-3">
        {/* First row */}
        <div className="flex justify-start items-center gap-1 flex-wrap mb-2">
          {firstRow.map((contributor) => (
            <ContributorAvatar 
              key={contributor.login}
              contributor={contributor}
              isHovered={hoveredUser === contributor.login}
              onHover={() => setHoveredUser(contributor.login)}
              onLeave={() => setHoveredUser(null)}
            />
          ))}
        </div>
        
        {/* Second row */}
        <div className="flex justify-start items-center gap-1 flex-wrap">
          {secondRow.map((contributor) => (
            <ContributorAvatar 
              key={contributor.login}
              contributor={contributor}
              isHovered={hoveredUser === contributor.login}
              onHover={() => setHoveredUser(contributor.login)}
              onLeave={() => setHoveredUser(null)}
            />
          ))}
          
          {hasMore && (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              +{additionalCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContributorAvatar({ 
  contributor, 
  isHovered,
  onHover,
  onLeave
}: { 
  contributor: Contributor; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link 
      href={contributor.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="w-10 h-10 relative">
        <Image 
          src={imageError ? "/creeper.svg" : contributor.avatar_url}
          alt={`${contributor.login}'s GitHub profile`}
          width={40}
          height={40}
          className="rounded-full hover:ring-2 ring-primary transition-all"
          onError={() => setImageError(true)}
        />
        
        {isHovered && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 bg-black/90 text-white text-xs p-1 px-2 rounded shadow-lg whitespace-nowrap z-10">
            <div className="flex flex-col items-center">
              <p className="font-bold">{contributor.name || contributor.login}</p>
              <p className="text-gray-400 text-[10px]">@{contributor.login}</p>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black/90"></div>
          </div>
        )}
      </div>
    </Link>
  );
} 