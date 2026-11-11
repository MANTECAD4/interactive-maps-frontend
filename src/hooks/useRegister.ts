import {
  SubmitClientSchema,
  type SubmitRegisterClientDto,
} from "@/dtos/requests.dtos";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { use } from "react";
import { WebSocketContext } from "@/websockets/WebSocketProvider";
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

  const { connect } = use(WebSocketContext);

  const handleSubmitForm: SubmitHandler<SubmitRegisterClientDto> = ({
    color,
    latitude,
    longitude,
    name,
  }) => {
    connect({ name, color, coordinates: { lat: latitude, lon: longitude } });
  };
  return { register, errors, handleSubmit, handleSubmitForm };
};
