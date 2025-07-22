import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface TransferItem {
  id: string;
  name: string;
  type: "table" | "query" | "procedure";
  status: "pending" | "in-progress" | "completed" | "failed";
  progress: number;
  recordCount?: number;
  recordsTransferred?: number;
  error?: string;
}

interface TransferProgressProps {
  items?: TransferItem[];
  overallProgress?: number;
  estimatedTimeRemaining?: string;
  onComplete?: () => void;
  isTransferring?: boolean;
}

const TransferProgress = ({
  items = [
    {
      id: "1",
      name: "Customers",
      type: "table",
      status: "completed",
      progress: 100,
      recordCount: 1500,
      recordsTransferred: 1500,
    },
    {
      id: "2",
      name: "Orders",
      type: "table",
      status: "in-progress",
      progress: 65,
      recordCount: 5000,
      recordsTransferred: 3250,
    },
    {
      id: "3",
      name: "Products",
      type: "table",
      status: "pending",
      progress: 0,
      recordCount: 2500,
      recordsTransferred: 0,
    },
    {
      id: "4",
      name: "MonthlyReport",
      type: "query",
      status: "failed",
      progress: 30,
      error: "Syntax error in query",
    },
    {
      id: "5",
      name: "CalculateInventory",
      type: "procedure",
      status: "pending",
      progress: 0,
    },
  ],
  overallProgress = 40,
  estimatedTimeRemaining = "3 minutes",
  onComplete = () => {},
  isTransferring = true,
}: TransferProgressProps) => {
  const [localItems, setLocalItems] = useState<TransferItem[]>(items);
  const [localProgress, setLocalProgress] = useState<number>(overallProgress);

  // Simulate progress updates if isTransferring is true
  useEffect(() => {
    if (!isTransferring) return;

    const interval = setInterval(() => {
      setLocalItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.status === "in-progress" && item.progress < 100) {
            const newProgress = Math.min(item.progress + 5, 100);
            const newRecordsTransferred = item.recordCount
              ? Math.floor((newProgress / 100) * item.recordCount)
              : undefined;

            return {
              ...item,
              progress: newProgress,
              recordsTransferred: newRecordsTransferred,
              status: newProgress === 100 ? "completed" : "in-progress",
            };
          } else if (item.status === "pending" && Math.random() > 0.7) {
            return { ...item, status: "in-progress" };
          }
          return item;
        });
      });

      setLocalProgress((prev) => Math.min(prev + 2, 100));

      // Check if all items are completed or failed
      if (localProgress >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTransferring, onComplete, localProgress]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            Completed
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "in-progress":
        return (
          <Badge variant="default" className="bg-blue-500">
            In Progress
          </Badge>
        );
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "table":
        return (
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            Table
          </Badge>
        );
      case "query":
        return (
          <Badge
            variant="outline"
            className="border-purple-300 text-purple-700"
          >
            Query
          </Badge>
        );
      case "procedure":
        return (
          <Badge variant="outline" className="border-amber-300 text-amber-700">
            Procedure
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Transfer Progress
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Overall Progress</span>
          <span className="font-medium">{localProgress}%</span>
        </div>
        <Progress value={localProgress} className="h-3" />

        <div className="flex justify-between mt-2">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Estimated time remaining: {estimatedTimeRemaining}</span>
          </div>
          <div className="text-sm font-medium">
            {localItems.filter((item) => item.status === "completed").length} of{" "}
            {localItems.length} completed
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {localItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden border-l-4 transition-all duration-200"
            style={{
              borderLeftColor:
                item.status === "completed"
                  ? "#10b981"
                  : item.status === "failed"
                    ? "#ef4444"
                    : item.status === "in-progress"
                      ? "#3b82f6"
                      : "#d1d5db",
            }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  {getTypeBadge(item.type)}
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>

              {item.recordCount && (
                <div className="mt-2 text-sm text-gray-600">
                  Records: {item.recordsTransferred || 0} of {item.recordCount}{" "}
                  transferred
                </div>
              )}

              {item.error && (
                <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">
                  Error: {item.error}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransferProgress;
