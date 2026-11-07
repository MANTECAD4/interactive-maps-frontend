import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RegisterForm = () => {
  return (
    <Card className="w-full max-w-75 fixed right-2.5 top-1/2 -translate-y-1/2 p-2 z-50 bg-background/80">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription className="text-foreground text-xs">
          Join other users from Guadalajara!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Juan Pérez" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="marker-color">Marker color</Label>
              <Input id="marker-color" type="color" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Join
        </Button>
      </CardFooter>
    </Card>
  );
};
