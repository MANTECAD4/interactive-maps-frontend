import {
  SubmitClientSchema,
  type SubmitRegisterClientDto,
} from "@/dtos/requests.dtos";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { use } from "react";
import type { ClientMarker } from "@/dtos";
import { MapClientsContext } from "@/context/MapClientsContext";
export const useRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<
    z.input<typeof SubmitClientSchema>,
    unknown,
    z.output<typeof SubmitClientSchema>
  >({
    resolver: zodResolver(SubmitClientSchema),
  });

  const { setHostInfo } = use(MapClientsContext);

  const handleSubmitForm: SubmitHandler<SubmitRegisterClientDto> = ({
    color,
    latitude,
    longitude,
    name,
  }) => {
    const hostInfo: ClientMarker = {
      id: crypto.randomUUID(),
      name,
      coordinates: { lat: latitude, lon: longitude },
      color,
      updatedAt: new Date(),
    };
    setHostInfo(hostInfo);
  };
  return { register, errors, handleSubmit, handleSubmitForm };
};
