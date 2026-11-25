import { Button } from "@/components/ui/button";
import { useLocationInfo } from "@/hooks/useLocationInfo";
import { Check, Copy, MapPinned } from "lucide-react";
export const LocationInfo = () => {
  const {
    hostInfo,
    locationQuery,
    handleCopyCoordinates,
    isCoppiedToClipboard,
  } = useLocationInfo();
  return (
    <div className="group/stamp fixed right-3 top-3 z-50 w-full max-w-55">
      <div className=" relative min-h-40  transform-3d transition-transform duration-700 origin-center group-hover/stamp:rotate-y-180">
        <div className="stamp absolute inset-0 backface-hidden  bg-background">
          <img
            src={`https://flags.restcountries.com/v5/svg/${locationQuery.data?.context.country.country_code.toLowerCase() ?? "mx"}.svg`}
            className="rounded-none! size-full object-cover"
          />
        </div>

        <div className="stamp  absolute inset-0 rotate-y-180 backface-hidden">
          {locationQuery.data && (
            <>
              <h2 className="schoolbell-regular text-sm">
                {locationQuery.data.full_address}
              </h2>
              <MapPinned />
            </>
          )}
          <Button
            className={"absolute right-2 bottom-2"}
            size={"xs"}
            variant={"ghost"}
            onClick={() => handleCopyCoordinates(hostInfo!.coordinates)}
          >
            {isCoppiedToClipboard ? (
              <>
                <Check />
                <span>Coordinates copied</span>
              </>
            ) : (
              <>
                <Copy />
                <span>Copy coordinates</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
