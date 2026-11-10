import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Compass } from "lucide-react";
export const MarkerInfo = () => {
  return (
    <div className="w-full max-w-70  fixed right-3 top-3  p-3 z-50 stamp">
      <div className="p-1 bg-background">
        <Card
          className="relative aspect-[0.7] rounded-none"
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1699537318938-7af01500c359?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute bottom-0 py-4 bg-background/30 rounded-none backdrop-blur-sm w-full">
            <CardHeader className="">
              <CardTitle className="font-semibold ">Juan Perez</CardTitle>
              <CardDescription className="text-foreground text-xs">
                City: Guadalajara, Jalisco
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-3">
              <div className="flex gap-1 items-center">
                <Compass className="stroke-accent-foreground size-5" />
                <div className="text-[0.68rem]">
                  <p className="">Coordinates:</p>
                  <p className="">-32.435534543, 40.43252534543</p>
                </div>
              </div>
              {/* <Button className={"w-full"} variant={"destructive"} size={"xs"}>
              Leave
            </Button> */}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
