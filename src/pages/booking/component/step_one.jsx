import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVenue, nextStep } from "../../../redux/slices/bookingSlice";
import { Button } from "@/components/ui/button";
import { HiUsers, HiLocationMarker } from "react-icons/hi";
import ProgressComponent from "./progress";
import { useVenue } from "../../../hooks/useVenue";


export default function StepOne() {
  const dispatch = useDispatch();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { data: venueList = [], isLoading, isError } = useVenue();

 const reduxVenue = useSelector((state) => state.booking.venue);
  console.log("Redux stored venue:", reduxVenue);


  const handleSelectVenue = (venue) => {
    setSelectedVenue(venue._id);
    dispatch(setVenue(venue));
  };

  const handleContinue = () => {
    if (selectedVenue !== null) {
      dispatch(nextStep());
    } else {
      alert("Please select a venue before continuing.");
    }
  };

  const totalPages = Math.ceil(venueList.length / itemsPerPage);
  const paginatedVenues = venueList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={1} totalSteps={8} />

      <div className="min-w-[800px] bg-white rounded-lg p-6 border border-gray-200">
        <h1 className="font-bold text-2xl">Choose your Venue</h1>
        <p>
          Select the perfect venue for your event. Each venue offers unique
          features and ambiance.
        </p>

        {isLoading && <p className="mt-4 text-gray-500">Loading venues...</p>}
        {isError && <p className="mt-4 text-red-500">Failed to load venues.</p>}

        {!isLoading && !isError && (
          <>
            <p className="text-sm text-gray-600 mt-4 mb-2 text-right">
              Showing{" "}
              {(currentPage - 1) * itemsPerPage + paginatedVenues.length} of{" "}
              {venueList.length} venues
            </p>

            <div className="flex flex-row justify-start gap-1 mt-4">
              {paginatedVenues.map((venue) => (
                
                <div
                  key={venue._id}
                  onClick={() => handleSelectVenue(venue)}
                  className={`cursor-pointer border-2 ${
                    selectedVenue === venue._id
                      ? "border-black"
                      : "border-gray-200"
                  } w-60 min-h-[400px] rounded-md flex flex-col overflow-hidden`}
                >
                  <div className="relative">
                    <div className="absolute top-2 left-2">
                      <h1 className="bg-white py-1 px-3 rounded-full text-xs shadow">
                        From ₱{venue.venue_price}
                      </h1>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex flex-row justify-between items-center mb-2">
                        <h1 className="font-medium">{venue.venue_name}</h1>
                        <span className="text-sm text-yellow-500">
                          ★ {venue.venue_ratings}
                        </span>
                      </div>

                      <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                        {venue.venue_desc}
                      </p>

                      <p className="text-gray-600 text-xs flex items-center gap-1">
                        <HiUsers className="text-base" />
                        Capacity: {venue.venue_capacity}
                      </p>

                      <p className="text-gray-600 text-xs flex items-center gap-1">
                        <HiLocationMarker className="text-base" />
                        {venue.venue_loc}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {venue.venue_tag.length > 0 ? (
                          venue.venue_tag.map(
  
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
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 px-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="text-sm"
              >
                Previous
              </Button>
              <span className="text-gray-500 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="text-sm"
              >
                Next
              </Button>
            </div>

            <div className="w-full items-end justify-end flex px-10 pt-8">
              <Button className="bg-black text-white" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
