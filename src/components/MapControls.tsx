import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Compass, Minus, Plus, Search } from "lucide-react";
export const MapControls = () => {
  return (
    <div className="fixed top-3 right-2.5 flex flex-col gap-3 items-end z-10 ">
      <InputGroup className="bg-background max-w-xs">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>

      <ButtonGroup
        orientation="vertical"
        aria-label="Media controls"
        className="h-fit "
      >
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
        <Button variant="outline" size="icon">
          <Minus />
        </Button>
        <Button variant="outline" size="icon">
          <Compass />
        </Button>
      </ButtonGroup>
    </div>
  );
};
