import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const MarkerInfo = () => {
  return (
    <Card className="w-full max-w-60 fixed right-3 top-3 p-2 z-50 bg-background/80">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#a72828]">
          Juan Perez
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          quos?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className={"w-full"} variant={"destructive"}>
          Leave
        </Button>
      </CardContent>
    </Card>
  );
};
