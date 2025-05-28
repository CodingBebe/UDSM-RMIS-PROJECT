import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const RiskRegistrationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    riskId: "",
    description: "",
    principalOwner: "",
    supportingOwners: [],
    category: "",
    likelihood: "",
    impact: "",
    causes: "",
    consequences: "",
    existingControls: "",
    proposedMitigation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupportingOwnerChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newOwners = checked
        ? [...prev.supportingOwners, value]
        : prev.supportingOwners.filter((owner) => owner !== value);
      return { ...prev, supportingOwners: newOwners };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Risk Registered",
        description: "The risk has been successfully registered.",
      });
      navigate("/admin/dashboard");
    }, 1000);
  };

  const nextTab = () => {
    if (activeTab === "details") setActiveTab("assessment");
    else if (activeTab === "assessment") setActiveTab("mitigation");
  };

  const prevTab = () => {
    if (activeTab === "mitigation") setActiveTab("assessment");
    else if (activeTab === "assessment") setActiveTab("details");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Register New Risk</CardTitle>
          <CardDescription>
            Fill in the details to register a new risk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Risk Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter risk title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskId">Risk ID</Label>
                <Input
                  id="riskId"
                  name="riskId"
                  value={formData.riskId}
                  onChange={handleChange}
                  placeholder="Enter unique risk identifier"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the risk in detail"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="principalOwner">Principal Risk Owner</Label>
                <Select
                  value={formData.principalOwner}
                  onValueChange={(value) => handleSelectChange("principalOwner", value)}
                >
                  <SelectTrigger id="principalOwner">
                    <SelectValue placeholder="Select principal owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ownerA">Owner A</SelectItem>
                    <SelectItem value="ownerB">Owner B</SelectItem>
                    <SelectItem value="ownerC">Owner C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Supporting Risk Owner(s)</Label>
                <div className="flex flex-col space-y-1">
                  {['Owner A', 'Owner B', 'Owner C', 'Owner D'].map((owner) => (
                    <label key={owner} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={owner}
                        checked={formData.supportingOwners.includes(owner)}
                        onChange={handleSupportingOwnerChange}
                      />
                      <span>{owner}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategic">Strategic</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="compliance">Compliance/Regulatory</SelectItem>
                    <SelectItem value="reputational">Reputational</SelectItem>
                    <SelectItem value="technological">Technological</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="likelihood">Likelihood</Label>
                  <Select
                    value={formData.likelihood}
                    onValueChange={(value) => handleSelectChange("likelihood", value)}
                  >
                    <SelectTrigger id="likelihood">
                      <SelectValue placeholder="Select likelihood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Low</SelectItem>
                      <SelectItem value="2">2 - Low</SelectItem>
                      <SelectItem value="3">3 - Medium</SelectItem>
                      <SelectItem value="4">4 - High</SelectItem>
                      <SelectItem value="5">5 - Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact">Impact</Label>
                  <Select
                    value={formData.impact}
                    onValueChange={(value) => handleSelectChange("impact", value)}
                  >
                    <SelectTrigger id="impact">
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Low</SelectItem>
                      <SelectItem value="2">2 - Low</SelectItem>
                      <SelectItem value="3">3 - Medium</SelectItem>
                      <SelectItem value="4">4 - High</SelectItem>
                      <SelectItem value="5">5 - Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="causes">Causes</Label>
                <Textarea
                  id="causes"
                  name="causes"
                  value={formData.causes}
                  onChange={handleChange}
                  placeholder="List possible causes of the risk"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consequences">Consequences</Label>
                <Textarea
                  id="consequences"
                  name="consequences"
                  value={formData.consequences}
                  onChange={handleChange}
                  placeholder="Describe the possible consequences"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="mitigation" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="existingControls">Existing Controls</Label>
                <Textarea
                  id="existingControls"
                  name="existingControls"
                  value={formData.existingControls}
                  onChange={handleChange}
                  placeholder="Describe current controls in place"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposedMitigation">Proposed Mitigation</Label>
                <Textarea
                  id="proposedMitigation"
                  name="proposedMitigation"
                  value={formData.proposedMitigation}
                  onChange={handleChange}
                  placeholder="Describe your mitigation strategies"
                  rows={4}
                  required
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {activeTab !== "details" && (
              <Button type="button" variant="outline" onClick={prevTab}>
                Previous
              </Button>
            )}
          </div>
          <div className="space-x-2">
            {activeTab !== "mitigation" ? (
              <Button type="button" onClick={nextTab}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register Risk"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RiskRegistrationForm;