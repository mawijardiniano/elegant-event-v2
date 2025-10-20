import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVenue } from "../../../hooks/useVenue";

export default function Venue() {
  const { data: showVenue } = useVenue();
  const venueList = Array.isArray(showVenue) ? showVenue.slice(0, 3) : [];
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Our Premium Venue</h1>
      <p className="text-center max-w-xl mx-auto text-xl font-medium text-gray-400 py-4">
        Choose from our collection of carefully curated venues, each offering
        unique charm and exceptional service.
      </p>
      <div className="flex flex-row items-center justify-center gap-4">
        {venueList.length > 0 ? (
          venueList.map((venue, index) => (
            <Card
              key={venue._id ?? index}
              className="w-72 h-[400px] border border-gray-200"
            >
              <CardHeader>
                <CardTitle>{venue.venue_name}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>dsfh</p>
        )}
      </div>
      <div className="pt-10">
        <Button className="bg-black text-white">View All Venues</Button>
      </div>
    </div>
  );
}
