import {
  SubmitClientSchema,
  type SubmitRegisterClientDto,
} from "@/dtos/requests.dtos";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
  const handleSubmitForm: SubmitHandler<SubmitRegisterClientDto> = (data) => {
    console.log({ data });
  };
  return { register, errors, handleSubmit, handleSubmitForm };
};
