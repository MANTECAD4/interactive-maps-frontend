import { Card, CardContent } from "@/components/ui/card";
import { useLocationInfo } from "@/hooks/useLocationInfo";
export const LocationInfo = () => {
  const { hostInfo, locationQuery } = useLocationInfo();
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
          <div>xsssssssssssssssss</div>
        </div>
      </div>
    </div>
  );
};
