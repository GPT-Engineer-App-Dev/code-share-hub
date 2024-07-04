import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const fetchThreadDetails = async (id) => {
  // Placeholder for fetching thread details
  return {
    id,
    title: "Welcome to TechTalk",
    content: "This is the first thread in the TechTalk forum. Feel free to discuss anything related to technology here.",
    replies: [
      { id: 1, author: "Admin", content: "Welcome everyone!", date: "2023-10-01" },
      { id: 2, author: "JaneDoe", content: "Glad to be here!", date: "2023-10-02" },
      // Add more replies here
    ],
  };
};

const ThreadDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["threadDetails", id],
    queryFn: () => fetchThreadDetails(id),
  });

  return (
    <div className="space-y-4">
      {isLoading ? (
        <Skeleton className="w-full h-20" />
      ) : error ? (
        <div>Error loading thread details</div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>{data.content}</div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {data.replies.map(reply => (
              <Card key={reply.id}>
                <CardHeader className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10" />
                  <div>
                    <div>{reply.author}</div>
                    <div className="text-sm text-muted-foreground">{reply.date}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>{reply.content}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <form className="space-y-4">
            <Input placeholder="Write a reply..." />
            <Button type="submit">Submit Reply</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ThreadDetails;