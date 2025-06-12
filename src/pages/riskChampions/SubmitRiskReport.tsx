import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Mock risk data - replace with actual API call
const mockRisks = [
  {
    id: 1,
    title: "Healthcare Equipment Failure",
    description: "Possibility of inadequate healthcare services",
    principalOwner: "Planning, Finance and Administration",
    supportingOwner: "DSS, DHRMA, UH",
    category: "Health Safety and Welfare",
    strategicObjective: "Incidence and impacts of HIV/AIDS",
    targets: ["Provide Health education /Counselling"]
  },
  {
    id: 2,
    title: "IT System Failure",
    description: "IT infrastructure and system breakdown risks",
    principalOwner: "ICT Department",
    supportingOwner: "College of ICT",
    category: "IT",
    strategicObjective: "Maintain robust IT infrastructure",
    targets: ["Regular system maintenance"]
  },
  {
    id: 3,
    title: "Laboratory Safety Compliance",
    description: "Laboratory safety and compliance risks",
    principalOwner: "Faculty of Science",
    supportingOwner: "Department of Chemistry",
    category: "Health & Safety",
    strategicObjective: "Ensure lab safety standards",
    targets: ["Regular safety audits"]
  },
  {
    id: 4,
    title: "Student Payment Delays",
    description: "Delays in student fee payments",
    principalOwner: "Finance Department",
    supportingOwner: "Student Affairs",
    category: "Financial",
    strategicObjective: "Improve fee collection",
    targets: ["Implement payment reminders"]
  }
];

interface TargetRow {
  id: number;
  target: string;
  achievement: string;
  status: string;
}

export default function SubmitRiskReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [riskData, setRiskData] = useState<any>(null);
  const [targetRows, setTargetRows] = useState<TargetRow[]>([]);
  const [formData, setFormData] = useState({
    timePeriod: "JANUARY-MARCH",
    year: "2025",
  });

  // Fetch risk data based on ID
  useEffect(() => {
    // Replace with actual API call
    const risk = mockRisks.find(r => r.id === Number(id));
    if (risk) {
      setRiskData(risk);
      // Initialize first target row
      setTargetRows([
        {
          id: 1,
          target: risk.targets[0],
          achievement: "",
          status: ""
        }
      ]);
    }
  }, [id]);

  const handleAddRow = () => {
    if (riskData && riskData.targets.length > 0) {
      const newRow: TargetRow = {
        id: targetRows.length + 1,
        target: riskData.targets[0], // You can modify this if there are multiple targets
        achievement: "",
        status: ""
      };
      setTargetRows([...targetRows, newRow]);
    }
  };

  const handleAchievementChange = (id: number, value: string) => {
    setTargetRows(rows =>
      rows.map(row =>
        row.id === id ? { ...row, achievement: value } : row
      )
    );
  };

  const handleStatusChange = (id: number, value: string) => {
    setTargetRows(rows =>
      rows.map(row =>
        row.id === id ? { ...row, status: value } : row
      )
    );
  };

  const handleSubmit = async () => {
    // Validate form
    if (!selectedCell) {
      toast({
        title: "Error",
        description: "Please select a risk rating from the matrix",
        variant: "destructive"
      });
      return;
    }

    if (targetRows.some(row => !row.achievement || !row.status)) {
      toast({
        title: "Error",
        description: "Please fill in all achievement and status fields",
        variant: "destructive"
      });
      return;
    }

    // Prepare submission data
    const submissionData = {
      riskId: riskData?.id,
      timePeriod: formData.timePeriod,
      year: formData.year,
      rating: selectedCell,
      severity: getSeverity(selectedCell),
      targets: targetRows,
    };

    // Mock API call
    try {
      // Replace with actual API call
      console.log("Submitting report:", submissionData);
      toast({
        title: "Success",
        description: "Risk report submitted successfully",
      });
      navigate("/champion/risks");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit risk report",
        variant: "destructive"
      });
    }
  };

  const getSeverity = (rating: number) => {
    if (rating >= 17) return "Critical";
    if (rating >= 10) return "High";
    if (rating >= 4) return "Medium";
    return "Low";
  };

  if (!riskData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 p-4 text-sm">
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Risk Management Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Risk Details Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">RISK ID</Label>
              <Input value={riskData.id} readOnly className="h-8 text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">RISK TITLE</Label>
              <Input value={riskData.title} readOnly className="h-8 text-sm" />
            </div>
          </div>

          {/* Time Period Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Time Period</Label>
              <Select 
                value={formData.timePeriod} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, timePeriod: value }))}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JANUARY-MARCH">JANUARY-MARCH</SelectItem>
                  <SelectItem value="APRIL-JUNE">APRIL-JUNE</SelectItem>
                  <SelectItem value="JULY-SEPTEMBER">JULY-SEPTEMBER</SelectItem>
                  <SelectItem value="OCTOBER-DECEMBER">OCTOBER-DECEMBER</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Year</Label>
              <Select 
                value={formData.year}
                onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold bg-[#1A365D] text-white p-2">Overview</h3>
            <div className="grid grid-cols-2 gap-x-4 text-xs">
              <div className="space-y-3 p-2 bg-[#1A365D] text-white">
                <div>
                  <h4 className="font-medium">Risk Description</h4>
                </div>
                <div>
                  <h4 className="font-medium">Principal risk owner</h4>
                </div>
                <div>
                  <h4 className="font-medium">Supporting owner</h4>
                </div>
                <div>
                  <h4 className="font-medium">Risk category</h4>
                </div>
                <div>
                  <h4 className="font-medium">Strategic objective</h4>
                </div>
              </div>
              <div className="space-y-3 p-2">
                <div>
                  <p>{riskData.description}</p>
                </div>
                <div>
                  <p>{riskData.principalOwner}</p>
                </div>
                <div>
                  <p>{riskData.supportingOwner}</p>
                </div>
                <div>
                  <p>{riskData.category}</p>
                </div>
                <div>
                  <p>{riskData.strategicObjective}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Target Achievement Status Section */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 bg-[#1A365D] text-white text-xs">
              <div className="p-2 border-r border-gray-600">
                <h3 className="font-semibold">Target</h3>
              </div>
              <div className="p-2 border-r border-gray-600">
                <h3 className="font-semibold">Achievement</h3>
              </div>
              <div className="p-2">
                <h3 className="font-semibold">Status</h3>
              </div>
            </div>
            {targetRows.map((row) => (
              <div key={row.id} className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-gray-50">
                  <p>{row.target}</p>
                </div>
                <div className="p-2">
                  <Input 
                    value={row.achievement}
                    onChange={(e) => handleAchievementChange(row.id, e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Enter achievement"
                  />
                </div>
                <div className="p-2">
                  <Select 
                    value={row.status}
                    onValueChange={(value) => handleStatusChange(row.id, value)}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Not Started</SelectItem>
                      <SelectItem value="2">2 - In Progress</SelectItem>
                      <SelectItem value="3">3 - Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddRow}
              className="text-xs"
            >
              Add Row
            </Button>
          </div>

          {/* Risk Assessment Matrix */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium">Risk Assessment Matrix</h3>
            <p className="text-xs text-muted-foreground mb-4">Click on the matrix to select the likelihood and impact of this risk.</p>
            
            {/* Matrix Grid */}
            <div className="relative bg-white p-4 rounded-lg border">
              <div className="grid grid-cols-6 gap-1">
                <div className="col-span-1"></div>
                {[1, 2, 3, 4, 5].map((l, i) => (
                  <div key={i} className="text-center text-xs font-medium">
                    {l}
                  </div>
                ))}
                {[5, 4, 3, 2, 1].map((impact, i) => (
                  <>
                    <div key={`impact-${i}`} className="text-center text-xs font-medium">
                      {impact}
                    </div>
                    {[1, 2, 3, 4, 5].map((likelihood) => {
                      const value = impact * likelihood;
                      return (
                        <button
                          key={`cell-${impact}-${likelihood}`}
                          type="button"
                          className={`aspect-square p-1 text-xs rounded ${
                            value <= 4
                              ? "bg-[#E8F5E9]" // Light green for Low
                              : value <= 9
                              ? "bg-[#FFF3E0]" // Light orange for Medium
                              : value <= 16
                              ? "bg-[#FFEBEE]" // Light red for High
                              : "bg-[#FFE4E6]" // Darker red for Critical
                          } ${selectedCell === value ? "ring-2 ring-blue-500" : ""}`}
                          onClick={() => setSelectedCell(value)}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </>
                ))}
              </div>

              {/* Legend and Labels */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-medium mb-1">Impact</p>
                    <div className="space-y-1">
                      <p>1 - Minimal</p>
                      <p>2 - Minor</p>
                      <p>3 - Moderate</p>
                      <p>4 - Major</p>
                      <p>5 - Severe</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Likelihood</p>
                    <div className="space-y-1">
                      <p>1 - Rare</p>
                      <p>2 - Unlikely</p>
                      <p>3 - Possible</p>
                      <p>4 - Likely</p>
                      <p>5 - Almost Certain</p>
                    </div>
                  </div>
                </div>

                {/* Color Legend */}
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#E8F5E9]"></div>
                    <span>Low (1-4)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FFF3E0]"></div>
                    <span>Medium (5-9)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FFEBEE]"></div>
                    <span>High (10-16)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FFE4E6]"></div>
                    <span>Critical (17-25)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Information */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Rating Information</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <Label>Rating</Label>
                <p className="text-lg font-bold">{selectedCell || 0}</p>
              </div>
              <div>
                <Label>Severity</Label>
                <p className="text-lg font-bold">
                  {selectedCell ? getSeverity(selectedCell) : "Low"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button 
              type="button"
              size="sm"
              onClick={handleSubmit}
              className="text-xs"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}