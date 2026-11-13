import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapClientsContext } from "@/context/MapClientsContext";
import { use } from "react";
export const MarkerInfo = () => {
  const { hostInfo } = use(MapClientsContext);
  return (
    <div className="group/stamp w-full max-w-55  fixed right-3 top-3  p-3 z-50 stamp">
      <div className="p-1 bg-background">
        <Card
          className="relative aspect-[0.8] rounded-none"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute bottom-0 py-4 bg-background/20 rounded-none backdrop-blur-sm w-full translate-y-full group-hover/stamp:translate-y-0 transition-transform duration-500">
            <CardHeader className="">
              <CardTitle className="text-sm font-semibold ">
                GUADALAJARA, JALISCO
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <div className="flex gap-1 items-center">
                <div className="text-[0.68rem]">
                  <p className="">Coordinates:</p>
                  <p className="">
                    {hostInfo?.coordinates.lon}, {hostInfo?.coordinates.lat}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
