import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Earth } from "lucide-react";
import { useRegister } from "@/hooks/useRegister";

export const RegisterPage = () => {
  const { errors, handleSubmit, handleSubmitForm, register } = useRegister();
  return (
    <div className="flex items-center justify-center min-h-dvh map-wallpaper">
      <div
        className={cn(
          "flex flex-col gap-6 max-w-sm w-full bg-background/70 p-6 rounded-xl ",
        )}
      >
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Earth className="size-6" />
                </div>
                <span className="sr-only">Explore Earth</span>
              </a>
              <h1 className="text-xl font-bold">Register</h1>
              <FieldDescription>
                Join other users and travel around the world
              </FieldDescription>
            </div>
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...register("name")}
                type="text"
                placeholder="Juan Pérez"
                required
                aria-invalid={Boolean(errors.name)}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.color)}>
              <FieldLabel htmlFor="color">Marker Color</FieldLabel>
              <Input
                {...register("color")}
                type="color"
                required
                aria-invalid={Boolean(errors.color)}
              />
              <FieldError>{errors.color?.message}</FieldError>
            </Field>

            <div className="grid grid-cols-2 gap-2 items-center">
              <Field className="" data-invalid={Boolean(errors.latitude)}>
                <FieldLabel className="text-xs" htmlFor="latitude">
                  Latitude
                </FieldLabel>
                <Input
                  {...register("latitude")}
                  type="number"
                  step="any"
                  min={-90}
                  max={90}
                  required
                  aria-invalid={Boolean(errors.latitude)}
                />
                <FieldError>{errors.latitude?.message}</FieldError>
              </Field>

              <Field className="" data-invalid={Boolean(errors.longitude)}>
                <FieldLabel className="text-xs" htmlFor="longitude">
                  Longitude
                </FieldLabel>
                <Input
                  {...register("longitude")}
                  type="number"
                  step="any"
                  min={-180}
                  max={180}
                  required
                  aria-invalid={Boolean(errors.longitude)}
                />
                <FieldError>{errors.longitude?.message}</FieldError>
              </Field>
            </div>
            <Field>
              <Button type="submit">Join</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};
