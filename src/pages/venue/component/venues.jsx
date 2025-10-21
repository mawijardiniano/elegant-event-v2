import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { HiUsers, HiLocationMarker } from "react-icons/hi";
import { useVenue } from "../../../hooks/useVenue";
import { useState } from "react";

export default function Venues() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: venueList = [], isLoading } = useVenue();

  const totalPages = Math.ceil(venueList.length / itemsPerPage);
  const paginatedVenues = venueList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <section className="w-full pt-12 pb-6 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Venues</h1>
          <p className="text-lg text-gray-600">
            Discover the perfect venue for your special event. From intimate
            gatherings to grand celebrations, we have the ideal space to make
            your occasion unforgettable.
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="text-center py-12">Loading venues...</div>
      ) : (
        <div className="grid grid-cols-4 justify-start gap-4 px-20 py-8">
          {paginatedVenues.map((venue) => (
            <div
              key={venue.venue_id}
              className="border border-gray-200 w-full min-h-[450px] rounded-lg flex flex-col overflow-hidden shadow-sm"
            >
              <div className="relative">
                <div className="absolute top-2 left-2">
                  <h1 className="bg-white py-1 px-3 rounded-full text-xs shadow">
                    From ₱{venue.venue_price}
                  </h1>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex flex-row justify-between items-center mb-2">
                    <h1 className="font-medium">{venue.venue_name}</h1>
                    <span className="text-sm text-yellow-500">
                      ★ {venue.venue_ratings}
                    </span>
                  </div>

                  <div className="min-h-[140px]">
                    <p className="text-gray-500 text-sm mb-2 line-clamp-3">
                      {venue.venue_desc}
                    </p>

                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <HiUsers className="text-lg text-gray-700" />
                      Capacity: {venue.venue_capacity}
                    </p>

                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <HiLocationMarker className="text-lg text-gray-700" />
                      {venue.venue_loc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {venue.tags?.length > 0 ? (
                        venue.tags.map(
                          (tag, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-200 text-xs px-2 py-1 rounded-full"
                            >
                              {tag.tag_name}
                            </span>
                          )
                        )
                      ) : (
                        <span className="text-gray-400 text-xs">No tags</span>
                      )}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-black text-white mt-auto mt-6">
                  View Details & Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="flex justify-end gap-6 pb-16 px-20">
          <p className="text-sm text-gray-500 mt-2">
            Showing {(currentPage - 1) * itemsPerPage + paginatedVenues.length}{" "}
            of {venueList.length} venues
          </p>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-200 text-black"
          >
            Previous
          </Button>

          <span className="text-gray-500 text-sm self-center">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="bg-gray-200 text-black"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
