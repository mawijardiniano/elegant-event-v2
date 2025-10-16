
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Message() {
  return (
    <Card className="min-w-[600px] border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Send us a Message
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              className="border border-gray-200"
              id="firstName"
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              className="border border-gray-200"
              id="lastName"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            className="border border-gray-200"
            id="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Input
            className="border border-gray-200"
            id="phone"
            placeholder="e.g. (555) 123-4567"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="eventType">Event Type</Label>
          <Input
            className="border border-gray-200"
            id="eventType"
            placeholder="e.g. Wedding, Conference, etc."
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="message">Message</Label>
          <Textarea
            className="border border-gray-200"
            id="message"
            placeholder="Tell us more about your event..."
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button className="bg-black text-white px-6">Send Message</Button>
      </CardFooter>
    </Card>
  );
}
