import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye } from "lucide-react";

// Mock data for demonstration
const mockRisks = [
  {
    id: 1,
    title: "Healthcare Equipment Failure",
    category: "Strategic",
    department: "Faculty of Science",
    status: "Open",
    rating: 25,
    severity: "High",
    lastUpdated: "2024-01-25",
  },
  {
    id: 2,
    title: "IT System Failure",
    category: "IT",
    department: "College of Information and Communication Technology",
    status: "Managing",
    rating: 15,
    severity: "Medium",
    lastUpdated: "2024-01-25",
  },
  {
    id: 3,
    title: "Laboratory Safety Compliance",
    category: "Health & Safety",
    department: "Faculty of Science",
    status: "Managing",
    rating: 8,
    severity: "Medium",
    lastUpdated: "2024-01-25",
  },
  {
    id: 4,
    title: "Student Payment Delays",
    category: "Financial",
    department: "Faculty of Education",
    status: "Open",
    rating: 5,
    severity: "Medium",
    lastUpdated: "2024-01-25",
  },
];

export default function Risks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  // Filter risks based on search query and category
  const filteredRisks = useMemo(() => {
    return mockRisks.filter((risk) => {
      const matchesSearch = 
        risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        categoryFilter === "all" || 
        risk.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Risks Register</h1>
          <p className="text-sm text-muted-foreground">View and manage all identified risks across the university</p>
        </div>
        <Button asChild>
          <Link to="/champion/register-risk">
            <Plus className="mr-2 h-4 w-4" />
            Register New Risk
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search risks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Strategic">Strategic</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="Health & Safety">Health & Safety</SelectItem>
            <SelectItem value="Financial">Financial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRisks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No risks found matching your search criteria
              </TableCell>
            </TableRow>
          ) : (
            filteredRisks.map((risk) => (
              <TableRow key={risk.id}>
                <TableCell className="font-medium">{risk.title}</TableCell>
                <TableCell>{risk.category}</TableCell>
                <TableCell>{risk.department}</TableCell>
                <TableCell>
                  <Badge
                    variant={risk.status === "Open" ? "destructive" : "warning"}
                  >
                    {risk.status}
                  </Badge>
                </TableCell>
                <TableCell>{risk.rating}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      risk.severity === "High"
                        ? "destructive"
                        : risk.severity === "Medium"
                        ? "warning"
                        : "default"
                    }
                  >
                    {risk.severity}
                  </Badge>
                </TableCell>
                <TableCell>{risk.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/champion/risks/${risk.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/champion/risks/${risk.id}/report`)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 