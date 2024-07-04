import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchThreads = async () => {
  // Placeholder for fetching threads
  return [
    { id: 1, title: "Welcome to TechTalk", author: "Admin", replies: 10, lastReply: "2023-10-01" },
    { id: 2, title: "How to learn React", author: "JaneDoe", replies: 5, lastReply: "2023-10-02" },
    // Add more threads here
  ];
};

const Index = () => {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["threads"],
    queryFn: fetchThreads,
  });

  const filteredThreads = data?.filter(thread => thread.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <Input
          placeholder="Search threads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button as={Link} to="/new-post">New Post</Button>
      </header>
      <div className="space-y-4">
        {isLoading ? (
          <Skeleton className="w-full h-20" />
        ) : error ? (
          <div>Error loading threads</div>
        ) : (
          filteredThreads.map(thread => (
            <Card key={thread.id}>
              <CardHeader>
                <CardTitle>
                  <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>Author: {thread.author}</div>
                <div>Replies: {thread.replies}</div>
                <div>Last Reply: {thread.lastReply}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Index;